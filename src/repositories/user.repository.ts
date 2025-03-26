import { PrismaClient } from '@prisma/client';

import {
  InitialUserCreation,
  IUser,
  IUserRepository,
} from '@interfaces/user.interface';
import { handlePrismaError } from 'utils/handlePrismaKnownRequestError';
import { WinstonLoggerAdapter } from 'logs/logger';

const prisma = new PrismaClient();
const logger = new WinstonLoggerAdapter('user.repository');
const errorMessage = process.env['EMAIL_TAKEN_ERROR_MESSAGE'];

export class UserRepository implements IUserRepository {
  public async FindAll(): Promise<IUser[]> {
    return prisma.user.findMany();
  }

  public async FindById(id: string): Promise<IUser | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  public async FindByEmail(email: string): Promise<IUser | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  public async UpdateLastSession(id: string): Promise<IUser> {
    try {
      const last_session = new Date().toISOString();

      return await prisma.user.update({
        where: { id },
        data: { last_session },
      });
    } catch (error) {
      logger.writeError(`${error}`);
      const { message, statusCode } = handlePrismaError(error);
      throw new Error(`(Código de estado: ${statusCode}) ||| ${message} `);
    }
  }

  public async Create(userData: InitialUserCreation): Promise<IUser> {
    const userExist = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (userExist) throw new Error(errorMessage);

    return prisma.user.create({
      data: userData,
    });
  }

  public async Update(id: string, userData: Omit<IUser, 'id'>): Promise<IUser> {
    return prisma.user.update({ where: { id }, data: userData });
  }

  public async Delete(id: string): Promise<void> {
    prisma.user.delete({ where: { id } });
  }
}
