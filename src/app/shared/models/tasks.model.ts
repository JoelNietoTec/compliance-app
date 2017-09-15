export interface Task {
  ID?: number;
  Title?: string;
  Description?: string;
  CreatedDate?: Date;
  BeginDate?: Date;
  ExpirationDate?: Date;
  CompletedDate?: Date;
  StatusID?: number;
  ParticipantID?: number;
  TaskStatus?: TaskStatus;
}

export interface TaskStatus {
  ID?: number;
  Name?: string;
  EnglishName?: string;
}
