import { NextResponse } from 'next/server';
import fsPromises from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/app/db/users/info.json');

async function getUsersInfo() {
  const res = await fsPromises.readFile(dataFilePath, 'utf-8');
  return JSON.parse(res);
}

export async function GET(request: Request, options: any) {
  // const usersInfo = await getUsersInfo();
  // console.log(options);
  // const { userId } = options.params;
  // const info = usersInfo[userId] ?? usersInfo['default'];

  return NextResponse.json({ abc: 123 });
}

export async function POST(request: Request, options: any) {}

export async function PUT(request: Request, options: any) {}

export async function DELETE(request: Request, options: any) {}

export async function PATCH(request: Request, options: any) {}

// it is a must implementation to serve CORS APIs
export async function OPTIONS() {
  return NextResponse.json({});
}
