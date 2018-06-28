export interface User {
  id?: number;
  userName?: string;
  password?: string;
  email?: string;
  active?: number;
  createDate?: Date;
  lastChangePassword?: Date;
  userProfileId?: number;
  userProfile?: UserProfile;
}

export interface UserProfile {
  id?: number;
  name?: string;
  englishName?: string;
}
