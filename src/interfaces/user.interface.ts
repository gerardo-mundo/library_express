import { User } from '@prisma/client';

export interface IUser extends User {
  role: UserRoles;
}

export type InitialUserCreation = Omit<
  IUser,
  'id' | 'role' | 'last_session' | 'created_at'
>;

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

export interface IUserService {
  getUsers(): Promise<IUser[]>;
  createUserAccount(
    userData: InitialUserCreation
  ): Promise<Omit<IUser, 'password' | 'last_session'>>;
}
