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

router.get('/all-books', (req: Request, res: Response) =>
  bookController.getAllBooks(req, res)
);

router.put('/update-book', (req: Request, res: Response) =>
  bookController.updateBook(req, res)
);

export default router;
