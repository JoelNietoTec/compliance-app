import { Participant } from './participants.model';
import { ProfileProduct } from './products.model';

export interface ParticipantProfile {
  ID?: number;
  ParticipantID?: number;
  Total?: number;
  ModifiedDate?: Date;
  Accounts?: ProfileAccount[];
  Products?: ProfileProduct[];
  Transactions?: Transaction[];
  MonthlyIncomeLimit?: number;
  MonthlyExpenseLimit?: number;
  IncomeYTD?: number;
  IncomeMTD?: number;
  ExpenseYTD?: number;
  ExpenseMTD?: number;
  TransactionsLimit?: number;
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
  EnglishName?: string;
}

export interface Transaction {
  ID?: number;
  TransactionTypeID?: number;
  ParticipantID?: number;
  Participant?: Participant;
  ProfileProductID?: number;
  ProfileProduct?: ProfileProduct;
  TransactionSourceID?: number;
  TransactionSource?: TransactionSource;
  TransactionType?: TransactionType;
  ParticipantProfileID?: number;
  Title?: string;
  Description?: string;
  AccountID?: number;
  Account?: ProfileAccount;
  Date?: Date;
  Amount?: number;
}

export interface TransactionType {
  ID?: number;
  Name?: string;
}

export interface TransactionSource {
  ID?: number;
  Name?: string;
  EnglishName?: string;
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

export interface FinancialDashboard {
  ParticipantID?: number;
  Month?: number;
  Type?: string;
  Account?: string;
  Source?: string;
  Bank?: string;
  ProfileProduct?: string;
  FinancialProduct?: string;
  ProductType?: string;
  Amount?: number;
}
