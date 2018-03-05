export interface ParticipantProfile {
  ID?: number;
  ParticipantID?: number;
  Total?: number;
  ModifiedDate?: Date;
  Accounts?: ProfileAccount[];
  MonthlyIncomeLimit?: number;
  MonthlyExpenseLimit?: number;
}

export interface ProfileAccount {
  ID?: number;
  ParticipantProfileID?: number;
  Code?: string;
  Name?: string;
  AccountTypeID?: number;
  AccountType?: AccountType;
  Amount?: number;
  BankID?: number;
  Bank?: Bank;
}

export interface AccountType {
  ID?: number;
  Name?: string;
}

export interface Transaction {
  ID?: number;
  TransactionTypeID?: number;
  Title?: string;
  Description?: string;
  AccountID?: number;
  Date?: Date;
  Amount?: number;
}

export interface TransactionType {
  ID?: number;
  Name?: string;
}

export interface Bank {
  ID?: number;
  BankTypeID?: number;
  BankType?: BankType;
  Name: string;
  ShortName: string;
}

export interface BankType {
  ID?: number;
  Name?: string;
}
