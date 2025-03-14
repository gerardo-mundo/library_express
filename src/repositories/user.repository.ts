import { PrismaClient } from '@prisma/client';

import {
  InitialUserCreation,
  IUser,
  IUserRepository,
} from '@interfaces/user.interface';

const prisma = new PrismaClient();
const errorMessage = process.env['EMAIL_TAKEN_ERROR_MESSAGE'];

export class UserRepository implements IUserRepository {
  public async FindAll(): Promise<IUser[]> {
    return prisma.user.findMany();
  }

  public async FindById(id: string): Promise<IUser | null> {
    return prisma.user.findUnique({ where: { id } });
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
