import { UserRoles } from '@interfaces/user.interface';

export const USER_ROLES: Record<UserRoles, string> = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  AUXILIARY: 'AUXILIARY',
  STUDENT: 'STUDENT',
  PROFESSOR: 'PROFESSOR',
};
