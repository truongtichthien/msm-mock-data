import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { CardsResponseProps, GeneralResponseProps } from '@msm/types';
import { randomInt } from '@msm/utils';
import { consumeTickets } from '@msm/factory/tickets';
import { exploreCards } from '@msm/factory/cards';

export async function POST(request: NextRequest, options: any) {
  let data: null | CardsResponseProps = null;
  let msg: null | string = 'No available Exploration Tickets to claim';

  const { amount, applyPass }: { amount: number; applyPass: boolean } = await request.json();
  const isSuccess: boolean = randomInt(0, 2) > 0;

  if (isSuccess) {
    const { userId } = options.params;
    const cards = exploreCards(userId, amount, applyPass);
    const tickets = consumeTickets(userId, amount);

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
    oper: 'EXPLORATION_TICKET_CLAIMING',
    isSuccess,
    msg,
    code: !isSuccess ? 'ITEMS_INSUFFICIENT' : !applyPass ? 'EXPLORATION_PASS_NOT_APPLIED' : undefined,
    data,
  };

  return NextResponse.json(res);
}
