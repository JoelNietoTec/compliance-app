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
  id?: number;
  name?: string;
  englishName?: string;
}

export interface AlertReason {
  id?: number;
  alertSourceId?: number;
  alertSource?: AlertSource;
  name?: string;
  englishName?: string;
  alertPriorityId?: number;
  alertPriority?: AlertPriority;
  code?: string;
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
  id?: number;
  name?: string;
  englishName?: string;
}
