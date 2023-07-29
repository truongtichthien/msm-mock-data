import type { WithId, Document, ObjectId } from 'mongodb';

export type UsersCollectionProps = {
  [key in '_id' | 'userId' | 'name' | 'email' | 'iskraTier' | 'wallet']: string;
};

export type AbilityProps = 'strength' | 'attack' | 'defense';

export type CardProps = {
  id: number;
  level: number;
  color: string;
  // {
  //   code: number;
  //   label: string;
  // };
  strength: {
    max: number;
    value: number;
  };
  attack: {
    max: number;
    value: number;
  };
  defense: {
    max: number;
    value: number;
  };
  traits: Array<string>;
};

export interface CardsCollectionProps extends WithId<Document> {
  userId: string;
  cards: Array<Array<Array<CardProps>>>;
}

export type CardsLevelProps = Array<Array<Array<CardProps>>>;

// ~~~

export type SbtDatabaseProps = { [key: string]: number };
export type SbtResponseProps = { sbt: number };

export type TicketProps = { [key in 'amount' | 'claimable']: number };

export type TicketDatabaseProps = { [key: string]: TicketProps };

export type ExplorationTicketProps = {
  explorationTicket: {
    [key in 'amount' | 'availToClaim']: number;
  };
};

export type GeneralResponseProps = {
  oper: string;
  isSuccess: boolean;
  msg: string | null;
  code?: string;
  data: ExplorationTicketProps | ExploredCardsResponseProps | MergedCardsReponse | null;
};

export type CardsDatabaseProps = { [key: string]: CardsLevelProps };

export type ExploredCardsResponseProps = {
  result?: {
    exploredAmount: number;
    unExploredAmount: number;
  };
  explorationTicket?: {
    amount: number;
    availToClaim: number;
  };
  card:
    | {
        exploredItems: Array<CardProps>;
      }
    | CardProps;
};

export type MergedCardsReponse = {
  merged: Array<CardProps>;
  card: Array<Array<number>>;
};
