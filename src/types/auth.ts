export interface RegistrationData {
  username: string;
  nickname: string;
  password: string;
  phone: string;
  phoneVerified?: boolean;
  firebaseUid?: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface UserProfile {
  id: string;
  username: string;
  nickname: string;
  phone: string;
  phoneVerified: boolean;
  createdAt: Date;
  lastLogin?: Date;
  isActive: boolean;
}