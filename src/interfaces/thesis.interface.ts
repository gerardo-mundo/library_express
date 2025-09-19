import { Thesis } from 'prisma/prisma-client';

import { Result } from './api.interface';

export interface IThesis extends Thesis {}

export type ThesisCreationDTO = Omit<IThesis, 'id' | 'created_at'>;

export interface IThesisRepository {
  Create(Thesis: any): Promise<IThesis>;
  FindById(ThesisId: number): Promise<IThesis | null>;
  FindAll(): Promise<IThesis[]>;
  Update(ThesisId: number, Thesis: ThesisCreationDTO): Promise<IThesis>;
  Delete(ThesisId: number): Promise<IThesis>;
}

export interface IThesisService {
  createThesis(Thesis: ThesisCreationDTO): Promise<Result<IThesis>>;
  updateThesisFields(Thesis: ThesisCreationDTO): Promise<Result<IThesis>>;
  deleteThesisbyId(ThesisId: number): Promise<Result<IThesis>>;
  getAllThesiss(): Promise<Result<IThesis[]>>;
}
