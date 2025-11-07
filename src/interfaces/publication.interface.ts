import { Publication, PublicationTypes } from 'prisma/prisma-client';

import { Result } from './api.interface';

export interface IPublication extends Publication {}

export type IPublicationCreationDTO = Omit<IPublication, 'id' | 'created_at'>;

export interface IPublicationRepository {
  Create(publication: IPublicationCreationDTO): Promise<IPublication>;
  FindById(publicationId: number): Promise<IPublication | null>;
  FindAll(): Promise<IPublication[]>;
  Update(
    publicationId: number,
    publication: IPublicationCreationDTO
  ): Promise<IPublication>;
  Delete(publicationId: number): Promise<IPublication>;
}

export interface IPublicationService {
  getAllPublications(): Result<IPublication[]>;
  createPublication(
    publication: IPublicationCreationDTO
  ): Promise<Result<IPublication>>;
  updatePublicationFields(
    publication: IPublicationCreationDTO
  ): Promise<Result<IPublication>>;
  deletePublicationbyId(publicationId: number): Promise<Result<IPublication>>;
}
