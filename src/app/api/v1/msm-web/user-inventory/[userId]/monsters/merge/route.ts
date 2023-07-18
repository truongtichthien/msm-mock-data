import type { WithId, Document } from 'mongodb';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { CardProps, CardsResponseProps, GeneralResponseProps } from '@msm/types';
import { randomInt } from '@msm/utils';
import { mergeCards, consumeTickets } from '@msm/mongodb';

export interface CardsCollectionProps extends WithId<Document> {
  userId: string;
  cards: Array<Array<Array<CardProps>>>;
}

export async function POST(request: NextRequest, options: any) {
  let data: null | CardsResponseProps = null;
  let msg: null | string = "Opps! You're failed to merge monsters to get an upgraded one. You may try again later";

  const { fromGrade }: { fromGrade: number } = await request.json();
  const isSuccess: boolean = randomInt(0, 2) > 0;

  if (isSuccess) {
    const { userId } = options.params;
    const [card] = (await mergeCards(userId, fromGrade)) as [CardProps, CardsCollectionProps];

    msg = null;
    data = { card };
  }

  const res: GeneralResponseProps = {
    oper: 'MONSTER_MERGING',
    isSuccess,
    msg,
    code: !isSuccess ? 'OUT_OF_LUCK' : undefined,
    data,
  };

  return NextResponse.json(res);
}

export async function OPTIONS() {
  // it is a must implementation to serve CORS APIs
  // return the null response
  return NextResponse.json(null);
}
