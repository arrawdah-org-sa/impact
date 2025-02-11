export interface RegistrationData {
  username: string;
  password: string;
  phone: string;
  nickname: string;
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
  isAdmin: boolean;
  isActive: boolean;
  createdAt: string;
  lastLogin?: string;
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}