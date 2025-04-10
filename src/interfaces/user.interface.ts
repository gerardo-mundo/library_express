import { User } from '@prisma/client';
import { Result } from './api.interface';

export interface IUser extends User {
  role: UserRoles;
}

export type InitialUserCreation = Omit<
  IUser,
  'id' | 'role' | 'last_session' | 'created_at'
>;

export type UserWithoutPassword = Omit<IUser, 'password'>;

export interface UserCredentials {
  email: string;
  password: string;
}

export type UserRoles =
  | 'USER'
  | 'ADMIN'
  | 'AUXILIARY'
  | 'STUDENT'
  | 'PROFESSOR';

export interface IUserRepository {
  FindAll(): Promise<UserWithoutPassword[]>;
  FindById(id: string): Promise<IUser | null>;
  Create(userData: Omit<IUser, 'id'>): Promise<UserWithoutPassword>;
  UpdateRole(id: string, role: UserRoles): Promise<UserWithoutPassword>;
  Delete(id: string): Promise<void>;
}

export interface IUserService {
  getUsers(): Promise<Result<UserWithoutPassword[]>>;
  createUserAccount(
    userData: InitialUserCreation
  ): Promise<Result<UserWithoutPassword>>;
  login(userCredentials: UserCredentials): Promise<Result<string>>;
  updateUserRole(
    userId: string,
    role: string
  ): Promise<Result<UserWithoutPassword>>;
}
