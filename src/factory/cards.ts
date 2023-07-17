import type { CardProps } from '@msm/types';
import { DEFAULT_USER_ID } from '@msm/constants';
import { readDb, writeDb, randomInt, writeTickets, generateCard } from '@msm/utils';

type CardsCollectionProps = Array<{
  userId: string;
  cards: Array<Array<Array<CardProps>>>;
}>;

const cards: CardsCollectionProps = [
  {
    userId: DEFAULT_USER_ID,
    cards: [
      [
        [
          {
            id: 1251,
            level: 0,
            color: {
              code: 0,
              label: 'magenta',
            },
            strength: {
              max: 10,
              value: 10,
            },
            attack: {
              max: 10,
              value: 8,
            },
            defense: {
              max: 10,
              value: 10,
            },
            traits: ['Sword', 'Fly'],
          },
        ],
        [
          {
            id: 2566,
            level: 0,
            color: {
              code: 1,
              label: 'orange',
            },
            strength: {
              max: 10,
              value: 6,
            },
            attack: {
              max: 10,
              value: 6,
            },
            defense: {
              max: 10,
              value: 9,
            },
            traits: ['Sword', 'Fly'],
          },
        ],
        [
          {
            id: 2791,
            level: 0,
            color: {
              code: 2,
              label: 'yellow',
            },
            strength: {
              max: 10,
              value: 10,
            },
            attack: {
              max: 10,
              value: 10,
            },
            defense: {
              max: 10,
              value: 6,
            },
            traits: ['Sword', 'Fly'],
          },
        ],
        [
          {
            id: 1558,
            level: 0,
            color: {
              code: 3,
              label: 'green',
            },
            strength: {
              max: 10,
              value: 7,
            },
            attack: {
              max: 10,
              value: 7,
            },
            defense: {
              max: 10,
              value: 5,
            },
            traits: ['Sword', 'Fly'],
          },
        ],
        [
          {
            id: 4547,
            level: 0,
            color: {
              code: 4,
              label: 'tiffany',
            },
            strength: {
              max: 10,
              value: 9,
            },
            attack: {
              max: 10,
              value: 5,
            },
            defense: {
              max: 10,
              value: 9,
            },
            traits: ['Sword', 'Fly'],
          },
        ],
        [
          {
            id: 1237,
            level: 0,
            color: {
              code: 5,
              label: 'skyblue',
            },
            strength: {
              max: 10,
              value: 10,
            },
            attack: {
              max: 10,
              value: 8,
            },
            defense: {
              max: 10,
              value: 5,
            },
            traits: ['Sword', 'Fly'],
          },
        ],
        [
          {
            id: 3909,
            level: 0,
            color: {
              code: 6,
              label: 'blue',
            },
            strength: {
              max: 10,
              value: 5,
            },
            attack: {
              max: 10,
              value: 5,
            },
            defense: {
              max: 10,
              value: 10,
            },
            traits: ['Sword', 'Fly'],
          },
        ],
        [
          {
            id: 3434,
            level: 0,
            color: {
              code: 7,
              label: 'purpil',
            },
            strength: {
              max: 10,
              value: 10,
            },
            attack: {
              max: 10,
              value: 7,
            },
            defense: {
              max: 10,
              value: 7,
            },
            traits: ['Sword', 'Fly'],
          },
        ],
        [
          {
            id: 3365,
            level: 0,
            color: {
              code: 8,
              label: 'silver',
            },
            strength: {
              max: 10,
              value: 6,
            },
            attack: {
              max: 10,
              value: 6,
            },
            defense: {
              max: 10,
              value: 9,
            },
            traits: ['Sword', 'Fly'],
          },
        ],
        [
          {
            id: 3940,
            level: 0,
            color: {
              code: 9,
              label: 'black',
            },
            strength: {
              max: 10,
              value: 10,
            },
            attack: {
              max: 10,
              value: 9,
            },
            defense: {
              max: 10,
              value: 8,
            },
            traits: ['Sword', 'Fly'],
          },
        ],
      ],
      [
        [],
        [],
        [
          {
            id: 1996,
            level: 1,
            color: {
              code: 2,
              label: 'yellow',
            },
            strength: {
              max: 10,
              value: 9,
            },
            attack: {
              max: 10,
              value: 8,
            },
            defense: {
              max: 10,
              value: 6,
            },
            traits: ['Sword', 'Fly'],
          },
        ],
        [
          {
            id: 4136,
            level: 1,
            color: {
              code: 3,
              label: 'green',
            },
            strength: {
              max: 10,
              value: 9,
            },
            attack: {
              max: 10,
              value: 9,
            },
            defense: {
              max: 10,
              value: 6,
            },
            traits: ['Sword', 'Fly'],
          },
        ],
        [],
        [
          {
            id: 1908,
            level: 1,
            color: {
              code: 5,
              label: 'skyblue',
            },
            strength: {
              max: 10,
              value: 5,
            },
            attack: {
              max: 10,
              value: 6,
            },
            defense: {
              max: 10,
              value: 6,
            },
            traits: ['Sword', 'Fly'],
          },
        ],
        [
          {
            id: 4320,
            level: 1,
            color: {
              code: 6,
              label: 'blue',
            },
            strength: {
              max: 10,
              value: 6,
            },
            attack: {
              max: 10,
              value: 5,
            },
            defense: {
              max: 10,
              value: 6,
            },
            traits: ['Sword', 'Fly'],
          },
        ],
        [
          {
            id: 3800,
            level: 1,
            color: {
              code: 7,
              label: 'purpil',
            },
            strength: {
              max: 10,
              value: 7,
            },
            attack: {
              max: 10,
              value: 6,
            },
            defense: {
              max: 10,
              value: 5,
            },
            traits: ['Sword', 'Fly'],
          },
        ],
        [
          {
            id: 1867,
            level: 1,
            color: {
              code: 8,
              label: 'silver',
            },
            strength: {
              max: 10,
              value: 9,
            },
            attack: {
              max: 10,
              value: 7,
            },
            defense: {
              max: 10,
              value: 5,
            },
            traits: ['Sword', 'Fly'],
          },
        ],
        [
          {
            id: 1923,
            level: 1,
            color: {
              code: 9,
              label: 'black',
            },
            strength: {
              max: 10,
              value: 9,
            },
            attack: {
              max: 10,
              value: 6,
            },
            defense: {
              max: 10,
              value: 7,
            },
            traits: ['Sword', 'Fly'],
          },
        ],
      ],
      [
        [],
        [
          {
            id: 2566,
            level: 2,
            color: {
              code: 1,
              label: 'orange',
            },
            strength: {
              max: 10,
              value: 6,
            },
            attack: {
              max: 10,
              value: 6,
            },
            defense: {
              max: 10,
              value: 9,
            },
            traits: ['Sword', 'Fly'],
          },
        ],
        [],
        [],
        [
          {
            id: 1814,
            level: 2,
            color: {
              code: 4,
              label: 'tiffany',
            },
            strength: {
              max: 10,
              value: 9,
            },
            attack: {
              max: 10,
              value: 8,
            },
            defense: {
              max: 10,
              value: 7,
            },
            traits: ['Sword', 'Fly'],
          },
        ],
        [
          {
            id: 1237,
            level: 2,
            color: {
              code: 5,
              label: 'skyblue',
            },
            strength: {
              max: 10,
              value: 10,
            },
            attack: {
              max: 10,
              value: 8,
            },
            defense: {
              max: 10,
              value: 5,
            },
            traits: ['Sword', 'Fly'],
          },
        ],
        [
          {
            id: 1395,
            level: 2,
            color: {
              code: 6,
              label: 'blue',
            },
            strength: {
              max: 10,
              value: 5,
            },
            attack: {
              max: 10,
              value: 7,
            },
            defense: {
              max: 10,
              value: 6,
            },
            traits: ['Sword', 'Fly'],
          },
        ],
        [
          {
            id: 1389,
            level: 2,
            color: {
              code: 7,
              label: 'purpil',
            },
            strength: {
              max: 10,
              value: 10,
            },
            attack: {
              max: 10,
              value: 10,
            },
            defense: {
              max: 10,
              value: 10,
            },
            traits: ['Sword', 'Fly'],
          },
        ],
        [
          {
            id: 1263,
            level: 3,
            color: {
              code: 8,
              label: 'Silver',
            },
            strength: {
              max: 10,
              value: 7,
            },
            attack: {
              max: 10,
              value: 9,
            },
            defense: {
              max: 10,
              value: 8,
            },
            traits: ['Sword', 'Fly'],
          },
        ],
        [],
      ],
      [
        [
          {
            id: 3695,
            level: 3,
            color: {
              code: 0,
              label: 'magenta',
            },
            strength: {
              max: 10,
              value: 10,
            },
            attack: {
              max: 10,
              value: 7,
            },
            defense: {
              max: 10,
              value: 8,
            },
            traits: ['Sword', 'Fly'],
          },
        ],
        [
          {
            id: 3196,
            level: 3,
            color: {
              code: 1,
              label: 'orange',
            },
            strength: {
              max: 10,
              value: 7,
            },
            attack: {
              max: 10,
              value: 6,
            },
            defense: {
              max: 10,
              value: 10,
            },
            traits: ['Sword', 'Fly'],
          },
        ],
        [
          {
            id: 4053,
            level: 3,
            color: {
              code: 2,
              label: 'yellow',
            },
            strength: {
              max: 10,
              value: 7,
            },
            attack: {
              max: 10,
              value: 5,
            },
            defense: {
              max: 10,
              value: 5,
            },
            traits: ['Sword', 'Fly'],
          },
        ],
        [
          {
            id: 3222,
            level: 3,
            color: {
              code: 3,
              label: 'green',
            },
            strength: {
              max: 10,
              value: 5,
            },
            attack: {
              max: 10,
              value: 7,
            },
            defense: {
              max: 10,
              value: 9,
            },
            traits: ['Sword', 'Fly'],
          },
        ],
        [
          {
            id: 4124,
            level: 3,
            color: {
              code: 4,
              label: 'tiffany',
            },
            strength: {
              max: 10,
              value: 9,
            },
            attack: {
              max: 10,
              value: 8,
            },
            defense: {
              max: 10,
              value: 10,
            },
            traits: ['Sword', 'Fly'],
          },
        ],
        [
          {
            id: 2161,
            level: 3,
            color: {
              code: 5,
              label: 'skyblue',
            },
            strength: {
              max: 10,
              value: 6,
            },
            attack: {
              max: 10,
              value: 9,
            },
            defense: {
              max: 10,
              value: 5,
            },
            traits: ['Sword', 'Fly'],
          },
        ],
        [
          {
            id: 1256,
            level: 3,
            color: {
              code: 6,
              label: 'blue',
            },
            strength: {
              max: 10,
              value: 10,
            },
            attack: {
              max: 10,
              value: 6,
            },
            defense: {
              max: 10,
              value: 8,
            },
            traits: ['Sword', 'Fly'],
          },
        ],
        [
          {
            id: 2068,
            level: 3,
            color: {
              code: 7,
              label: 'purpil',
            },
            strength: {
              max: 10,
              value: 7,
            },
            attack: {
              max: 10,
              value: 5,
            },
            defense: {
              max: 10,
              value: 5,
            },
            traits: ['Sword', 'Fly'],
          },
        ],
        [],
        [
          {
            id: 4296,
            level: 3,
            color: {
              code: 9,
              label: 'black',
            },
            strength: {
              max: 10,
              value: 9,
            },
            attack: {
              max: 10,
              value: 10,
            },
            defense: {
              max: 10,
              value: 7,
            },
            traits: ['Sword', 'Fly'],
          },
        ],
      ],
      [[], [], [], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], [], [], []],
    ],
  },
];

export function exploreCards(userId: string, amount: number, applyPass: boolean) {
  let idx = cards.findIndex((ele) => ele.userId === userId);
  if (idx < 0) idx = 0;

  const newCards: Array<CardProps> = Array(applyPass ? amount : 1)
    .fill(0)
    .map(() => generateCard());

  newCards.forEach((card: CardProps) => {
    const {
      level,
      color: { code },
    } = card;
    cards[idx].cards[level][code].push(card);
  });

  return newCards;
}

export function mergeCards(userId: string, grade: number) {
  return;
}

export default cards;
