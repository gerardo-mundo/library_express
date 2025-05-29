import { Result } from '@interfaces/api.interface';
import {
  BookCreationDTO,
  IBook,
  IBookService,
} from '@interfaces/book.interface';
import { BooksRepository } from '@repositories/book.repository';
import { generateResult } from '@utils/generateResult';

export class BookService implements IBookService {
  private bookRepository;

  constructor() {
    this.bookRepository = new BooksRepository();
  }

  public async createBook(book: BookCreationDTO): Promise<Result<IBook>> {
    try {
      if (!book) throw new Error('Los datos del libro son obligatorios');

      const newBook = await this.bookRepository.Create(book);

      return generateResult(true, null, newBook);
    } catch (error) {
      return generateResult(false, `${error}`);
    }
  }

  public async getAllBooks(): Promise<Result<IBook[]>> {
    try {
      const books = await this.bookRepository.FindAll();
      return generateResult(true, null, books);
    } catch (error) {
      return generateResult(false, `${error}`);
    }
  }

  public async updateBookFields(
    book: Omit<IBook, 'created_at'>
  ): Promise<Result<IBook>> {
    try {
      console.log('Book ID:', book.id);

      if (book.id == null) return generateResult(false, 'El ID es obligatorio');

      const data = this.cleanInvalidValues(book);

      const updatedBook = await this.bookRepository.Update(book.id, data);

      return generateResult(true, null, updatedBook);
    } catch (error) {
      return generateResult(false, `${error}`);
    }
  }

  public async deleteBookbyId(bookId: number): Promise<Result<IBook>> {
    try {
      if (!this.isOnlyNumber(bookId))
        return generateResult(false, 'El ID del libro debe ser de tipo INT');

      const deletedBook = await this.bookRepository.Delete(bookId);

      return generateResult(true, null, deletedBook);
    } catch (error) {
      return generateResult(false, 'error interno del servidor');
    }
  }

  private cleanInvalidValues(obj: BookCreationDTO): Partial<BookCreationDTO> {
    const newObj: Partial<BookCreationDTO> = {};

    for (const [key, value] of Object.entries(obj) as [
      keyof BookCreationDTO,
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
