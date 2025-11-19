import { Result } from '@interfaces/api.interface';
import {
  IPublication,
  IPublicationService,
  PublicationCreationDTO,
} from '@interfaces/publication.interface';
import { PublicationRepository } from '@repositories/publication.respository';

import { generateResult } from '@utils/generateResult';

export class PublicationService implements IPublicationService {
  private publicationRepository: PublicationRepository;

  constructor() {
    this.publicationRepository = new PublicationRepository();
  }

  public async createPublication(
    publication: PublicationCreationDTO
  ): Promise<Result<IPublication>> {
    try {
      if (!publication) throw new Error('Los datos del libro son obligatorios');

      const newPublication = await this.publicationRepository.Create(
        publication
      );

      return generateResult(true, null, newPublication);
    } catch (error) {
      return generateResult(false, `${error}`);
    }
  }

  public async getAllPublications(): Promise<Result<IPublication[]>> {
    try {
      const publications = await this.publicationRepository.FindAll();
      return generateResult(true, null, publications);
    } catch (error) {
      return generateResult(false, `${error}`);
    }
  }

  public async updatePublicationFields(
    publication: Omit<IPublication, 'created_at'>
  ): Promise<Result<IPublication>> {
    try {
      if (publication.id == null)
        return generateResult(false, 'El ID es obligatorio');

      const data = this.cleanInvalidValues(publication);

      const updatedPublication = await this.publicationRepository.Update(
        publication.id,
        data
      );

      return generateResult(true, null, updatedPublication);
    } catch (error) {
      return generateResult(false, `${error}`);
    }
  }

  public async deletePublicationbyId(
    publicationId: number
  ): Promise<Result<IPublication>> {
    try {
      if (!this.isOnlyNumber(publicationId))
        return generateResult(false, 'El ID del libro debe ser de tipo INT');

      const deletedThesis = await this.publicationRepository.Delete(
        publicationId
      );

      return generateResult(true, null, deletedThesis);
    } catch (error) {
      return generateResult(false, 'error interno del servidor');
    }
  }

  private cleanInvalidValues(
    obj: PublicationCreationDTO
  ): Partial<PublicationCreationDTO> {
    const newObj: Partial<PublicationCreationDTO> = {};

    for (const [key, value] of Object.entries(obj) as [
      keyof PublicationCreationDTO,
      any
    ][]) {
      if (value != null) {
        newObj[key] = value;
      }
    }

    return newObj;
  }

  private isOnlyNumber(value: number | string | undefined): boolean {
    return typeof value === 'number' && !isNaN(value);
  }
}
