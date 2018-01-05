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
