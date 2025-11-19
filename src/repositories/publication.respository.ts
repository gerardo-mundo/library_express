import {
  IPublication,
  PublicationCreationDTO,
} from '@interfaces/publication.interface';
import { errorHandler } from '@utils/handlePrismaKnownRequestError';
import { PrismaClient } from 'prisma/prisma-client';

export class PublicationRepository implements PublicationRepository {
  private prisma = new PrismaClient();

  public async Create(
    publication: PublicationCreationDTO
  ): Promise<IPublication> {
    if (publication === null) throw new Error('Publication ivalid');
    try {
      const publicationExists = await this.prisma.publication.findUnique({
        where: { title: publication.title },
      });

      if (publicationExists) throw new Error('Publication already exists');
      const newPublication = await this.prisma.publication.create({
        data: publication,
      });

      return newPublication;
    } catch (error) {
      return errorHandler(error, 'book.repository');
    }
  }

  public async FindById(publicationId: number): Promise<IPublication | null> {
    if (publicationId === null) throw new Error('Publication ivalid');
    try {
      const publication = await this.prisma.publication.findUnique({
        where: { id: publicationId },
      });

      return publication;
    } catch (error) {
      return errorHandler(error, 'book.repository');
    }
  }

  public async FindAll(): Promise<IPublication[]> {
    try {
      const publicationsList = await this.prisma.publication.findMany();

      return publicationsList;
    } catch (error) {
      return errorHandler(error, 'book.repository');
    }
  }
  public async Update(
    publicationId: number,
    publication: Partial<PublicationCreationDTO>
  ): Promise<IPublication> {
    if (publication === null) throw new Error('Publication ivalid');

    try {
      const updatedPublication = await this.prisma.publication.update({
        where: { id: publicationId },
        data: publication,
      });

      return updatedPublication;
    } catch (error) {
      return errorHandler(error, 'book.repository');
    }
  }

  public async Delete(publicationId: number): Promise<IPublication> {
    if (!publicationId) throw new Error('El ID de la publicacion es necesario');

    try {
      const publicationExists = await this.prisma.publication.findUnique({
        where: { id: publicationId },
      });

      if (!publicationExists) throw new Error('Publication does not exists');

      const deletedPublication = await this.prisma.publication.delete({
        where: { id: publicationId },
      });

      return deletedPublication;
    } catch (error) {
      return errorHandler(error, 'book.repository');
    }
  }
}
