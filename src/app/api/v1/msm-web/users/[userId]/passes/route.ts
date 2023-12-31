import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getPass } from '@msm/mongodb';

export async function GET(request: NextRequest, options: any) {
  const { userId } = options.params;
  const entity = await getPass(userId);
  return NextResponse.json(entity);
}

export async function OPTIONS() {
  // it is a must implementation to serve CORS APIs
  // return the null response
  return NextResponse.json(null);
}
