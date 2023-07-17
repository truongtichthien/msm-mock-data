import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { ExplorationTicketProps, GeneralResponseProps } from '@msm/types';
import { randomInt } from '@msm/utils';
import { claimTickets } from '@msm/factory/tickets';

export function POST(request: NextRequest, options: any) {
  let data: null | ExplorationTicketProps = null;
  let msg: null | string = 'No available Exploration Tickets to claim';

  const isSuccess: boolean = randomInt(0, 2) > 0;

  if (isSuccess) {
    const { userId } = options.params;
    const { amount } = claimTickets(userId);
    msg = null;
    data = { explorationTicket: { amount, availToClaim: 0 } };
  }

  return NextResponse.json({ oper: 'EXPLORATION_TICKET_CLAIMING', isSuccess, msg, data } as GeneralResponseProps);
}
