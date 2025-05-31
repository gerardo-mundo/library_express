import { PrismaClient } from 'prisma/prisma-client';

import {
  BookCreationDTO,
  IBook,
  IBookRepository,
} from '@interfaces/book.interface';
import { errorHandler } from '@utils/handlePrismaKnownRequestError';

export class BooksRepository implements IBookRepository {
  private prisma = new PrismaClient();

  public async Create(book: BookCreationDTO): Promise<IBook> {
    try {
      const bookExist = await this.prisma.book.findUnique({
        where: { adquisition: book.adquisition },
      });

      if (bookExist) throw new Error('El libro ya se encuentra registrado');

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

  public async Update(
    bookId: number,
    data: Partial<BookCreationDTO>
  ): Promise<IBook> {
    try {
      if (!data) throw new Error('Los datos del libro son obligatorios');

      const updatedBook = await this.prisma.book.update({
        where: { id: bookId },
        data,
      });

      return updatedBook;
    } catch (error) {
      return errorHandler(error, 'book.repository');
    }
  }

  public async Delete(bookId: number): Promise<IBook> {
    try {
      if (!bookId) throw new Error('El ID del libro es obligatorio');

      const bookExist = await this.FindById(bookId);

      if (!bookExist) throw new Error('El libro no existe');

      const deletedBook = await this.prisma.book.delete({
        where: { id: bookId },
      });

      return deletedBook;
    } catch (error) {
      return errorHandler(error, 'book.repository');
    }
  }
}
