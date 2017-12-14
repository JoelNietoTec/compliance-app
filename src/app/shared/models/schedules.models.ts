export interface Schedule {
  ID?: number;
  Year?: number;
  Title?: string;
  Description?: string;
  BeginDate?: Date;
  CompleteDate?: Date;
  Status?: Boolean;
  Milestones?: Array<Milestone>;
}

export interface Milestone {
  ID?: number;
  Title?: string;
  ScheduleID?: number;
  Goal?: string;
  BeginDate?: Date;
  CompleteDate?: Date;
  Completion?: number;
  Jobs?: Array<Job>;
}

export interface Job {
  ID?: number;
  Title?: string;
  MilestoneID?: number;
  Goal?: string;
  Comments?: string;
  BeginDate?: Date;
  CompleteDate?: Date;
  Completion?: number;
}
