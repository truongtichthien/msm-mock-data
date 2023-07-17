import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { TicketProps, ExplorationTicketProps, TicketDatabaseProps, GeneralResponseProps } from '@msm/types';
import { readDb, randomInt } from '@msm/utils';
import { getTickets, claimTickets } from '@msm/mongodb';

export async function getTicket(userId: string): Promise<TicketProps> {
  const dbResponse: TicketDatabaseProps = await readDb('tickets');
  const entity: TicketProps = dbResponse[userId] ?? dbResponse['default'];
  return entity;
}

export async function POST(request: NextRequest, options: any) {
  const { userId } = options.params;
  const { amount, claimable } = await getTickets(userId);

  const isSuccess: boolean = !!randomInt(0, 1);

  let data: null | ExplorationTicketProps = null;
  let msg: null | string = 'No available Exploration Tickets to claim';
  if (isSuccess) {
    const newRes = await claimTickets(userId);
    msg = null;
    data = {
      explorationTicket: {
        amount: newRes?.[userId]?.amount,
        availToClaim: 0,
      },
    };
  }

  const res: GeneralResponseProps = {
    oper: 'EXPLORATION_TICKET_CLAIMING',
    isSuccess,
    msg,
    data,
  };

  return NextResponse.json(res);
}
