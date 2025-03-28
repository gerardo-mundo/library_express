import { UserRoles } from '@interfaces/user.interface';
import { USER_ROLES } from './constants';

export const isValidRole = (role: string): role is UserRoles => {
  return role in USER_ROLES;
};
