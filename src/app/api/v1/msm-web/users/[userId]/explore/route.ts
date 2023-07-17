import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import fsPromises from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/db/info.json');

async function readDb() {
  const res = await fsPromises.readFile(dataFilePath, 'utf-8');
  return JSON.parse(res);
}

export async function GET(request: NextRequest, options: any) {
  const dbResponse = await readDb();
  // console.log(options);
  const { userId } = options.params;
  const entity = dbResponse[userId] ?? dbResponse['default'];
  return NextResponse.json(entity);
}

export async function POST(request: NextRequest, options: any) {
  // temp
  const page = request.nextUrl.searchParams.get('for');
  // ~~

  const dbResponse = await readDb();
  // console.log(options);
  const { userId } = options.params;
  const entity = dbResponse[userId] ?? dbResponse['default'];
  return NextResponse.json(entity);
}
