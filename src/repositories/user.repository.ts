import { PrismaClient } from '@prisma/client';

import {
  InitialUserCreation,
  IUser,
  IUserRepository,
  UserRoles,
  UserWithoutPassword,
} from '@interfaces/user.interface';
import { errorHandler } from '@utils/handlePrismaKnownRequestError';

const prisma = new PrismaClient();
const errorMessage = process.env['EMAIL_TAKEN_ERROR_MESSAGE'];

export class UserRepository implements IUserRepository {
  public async FindAll(): Promise<UserWithoutPassword[]> {
    try {
      return prisma.user.findMany({ omit: { password: true } });
    } catch (error) {
      return errorHandler(error, 'user.repository');
    }
  }

  public async FindById(id: string): Promise<IUser | null> {
    try {
      return await prisma.user.findUnique({ where: { id } });
    } catch (error) {
      return errorHandler(error, 'user.repository');
    }
  }

  public async FindByEmail(email: string): Promise<IUser | null> {
    try {
      return await prisma.user.findUnique({ where: { email } });
    } catch (error) {
      return errorHandler(error, 'user.repository');
    }
  }

  public async UpdateLastSession(id: string): Promise<IUser> {
    try {
      const last_session = new Date().toISOString();

      return await prisma.user.update({
        where: { id },
        data: { last_session },
      });
    } catch (error) {
      return errorHandler(error, 'user.repository');
    }
  }

  public async Create(userData: InitialUserCreation): Promise<IUser> {
    try {
      const userExist = await prisma.user.findUnique({
        where: { email: userData.email },
      });

      if (userExist) throw new Error(errorMessage);

      return await prisma.user.create({
        data: userData,
      });
    } catch (error) {
      return errorHandler(error, 'user.repository');
    }
  }

  public async UpdateRole(userId: string, role: UserRoles): Promise<IUser> {
    try {
      return await prisma.user.update({
        where: { id: userId },
        data: { role },
      });
    } catch (error) {
      return errorHandler(error, 'user.repository || UpdteRole');
    }
  }

  public async Delete(id: string): Promise<void> {
    prisma.user.delete({ where: { id } });
  }
}
