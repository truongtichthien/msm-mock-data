import type { WithId, Document } from 'mongodb';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { CardProps, CardsResponseProps, GeneralResponseProps } from '@msm/types';
import { randomInt } from '@msm/utils';
import { exploreCards, consumeTickets } from '@msm/mongodb';

export interface CardsCollectionProps extends WithId<Document> {
  userId: string;
  cards: Array<Array<Array<CardProps>>>;
}

export async function POST(request: NextRequest, options: any) {
  let data: null | CardsResponseProps = null;
  let msg: null | string = 'No available Exploration Tickets to claim';

  const { amount, applyPass }: { amount: number; applyPass: boolean } = await request.json();
  const isSuccess: boolean = randomInt(0, 2) > 0;

  if (isSuccess) {
    const { userId } = options.params;
    const [cards] = (await exploreCards(userId, amount, applyPass)) as [CardProps[], CardsCollectionProps];
    const tickets = await consumeTickets(userId, amount);

    msg = null;
    data = {
      result: {
        exploredAmount: amount,
        unExploredAmount: 0,
      },
      explorationTicket: {
        amount: tickets.amount,
        availToClaim: 0,
      },
      card: {
        exploredItems: cards,
      },
    };
  }

  const res: GeneralResponseProps = {
    oper: 'MONSTER_EXPLORING',
    isSuccess,
    msg,
    code: !isSuccess ? 'ITEMS_INSUFFICIENT' : !applyPass ? 'EXPLORATION_PASS_NOT_APPLIED' : undefined,
    data,
  };

  return NextResponse.json(res);
}
