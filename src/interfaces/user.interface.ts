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

export interface IUserRepository {
  FindById(id: string): Promise<IUser | null>;
  Create(userData: Omit<IUser, 'id'>): Promise<IUser>;
  Update(id: string, userData: Omit<IUser, 'id'>): Promise<IUser>;
  Delete(id: string): Promise<void>;
}
