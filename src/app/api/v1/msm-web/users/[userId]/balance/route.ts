import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import fsPromises from 'fs/promises';
import path from 'path';

function dataFilePath(page: string) {
  return path.join(process.cwd(), `src/db/combine/${page}.json`);
}

async function getUsersBalance(page: string) {
  const res = await fsPromises.readFile(dataFilePath(page), 'utf-8');
  return JSON.parse(res);
}

export async function GET(request: NextRequest, { params }: any) {
  const page = request.nextUrl.searchParams.get('for');
  const { userId } = params;

  let usersBalance;
  switch (page) {
    case 'home':
      usersBalance = await getUsersBalance('home');
      break;
    case 'explore':
      usersBalance = await getUsersBalance('explore');
      break;
    case 'store':
      usersBalance = await getUsersBalance('store');
      console.log(usersBalance);
      break;
    case 'merge':
      usersBalance = await getUsersBalance('merge');
      break;
    case 'forge':
      usersBalance = await getUsersBalance('forge');
      break;
    default:
      console.log('default');
      usersBalance = { default: {} };
      break;
  }

  const balance = usersBalance[userId] ?? usersBalance['default'];
  return NextResponse.json(balance, { status: 200 });
}
