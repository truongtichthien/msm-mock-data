import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import fsPromises from 'fs/promises';
import path from 'path';

const abilityValues = ['strength', 'attack', 'defense'];

const dataFilePath = path.join(process.cwd(), 'src/db/cards.json');

async function readDb() {
  const res = await fsPromises.readFile(dataFilePath, 'utf-8');
  return JSON.parse(res);
}

export async function GET(request: NextRequest, options: any) {
  const dbResponse = await readDb();
  const { userId } = options.params;
  const entity = dbResponse[userId] ?? dbResponse['default'];

  // get the best cars of all levels
  const levelAllBest = entity
    .map((ele: any) => ele.reduce((a: any, e: any) => [...a, ...e], []), [])
    .map((ele: any) =>
      ele.reduce((pre: any, cur: any) => {
        const preValue = abilityValues.map((prop) => pre?.[prop]?.value || 0).join('');
        const curValue = abilityValues.map((prop) => cur?.[prop]?.value || 0).join('');
        return preValue >= curValue ? pre : cur;
      }, {}),
    );

  // the best card
  const best = levelAllBest.reduce((acc: any, ele: any) => (ele.id ? ele : acc), {});

  // cards based on levels
  const levels = entity?.reduce((acc: any, grades: any, idx: number) => {
    return {
      ...acc,
      [`level${idx + 1}`]: {
        mergeable: grades.reduce((bool: any, colors: any) => bool && colors.length > 0, true),
        cards: grades.map((colors: any) => colors.length),
      },
    };
  }, {});

  return NextResponse.json({ best, ...levels });
}
