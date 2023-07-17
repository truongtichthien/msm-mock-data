import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type {
  CardProps,
  CardsLevelProps,
  CardsDatabaseProps,
  CardsResponseProps,
  GeneralResponseProps,
} from '@msm/types';
import { readDb, writeDb, randomInt, writeTickets, generateCard } from '@msm/utils';
import { exploreCards, getCards } from '@msm/mongodb';

// export async function GET(request: NextRequest, options: any) {}

export async function POST(request: NextRequest, options: any) {
  let data: null | CardsResponseProps = null;
  let msg: null | string = 'No available Exploration Tickets to claim';

  const { amount, applyPass }: { amount: number; applyPass: boolean } = await request.json();
  const isSuccess: boolean = randomInt(0, 2) > 0;

  if (isSuccess) {
    const { userId } = options.params;
    const cards = await exploreCards(userId, amount, applyPass);
    console.log(cards);

    // const newCards: Array<CardProps> = Array(applyPass ? exploreAmount : 1)
    //   .fill(0)
    //   .map(() => generateCard());

    // newCards.forEach((card: CardProps) => {
    //   const {
    //     level,
    //     color: { code },
    //   } = card;
    //   cards[level][code].push(card);
    // });

    // const updated = { ...dbResponse, [existUserId]: cards };
    // await writeDb('cards', updated);
    // const tickets = await getTicket(existUserId);
    // await writeTickets(existUserId, tickets.amount - amount);

    // msg = null;
    // data = {
    //   result: {
    //     exploredAmount: amount,
    //     unExploredAmount: 0,
    //   },
    //   explorationTicket: {
    //     amount: tickets.amount - amount,
    //     availToClaim: 0,
    //   },
    //   card: {
    //     exploredItems: newCards,
    //   },
    // };
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
