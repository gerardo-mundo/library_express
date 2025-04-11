import { Request, Response, Router } from 'express';

import { BookController } from '@controllers/book.controller';
import { bookFieldsValidation } from '@schemas/book/bookValidationFields.schema';
import { BookService } from '@services/book.service';

const router = Router();
const bookService = new BookService();
const bookController = new BookController(bookService);

router.post(
  '/create-book',
  bookFieldsValidation,
  (req: Request, res: Response) => bookController.createNewBook(req, res)
);

export default router;
