import type { Db, WithId, Document } from 'mongodb';
import { MongoClient } from 'mongodb';
import { COLORS_NAME, DEFAULT_USER_ID, GRADE_COUNT } from './constants';
import type { CardsCollectionProps, CardProps, AbilityProps } from './types';
import { generateCard } from './utils';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  console.log('development');
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

async function connectDb(): Promise<Db> {
  try {
    const client = await clientPromise;
    const db = client.db('msm');
    return db;
  } catch (e) {
    console.error(e);
    throw new Error(e as string).message;
  }
}

async function getDocuments(collection: string, userId?: string): Promise<any> {
  const db: Db = await connectDb();
  return await db
    .collection(collection)
    .findOne(userId ? { userId: { $in: [userId, DEFAULT_USER_ID] } } : {}, { projection: { _id: 0 } });
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// GET
// ~~~
// ~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export async function getUsers(userId?: string): Promise<any> {
  return await getDocuments('users', userId);
}

export async function getCards(userId?: any): Promise<Array<Array<number>>> {
  const dbCards: CardsCollectionProps = await getDocuments('cards', userId);
  const { cards } = dbCards;
  return cards.map((lvl) => lvl.map((clr) => clr.length));
}

export async function getTickets(userId?: any): Promise<any> {
  return await getDocuments('tickets', userId);
}

export async function getIsk(userId?: string): Promise<any> {
  return await getDocuments('isk', userId);
}

export async function getSbg(userId?: string): Promise<any> {
  return await getDocuments('sbg', userId);
}

export async function getSbt(userId?: string): Promise<any> {
  return await getDocuments('sbt', userId);
}

export async function getPass(userId?: string): Promise<any> {
  return await getDocuments('passes', userId);
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// POST
// ~~~~
// ~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export async function claimTickets(userId: any): Promise<any> {
  const db: Db = await connectDb();
  const res = await db
    .collection('tickets')
    .findOneAndUpdate(
      { userId: { $in: [userId, DEFAULT_USER_ID] } },
      [{ $set: { amount: { $sum: ['$amount', '$availToClaim'] } } }],
      { returnDocument: 'after', projection: { _id: 0 } },
    );
  return res.value;
}

export async function consumeTickets(userId: any, amount: number): Promise<any> {
  const db: Db = await connectDb();
  const res = await db
    .collection('tickets')
    .findOneAndUpdate(
      { userId: { $in: [userId, DEFAULT_USER_ID] } },
      [{ $set: { amount: { $subtract: ['$amount', amount] } } }],
      { returnDocument: 'after', projection: { _id: 0 } },
    );
  return res.value;
}

export async function exploreCards(userId: string, exploreAmount: number, pass: boolean) {
  const db: Db = await connectDb();
  const { cards }: CardsCollectionProps = (await db.collection('cards').findOne()) as CardsCollectionProps;

  // create cards
  const newCards: Array<CardProps> = Array(pass ? exploreAmount : 1)
    .fill(0)
    .map(() => generateCard());

  newCards.forEach((card: CardProps) => {
    const { level, color } = card;
    const colorIdx = COLORS_NAME.findIndex((e) => e === color);
    cards[level][colorIdx].push(card);
  });

  const res = await db
    .collection('cards')
    .findOneAndUpdate({ userId: { $in: [userId, DEFAULT_USER_ID] } }, [{ $set: { cards } }], {
      returnDocument: 'after',
      projection: { _id: 0 },
    });

  return [newCards, res.value];
}

export async function checkMerge(userId: string, grade: number): Promise<boolean> {
  grade--;
  const db: Db = await connectDb();
  const { cards }: CardsCollectionProps = (await db
    .collection('cards')
    .findOne({ userId: { $in: [userId, DEFAULT_USER_ID] } })) as CardsCollectionProps;

  return cards.reduce((a, e) => (e.length > 0 ? a + 1 : a), 0) === GRADE_COUNT;
}

export async function mergeCards(userId: string, grade: number) {
  grade--;
  const db: Db = await connectDb();
  const { cards }: CardsCollectionProps = (await db
    .collection('cards')
    .findOne({ userId: { $in: [userId, DEFAULT_USER_ID] } })) as CardsCollectionProps;

  // count how many cards can be merged
  const colorCount = cards.map((e) => e.length).sort()[0];

  // create merged card
  const mergedCard: Array<CardProps> = Array(colorCount)
    .fill(0)
    .map(() => generateCard(grade + 1))
    .sort((a: CardProps, b: CardProps) => {
      const aAbility = ['strength', 'attack', 'defense'].map((k) => a[k as AbilityProps].value).join('');
      const bAbility = ['strength', 'attack', 'defense'].map((k) => b[k as AbilityProps].value).join('');
      return +aAbility - +bAbility;
    });

  const res: Array<Promise<WithId<Document> | null>> = mergedCard
    .map(async (merged) => {
      const { level, color } = merged;
      const colorIdx = COLORS_NAME.findIndex((e) => e === color);

      // remove merging cards
      cards[grade] = cards[grade].map((color) => {
        color.shift();
        return color;
      });

      // add merged card
      cards[level][colorIdx].push(merged);

      const res = await db
        .collection('cards')
        .findOneAndUpdate({ userId: { $in: [userId, DEFAULT_USER_ID] } }, [{ $set: { cards } }], {
          returnDocument: 'after',
          projection: { _id: 0 },
        });

      return res.value as CardsCollectionProps;
    })
    .reverse();

  return [mergedCard, res[0]];
}

export default clientPromise;
