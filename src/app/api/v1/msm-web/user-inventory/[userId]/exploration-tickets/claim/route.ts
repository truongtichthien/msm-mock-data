import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { TicketProps, ExplorationTicketProps, TicketDatabaseProps, GeneralResponseProps } from '@msm/types';
import { readDb, writeDb, randomInt, writeTickets } from '@msm/utils';

export async function getTicket(userId: string): Promise<TicketProps> {
  const dbResponse: TicketDatabaseProps = await readDb('tickets');
  const entity: TicketProps = dbResponse[userId] ?? dbResponse['default'];
  return entity;
}

export async function GET(request: NextRequest, options: any) {
  const { userId } = options.params;
  const entity: TicketProps = await getTicket(userId);
  return NextResponse.json(entity);
}

export async function POST(request: NextRequest, options: any) {
  const dbResponse: TicketDatabaseProps = await readDb<TicketDatabaseProps>('tickets');
  const { userId } = options.params;
  const existUserId: string = !!dbResponse[userId] ? userId : 'default';
  const { amount, claimable } = dbResponse[existUserId];

  const isSuccess: boolean = !!randomInt(0, 1);
  let data: null | ExplorationTicketProps = null;
  let msg: null | string = 'No available Exploration Tickets to claim';
  if (isSuccess) {
    const newRes = await writeTickets(existUserId, amount + claimable);
    msg = null;
    data = {
      explorationTicket: {
        amount: newRes?.[existUserId]?.amount,
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
