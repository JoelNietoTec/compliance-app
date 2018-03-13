import { Participant } from './participants.model';

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
