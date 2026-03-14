import { NextFunction, Request, Response } from 'express';
import { check } from 'express-validator';

import { fieldsValidator } from 'middlewares/fieldsValidator';

export const bookLoanValidationFields = [
  check(
    'loan_items.*.book_id',
    'El libro o libros no se encuentra(n) registrado(s) en el sistema'
  )
    .exists()
    .isArray({ max: 3, min: 1 }),
  check(
    'loan_items',
    'Solo puedes prestar un máximo de 3 y un mínimo de 1 libro'
  )
    .exists()
    .isArray({ max: 3, min: 1 }),

  (req: Request, res: Response, next: NextFunction) => {
    fieldsValidator(req, res, next);
  },
];
