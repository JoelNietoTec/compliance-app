import { Participant } from './participants.model';

export interface Alert {
  ID?: number;
  AlertSourceID?: number;
  AlertSource?: AlertSource;
  AlertReasonID?: number;
  AlertReason?: AlertReason;
  Description?: string;
  CreateDate?: Date;
  ParticipantID?: number;
  Cleared?: Boolean;
  ClearedDate?: Date;
  Clarification?: string;
  ClearedBy?: number;
}

export interface AlertSource {
  ID?: number;
  Name?: string;
  EnglishName?: string;
}

export interface AlertReason {
  ID?: number;
  AlertSourceID?: number;
  AlertSource?: AlertSource;
  Name?: string;
  EnglishName?: string;
  AlertPriorityID?: number;
  AlertPriority?: AlertPriority;
  Code?: string;
}

export interface ParticipantAlert {
  ID?: number;
  ParticipantID?: number;
  Participant?: Participant;
  AlertTypeID?: number;
  AlertType?: AlertType;
  Name?: string;
  Description?: string;
  Discard?: Boolean;
  Date?: Date;
  Clarification?: string;
  DiscardedUser?: number;
}

export interface AlertType {
  ID?: number;
  Name?: string;
}

export interface AlertPriority {
  ID?: number;
  Name?: string;
  EnglishName?: string;
}
