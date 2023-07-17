import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import fsPromises from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/db/ticket.json');

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

export async function OPTIONS() {
  // it is a must implementation to serve CORS APIs
  // return the null response or remove whole OPTIONS function
  return NextResponse.json(null);
}
