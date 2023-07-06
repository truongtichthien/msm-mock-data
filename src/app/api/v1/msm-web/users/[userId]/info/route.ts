import { NextResponse } from 'next/server';
import fsPromises from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/app/db/users/info.json');

async function getUsersInfo() {
  const res = await fsPromises.readFile(dataFilePath, 'utf-8');
  return JSON.parse(res);
}

export async function GET(request: Request, options: any) {
  const usersInfo = await getUsersInfo();
  console.log(options);
  const { userId } = options.params;

  const info = usersInfo[userId] ?? usersInfo['default'];
  return NextResponse.json(info, { status: 200 });
}
