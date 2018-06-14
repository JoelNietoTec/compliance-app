import { Participant } from './participants.model';
import { ProfileProduct } from './products.model';

export interface ParticipantProfile {
  id?: number;
  participantId?: number;
  total?: number;
  modifiedDate?: Date;
  Accounts?: ProfileAccount[];
  Products?: ProfileProduct[];
  transactions?: Transaction[];
  monthlyIncomeLimit?: number;
  monthlyExpenseLimit?: number;
  incomeYTD?: number;
  incomeMTD?: number;
  expenseYTD?: number;
  expenseMTD?: number;
  transactionsLimit?: number;
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
  id?: number;
  transactionTypeId?: number;
  participantId?: number;
  participant?: Participant;
  profileProductId?: number;
  product?: ProfileProduct;
  transactionSourceId?: number;
  source?: TransactionSource;
  type?: TransactionType;
  participantProfileId?: number;
  title?: string;
  description?: string;
  accountId?: number;
  account?: ProfileAccount;
  date?: Date;
  amount?: number;
}

export interface TransactionType {
  id?: number;
  name?: string;
}

export interface TransactionSource {
  id?: number;
  name?: string;
  englishName?: string;
}

export interface Bank {
  id?: number;
  bankTypeId?: number;
  type?: BankType;
  name: string;
  shortName: string;
}

export interface BankType {
  id?: number;
  name?: string;
}

export interface FinancialDashboard {
  participantId?: number;
  month?: number;
  type?: string;
  account?: string;
  source?: string;
  bank?: string;
  profileProduct?: string;
  financialProduct?: string;
  productType?: string;
  amount?: number;
}
