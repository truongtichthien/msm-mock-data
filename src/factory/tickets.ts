import { DEFAULT_USER_ID } from '@msm/constants';

const tickets = [
  {
    userId: DEFAULT_USER_ID,
    amount: 343,
    availToClaim: 10,
  },
  {
    userId: '1357284c-671e-44c6-9b24-c19697729a70',
    amount: 555,
    availToClaim: 20,
  },
];

export function getTickets() {
  return tickets;
}

export function consumeTickets(userId: string, consume: number) {
  let idx = tickets.findIndex((ele) => ele.userId === userId);
  if (idx < 0) idx = 0;
  tickets[idx] = {
    ...tickets[idx],
    amount: tickets[idx].amount - consume,
  };

  return tickets[idx];
}

export function claimTickets(userId: string) {
  let idx = tickets.findIndex((ele) => ele.userId === userId);
  if (idx < 0) idx = 0;

  tickets[idx] = {
    ...tickets[idx],
    amount: tickets[idx].amount + tickets[idx].availToClaim,
  };

  return tickets[idx];
}

export default tickets;
