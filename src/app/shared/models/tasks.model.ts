import { Participant } from './participants.model';

export interface Task {
  ID?: number;
  CategoryID?: number;
  Title?: string;
  Description?: string;
  CreatedDate?: Date;
  BeginDate?: Date;
  ExpirationDate?: Date;
  CompletedDate?: Date;
  StatusID?: number;
  ParticipantID?: number;
  Participant?: Participant;
  TaskStatus?: TaskStatus;
}

export interface TaskStatus {
  ID?: number;
  Name?: string;
  EnglishName?: string;
}
