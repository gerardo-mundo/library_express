import { Book } from 'prisma/prisma-client';

import { Result } from './api.interface';

export interface IBook extends Book {}

export type UpdatableDataBook = Omit<IBook, 'id' | 'created_at'>;

export type BookCreationDTO = Omit<IBook, 'id' | 'created_at'>;

export interface IBookRepository {
  Create(book: any): Promise<IBook>;
  FindById(bookId: number): Promise<IBook | null>;
  FindAll(): Promise<IBook[]>;
  Update(book: UpdatableDataBook): Promise<IBook>;
  Delete(bookId: number): Promise<IBook>;
}

export interface IBookService {
  createBook(book: BookCreationDTO): Promise<Result<IBook>>;
}
