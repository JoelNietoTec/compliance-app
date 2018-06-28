import { User } from './users.model';
import { Participant } from './participants.model';

export interface Assignment {
  id?: number;
  projectId?: number;
  project?: Project;
  assignmentTypeId?: number;
  type?: AssignmentType;
  title?: string;
  description?: string;
  createdDate?: Date;
  createUserId?: number;
  createUser?: User;
  startDate?: Date;
  dueDate?: Date;
  completedDate?: Date;
  assignedUserId?: number;
  assignerUser?: User;
  participantId?: number;
  participant?: Participant;
  progressId?: number;
  progress?: Progress;
}

export interface Progress {
  id?: number;
  name?: string;
  englishName?: string;
}

export interface Project {
  id?: number;
  title?: string;
  description?: string;
  startDate?: Date;
  dueDate?: Date;
  active?: boolean;
}

export interface AssignmentType {
  id?: number;
  name?: string;
  englishName?: string;
}
