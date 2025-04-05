import { Book } from 'prisma/prisma-client';

export interface IBook extends Book {}

export type UpdatableDataBook = Omit<IBook, 'id' | 'created_at'>;

export interface IBookRepository {
  Create(book: any): Promise<IBook>;
  FindById(bookId: number): Promise<IBook | null>;
  FindAll(): Promise<IBook[]>;
  Update(book: UpdatableDataBook): Promise<IBook>;
  Delete(bookId: number): Promise<IBook>;
}
