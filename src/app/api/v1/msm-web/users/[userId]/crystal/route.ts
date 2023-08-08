import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getCrystal } from '@msm/mongodb';

export async function GET(request: NextRequest, options: any) {
  const { userId } = options.params;
  const entity = await getCrystal(userId);
  const { crystal } = entity;
  return NextResponse.json({ ...entity, amount: crystal, crystal: undefined });
}

export async function OPTIONS() {
  // it is a must implementation to serve CORS APIs
  // return the null response
  return NextResponse.json(null);
}
