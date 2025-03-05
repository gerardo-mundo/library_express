import { User } from '@prisma/client';

export interface IUser
  extends Omit<User, 'id' | 'last_session' | 'created_at'> {
  role: UserRoles;
}

export interface UserCredentials {
  email: string;
  pasword: string;
}

export type UserRoles =
  | 'USER'
  | 'ADMIN'
  | 'AUXILIARY'
  | 'STUDENT'
  | 'PROFESSOR';
