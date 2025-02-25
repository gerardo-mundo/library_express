export interface User {
  id?: number;
  name: string;
  lastName: string;
  email: string;
  role: UserRoles;
  created_at: Date | null;
  last_session: Date | null;
}

export interface UserCredentials {
  email: string;
  pasword: string;
}

export type UserRoles = 'admin' | 'auxiliary' | 'student' | 'professor';
