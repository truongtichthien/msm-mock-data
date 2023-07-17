import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import type { SbtDatabaseProps, SbtResponseProps } from '@msm/types';
import { readDb } from '@msm/utils';

export async function GET(request: NextRequest, options: any): Promise<Response> {
  const dbResponse: SbtDatabaseProps = await readDb<SbtDatabaseProps>('sbt');
  const { userId } = options.params;
  const entity: number = dbResponse[userId] ?? dbResponse['default'];
  const res: SbtResponseProps = { sbt: entity };
  return NextResponse.json(res);
}
