import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type {
  CardProps,
  CardsLevelProps,
  CardsDatabaseProps,
  ExploredCardsResponseProps,
  GeneralResponseProps,
} from '@msm/types';
import { readDb, writeDb, randomInt, writeTickets, generateCard } from '@msm/utils';
import { getTicket } from '../claim/file_route';
import { COLORS_NAME } from '@msm/constants';

export async function GET(request: NextRequest, options: any) {}

export async function POST(request: NextRequest, options: any) {
  const { amount, applyPass }: { amount: number; applyPass: boolean } = await request.json();
  const isSuccess: boolean = !!randomInt(0, 1);
  let data: null | ExploredCardsResponseProps = null;
  let msg: null | string = 'No available Exploration Tickets to claim';
  if (isSuccess) {
    const dbResponse: CardsDatabaseProps = await readDb('cards');
    const { userId } = options.params;
    const existUserId: string = !!dbResponse[userId] ? userId : 'default';
    const cards: CardsLevelProps = dbResponse[existUserId];

    const newCards: Array<CardProps> = Array(applyPass ? amount : 1)
      .fill(0)
      .map(() => generateCard());

    newCards.forEach((card: CardProps) => {
      const { level, color } = card;
      const colorIdx = COLORS_NAME.findIndex((e) => e === color);
      cards[level][colorIdx].push(card);
    });
    const updated = { ...dbResponse, [existUserId]: cards };
    await writeDb('cards', updated);
    const tickets = await getTicket(existUserId);
    await writeTickets(existUserId, tickets.amount - amount);

    msg = null;
    data = {
      result: {
        exploredAmount: amount,
        unExploredAmount: 0,
      },
      explorationTicket: {
        amount: tickets.amount - amount,
        availToClaim: 0,
      },
      card: {
        exploredItems: newCards,
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
