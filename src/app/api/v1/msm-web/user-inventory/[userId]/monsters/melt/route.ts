import type { WithId, Document } from 'mongodb';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { CardProps, MergedCardsReponse, GeneralResponseProps } from '@msm/types';
import { randomInt, sleep } from '@msm/utils';
import { mergeCards } from '@msm/mongodb';

export interface CardsCollectionProps extends WithId<Document> {
  userId: string;
  cards: Array<Array<Array<CardProps>>>;
}

export async function POST(request: NextRequest, options: any) {
  let data: null | MergedCardsReponse = null;
  let msg: null | string = "Opps! You're failed to merge monsters to get an upgraded one. You may try again later";

  const { fromGrade }: { fromGrade: number } = await request.json();
  const isSuccess: boolean = randomInt(0, 1) > 0;

  if (isSuccess) {
    const { userId } = options.params;
    const [merged, cards] = (await mergeCards(userId, fromGrade)) as [Array<CardProps>, CardsCollectionProps];

    msg = null;
    data = { merged, card: (cards as CardsCollectionProps).cards.map((lvl) => lvl.map((clr) => clr.length)) };
  }

  const res: GeneralResponseProps = {
    oper: 'MONSTER_MERGING',
    isSuccess,
    msg,
    code: !isSuccess ? 'OUT_OF_LUCK' : undefined,
    data,
  };

  // await sleep(500);

  return NextResponse.json(res);
}

export async function OPTIONS() {
  // it is a must implementation to serve CORS APIs
  // return the null response
  return NextResponse.json(null);
}
