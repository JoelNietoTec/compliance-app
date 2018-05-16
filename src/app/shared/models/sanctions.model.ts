import { Participant } from './participants.model';

export interface List {
  ID?: number;
  Name?: String;
}

export interface Sanction {
  ID?: number;
  ListID?: number;
  Date?: Date;
  Term1: String;
  Term2: String;
  Term3: String;
  Term4: String;
  Term5: String;
  FullTerm?: String;
}

export interface SanctionedItem {
  ID?: number;
  ListID?: number;
  Date?: Date;
  Term1?: String;
  Term2?: String;
  Term3?: String;
  Term4?: String;
  FullTerm?: String;
  Comments?: String;
  Country?: String;
}

export interface Discard {
  ID?: number;
  ListID?: number;
  List?: List;
  Date?: Date;
}

export interface DiscardMatch {
  ID?: number;
  DiscardID?: number;
  SanctionID?: number;
  Sanction?: Sanction;
  ParticipantID?: number;
  Participant?: Participant;
  Pending?: Boolean;
  Valid?: Boolean;
}

export interface Comparison {
  ID?: number;
  Date?: Date;
  File?: string;
}

export interface Match {
  ID?: number;
  ComparisonID?: number;
  Comparison?: Comparison;
  ParticipantID?: number;
  Participant?: Participant;
  Term1?: String;
  Term2?: string;
  Pending?: boolean;
  Confirmed?: boolean;
  Score?: number;
}

export interface SanctionList {
  ID?: number;
  Name?: string;
  NameSpace?: string;
  URL?: string;
  ElementIDs?: string;
  TermField?: string;
  CommentsField?: string;
  CountryField?: string;
  ActiveSearch?: Boolean;
  LoadDate?: Date;
}
