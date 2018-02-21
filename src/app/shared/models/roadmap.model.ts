export interface Roadmap {
  ID?: number;
  Name?: string;
  StartDate?: Date;
  EndDate?: Date;
  Year?: number;
  Active?: Boolean;
  Completed?: Boolean;
  Phases?: Phase[];
}

export interface Phase {
  ID?: number;
  RoadmapID?: number;
  Title?: string;
  Description?: string;
  StartDate?: Date;
  EndDate?: Date;
  Milestones?: Milestone[];
}

export interface Milestone {
  ID?: number;
  PhaseID?: number;
  Title?: string;
  Description?: string;
  StartDate?: Date;
  EndDate?: Date;
  RecurrenceID?: number;
  Recurrence?: Recurrence;
}

export interface Recurrence {
  ID?: number;
  Name?: string;
  EnglishName?: string;
}
