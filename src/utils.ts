import fsPromises from 'fs/promises';
import path from 'path';
import type { TicketProps, ExplorationTicketProps, TicketDatabaseProps, GeneralResponseProps } from '@msm/types';

export async function readDb<T>(fileName: string): Promise<T> {
  const dataFilePath = path.join(process.cwd(), `src/db/${fileName}.json`);
  const res = await fsPromises.readFile(dataFilePath, 'utf-8');
  return JSON.parse(res);
}

export async function writeDb<T>(fileName: string, json: any): Promise<T> {
  const dataFilePath = path.join(process.cwd(), `src/db/${fileName}.json`);
  await fsPromises.writeFile(dataFilePath, JSON.stringify(json), 'utf-8');
  return json;
}

export function randomInt(min: number = 0, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export async function writeTickets(userId: string, newAmount: number): Promise<TicketDatabaseProps> {
  const dbResponse: TicketDatabaseProps = await readDb<TicketDatabaseProps>('tickets');
  const existUserId: string = !!dbResponse[userId] ? userId : 'default';
  const { claimable } = dbResponse[existUserId];
  const updated: TicketDatabaseProps = { ...dbResponse, [existUserId]: { amount: newAmount, claimable } };
  const newRes: TicketDatabaseProps = await writeDb<TicketDatabaseProps>('tickets', updated);
  return newRes;
}
