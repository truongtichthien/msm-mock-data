import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { CardProps, MergedCardsReponse, GeneralResponseProps, CardsCollectionProps } from '@msm/types';
import { randomInt, sleep } from '@msm/utils';
import { checkMerge, mergeCards } from '@msm/mongodb';

export async function POST(request: NextRequest, options: any) {
  const { userId } = options.params;
  const { fromGrade }: { fromGrade: number } = await request.json();
  let msg: null | string = "Opps! You're failed to merge monsters to get an upgraded one. You may try again later";

  // check if can merge
  const canMerge = await checkMerge(userId, fromGrade);
  if (!canMerge) {
    return NextResponse.json({
      oper: 'MONSTER_MERGING',
      isSuccess: false,
      msg,
      code: 'NOT_ENOUGH_CARDS',
      data: null,
    } as GeneralResponseProps);
  }

  let data: null | MergedCardsReponse = null;

  const isSuccess: boolean = randomInt(0, 1) > 0;

  if (isSuccess) {
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
