import { Participant } from './participants.model';

export interface Task {
  ID?: number;
  CategoryID?: number;
  ProjectID?: number;
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

export interface TaskCount {
  Count?: number;
  CategoryID?: number;
  Category?: string;
  StatusID?: number;
  Status?: string;
}
