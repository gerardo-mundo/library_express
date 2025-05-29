import { Request, Response } from 'express';

import { ApiResponseHandler } from '@api/apiResponseHandler';
import { BookService } from '@services/book.service';
import { error } from 'console';
import { cleanErrorMessage } from '@utils/stringsHandlers';

export class BookController {
  private apiResponseHandler = new ApiResponseHandler();

  constructor(private bookService: BookService) {}

  public async createNewBook(req: Request, res: Response) {
    try {
      const result = await this.bookService.createBook(req.body);

      if (result.success) {
        this.apiResponseHandler.successCreationResponse(
          res,
          'Libro creado exitosamente',
          result.data
        );
      } else {
        const message = cleanErrorMessage(result.error);

        this.apiResponseHandler.badRequestResponse(res, message);
      }
    } catch (error) {
      this.apiResponseHandler.internalServerErrorResponse(res, `error`);
    }
  }

  public async getAllBooks(req: Request, res: Response) {
    try {
      const result = await this.bookService.getAllBooks();

      if (result.success) {
        this.apiResponseHandler.successResponse(
          res,
          'Libros encontrados',
          result.data
        );
      } else {
        this.apiResponseHandler.badRequestResponse(
          res,
          'Error al cosultar las obras'
        );
      }
    } catch (error) {
      this.apiResponseHandler.internalServerErrorResponse(
        res,
        'error interno del servidor'
      );
    }
  }

  public async updateBook(req: Request, res: Response) {
    try {
      const result = await this.bookService.updateBookFields(req.body);

      if (result.success) {
        this.apiResponseHandler.successResponse(
          res,
          'Libro actualizado',
          result.data
        );
      } else {
        this.apiResponseHandler.badRequestResponse(res, result.error);
      }
    } catch (error) {
      this.apiResponseHandler.internalServerErrorResponse(
        res,
        'error interno del servidor'
      );
    }
  }

  public async deleteBook(req: Request, res: Response) {
    try {
      const { id } = req.body;
      const result = await this.bookService.deleteBookbyId(id);

      if (result.success) {
        this.apiResponseHandler.successResponse(
          res,
          `El libro con ID: ${result.data.id} fue eliminado exitosamente`
        );
      } else {
        this.apiResponseHandler.badRequestResponse(res, result.error);
      }
    } catch (error) {
      this.apiResponseHandler.internalServerErrorResponse(
        res,
        'error interno del servidor'
      );
    }
  }
}
