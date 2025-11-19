import { Publication, PublicationTypes } from 'prisma/prisma-client';

import { Result } from './api.interface';

export interface IPublication extends Publication {}

export type PublicationCreationDTO = Omit<IPublication, 'id' | 'created_at'>;

export interface IPublicationRepository {
  Create(publication: PublicationCreationDTO): Promise<IPublication>;
  FindById(publicationId: number): Promise<IPublication | null>;
  FindAll(): Promise<IPublication[]>;
  Update(
    publicationId: number,
    publication: PublicationCreationDTO
  ): Promise<IPublication>;
  Delete(publicationId: number): Promise<IPublication>;
}

export interface IPublicationService {
  getAllPublications(): Promise<Result<IPublication[]>>;
  createPublication(
    publication: PublicationCreationDTO
  ): Promise<Result<IPublication>>;
  updatePublicationFields(
    publication: Omit<PublicationCreationDTO, 'created_at'>
  ): Promise<Result<IPublication>>;
  deletePublicationbyId(publicationId: number): Promise<Result<IPublication>>;
}
