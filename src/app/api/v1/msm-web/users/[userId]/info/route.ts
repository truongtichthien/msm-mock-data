import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getUsers } from '@msm/mongodb';
import type { UsersCollectionProps } from '@msm/types';

export async function GET(request: NextRequest, options: any) {
  const { userId } = options.params;
  const entity: UsersCollectionProps = await getUsers(userId);
  return NextResponse.json(entity);
}

export async function POST(request: NextRequest, options: any) {}

export async function PUT(request: NextRequest, options: any) {}

export async function DELETE(request: NextRequest, options: any) {}

export async function PATCH(request: NextRequest, options: any) {}

// it is a must implementation to serve CORS APIs
export async function OPTIONS() {
  // it is a must implementation to serve CORS APIs
  // return the null response or remove whole OPTIONS function
  return NextResponse.json(null);
}
