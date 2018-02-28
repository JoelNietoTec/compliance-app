export interface ParticipantProfile {
  ID?: number;
  ParticipantID?: number;
  Total?: number;
  ModifiedDate?: Date;
  Accounts?: ProfileAccount[];
}

export interface ProfileAccount {
  ID?: number;
  ParticipantProfileID?: number;
  Code?: string;
  Name?: string;
  AccountTypeID?: number;
  AccountType?: AccountType;
}

export interface AccountType {
  ID?: number;
  Name?: number;
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
