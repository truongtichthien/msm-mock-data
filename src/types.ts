export type UserProps = {
  [key in '_id' | 'userId' | 'name' | 'email' | 'iskraTier' | 'wallet']: string;
};

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
  data: ExplorationTicketProps | null;
};

export type CardProps = {
  id: number;
  level: number;
  color: {
    code: number;
    label: string;
  };
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

export type CardsLevelProps = Array<Array<Array<CardProps>>>;

export type CardsDatabaseProps = { [key: string]: CardsLevelProps };

export type CardsResponseProps = {
  result: {
    exploredAmount: number;
    unExploredAmount: number;
  };
  explorationTicket: {
    amount: number;
    availToClaim: number;
  };
  card: {
    exploredItems: Array<CardProps>;
  };
};
