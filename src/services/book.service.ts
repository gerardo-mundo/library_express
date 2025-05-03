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
}
