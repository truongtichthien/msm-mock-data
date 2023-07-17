import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type {
  CardProps,
  CardsLevelProps,
  CardsDatabaseProps,
  CardsResponseProps,
  GeneralResponseProps,
} from '@msm/types';
import { readDb, writeDb, randomInt, writeTickets } from '@msm/utils';
import { COLORS_NAME } from '@msm/constants';
import { getTicket } from '../claim/route';

function generateCard(): CardProps {
  const colorCode: number = randomInt(0, 9);
  return {
    id: randomInt(1234, 4567),
    level: randomInt(0, 3),
    color: {
      code: colorCode,
      label: COLORS_NAME[colorCode],
    },
    strength: {
      max: 10,
      value: randomInt(5, 10),
    },
    attack: {
      max: 10,
      value: randomInt(5, 10),
    },
    defense: {
      max: 10,
      value: randomInt(5, 10),
    },
    traits: ['Sword', 'Fly'],
  };
}

export async function GET(request: NextRequest, options: any) {}

export async function POST(request: NextRequest, options: any) {
  const { amount, applyPass }: { amount: number; applyPass: boolean } = await request.json();
  const isSuccess: boolean = !!randomInt(0, 1);
  let data: null | CardsResponseProps = null;
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
      const {
        level,
        color: { code },
      } = card;
      cards[level][code].push(card);
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
