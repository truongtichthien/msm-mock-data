import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getTickets } from '@msm/mongodb';

export async function GET(request: NextRequest, options: any) {
  const { userId } = options.params;
  const entity = await getTickets(userId);
  return NextResponse.json(entity);
}
