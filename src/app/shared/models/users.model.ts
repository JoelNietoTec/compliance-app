export interface User {
  id?: number;
  userName?: string;
  password?: string;
  email?: string;
  active?: number;
  createDate?: Date;
  lastChangePassword?: Date;
  userProfileID?: number;
  userProfile?: UserProfile;
}

export interface UserProfile {
  id?: number;
  name?: string;
  englishName?: string;
}
