import { PrismaClient } from 'prisma/prisma-client';

import { errorHandler } from '@utils/handlePrismaKnownRequestError';
import {
  IThesis,
  IThesisRepository,
  ThesisCreationDTO,
} from '@interfaces/thesis.interface';

export class ThesisRepository implements IThesisRepository {
  private prisma = new PrismaClient();

  public async Create(thesis: ThesisCreationDTO): Promise<IThesis> {
    try {
      const thesisExist = await this.prisma.thesis.findUnique({
        where: { title: thesis.title },
      });

      if (thesisExist) throw new Error('La tesis ya se encuentra registrada');

      const newThesis = await this.prisma.thesis.create({ data: thesis });
      return newThesis;
    } catch (error) {
      return errorHandler(error, 'thesis.repository');
    }
  }

  public async FindById(thesisId: number): Promise<IThesis | null> {
    try {
      const thesis = await this.prisma.thesis.findUnique({
        where: { id: thesisId },
      });
      return thesis;
    } catch (error) {
      return errorHandler(error, 'thesis.repository');
    }
  }

  public async FindAll(): Promise<IThesis[]> {
    try {
      const allthesiss = await this.prisma.thesis.findMany();
      return allthesiss;
    } catch (error) {
      return errorHandler(error, 'thesis.repository');
    }
  }

  public async Update(
    thesisId: number,
    data: Partial<ThesisCreationDTO>
  ): Promise<IThesis> {
    try {
      if (!data) throw new Error('Los datos de la tesis son obligatorios');

      const updatedThesis = await this.prisma.thesis.update({
        where: { id: thesisId },
        data,
      });

      return updatedThesis;
    } catch (error) {
      return errorHandler(error, 'thesis.repository');
    }
  }

  public async Delete(thesisId: number): Promise<IThesis> {
    try {
      if (!thesisId) throw new Error('El ID de la tesis es obligatorio');

      const thesisExist = await this.FindById(thesisId);

      if (!thesisExist) throw new Error('La tesis no existe');

      const deletedThesis = await this.prisma.thesis.delete({
        where: { id: thesisId },
      });

      return deletedThesis;
    } catch (error) {
      return errorHandler(error, 'book.repository');
    }
  }
}
