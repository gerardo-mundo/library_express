import { IUser, IUserRepository } from '@interfaces/user.interface';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserRepository implements IUserRepository {
  public async FindAll(): Promise<IUser[]> {
    return prisma.user.findMany();
  }

  public async FindById(id: string): Promise<IUser | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  public async Create(userData: Omit<IUser, 'id'>): Promise<IUser> {
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
