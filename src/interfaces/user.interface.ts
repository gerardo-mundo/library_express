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

export enum UserRoles {
  Admin = 'admin',
  Auxiliary = 'auxiliary',
  Student = 'student',
  Professor = 'professor',
}
