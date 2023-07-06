import { NextResponse } from 'next/server';
import fsPromises from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/app/db/users/balance.json');

async function getUsersBalance() {
  const res = await fsPromises.readFile(dataFilePath, 'utf-8');
  return JSON.parse(res);
}

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  const usersBalance = await getUsersBalance();
  const { userId } = params;

  const balance = usersBalance[userId] ?? usersBalance['default'];
  return NextResponse.json(balance, { status: 200 });
}
