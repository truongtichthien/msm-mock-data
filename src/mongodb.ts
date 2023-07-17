import type { Db } from 'mongodb';
import { MongoClient, Int32 } from 'mongodb';
import { DEFAULT_USER_ID } from './constants';
import type { CardsCollectionProps, CardsLevelProps, CardProps } from './types';
import { generateCard } from './utils';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

const client = new MongoClient(uri, options);
const clientPromise: Promise<MongoClient> = client.connect();

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

export async function getUsers(userId?: string): Promise<any> {
  return await getDocuments('users', userId);
}

export async function getCards(userId?: any): Promise<any> {
  return await getDocuments('cards', userId);
}

export async function getTickets(userId?: any): Promise<any> {
  return await getDocuments('tickets', userId);
}

export async function claimTickets(userId?: any): Promise<any> {
  const db: Db = await connectDb();
  const res = await db.collection('tickets').findOneAndUpdate(
    { userId: { $in: [userId, DEFAULT_USER_ID] } },
    [{ $set: { amount: { $sum: ['$amount', '$availToClaim'] } } }], // $subtract
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
    const {
      level,
      color: { code },
    } = card;
    cards[level][code].push(card);
  });

  const res = await db
    .collection('cards')
    .findOneAndUpdate({ userId: { $in: [userId, DEFAULT_USER_ID] } }, [{ $set: { cards } }], {
      returnDocument: 'after',
      projection: { _id: 0 },
    });

  console.log(res.value);

  return res.value;
}

export default clientPromise;
