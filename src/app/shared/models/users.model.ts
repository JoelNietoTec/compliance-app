export interface User {
  ID?: number;
  UserName?: string;
  Password?: string;
  Email?: string;
  Active?: number;
  CreateDate?: Date;
  LastChangePassword?: Date;
  UserProfileID?: number;
  UserProfile?: UserProfile;
}

export interface UserProfile {
  ID?: number;
  Name?: string;
  EnglishName?: string;
}
