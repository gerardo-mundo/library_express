import { PrismaClient } from 'prisma/prisma-client';

import {
  IBook,
  IBookRepository,
  UpdatableDataBook,
} from '@interfaces/book.interface';
import { errorHandler } from '@utils/handlePrismaKnownRequestError';

export class BooksRepository implements IBookRepository {
  private prisma = new PrismaClient();

  public async Create(book: any): Promise<IBook> {
    try {
      const bookExist = await this.prisma.book.findUnique({
        where: { adquisition: book.adquisition },
      });

      if (bookExist) throw new Error('el libro ya se encuentra registrado');

      const newBook = await this.prisma.book.create({ data: book });
      return newBook;
    } catch (error) {
      return errorHandler(error, 'book.repository');
    }
  }

  public async FindById(bookId: number): Promise<IBook | null> {
    try {
      const book = await this.prisma.book.findUnique({ where: { id: bookId } });
      return book;
    } catch (error) {
      return errorHandler(error, 'book.repository');
    }
  }

  public async FindAll(): Promise<IBook[]> {
    try {
      const allBooks = await this.prisma.book.findMany();
      return allBooks;
    } catch (error) {
      return errorHandler(error, 'book.repository');
    }
  }

  public async Update(book: UpdatableDataBook): Promise<IBook> {
    try {
      const updatedBook = await this.prisma.book.create({ data: book });
      return updatedBook;
    } catch (error) {
      return errorHandler(error, 'book.repository');
    }
  }

  public async Delete(bookId: number): Promise<IBook> {
    try {
      const deletedBook = await this.prisma.book.delete({
        where: { id: bookId },
      });
      return deletedBook;
    } catch (error) {
      return errorHandler(error, 'book.repository');
    }
  }
}
