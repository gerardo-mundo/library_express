import { NextFunction, Request, Response } from 'express';
import { check } from 'express-validator';

import { fieldsValidator } from 'middlewares/fieldsValidator';

export const thesisFieldsValidation = [
  check('title')
    .notEmpty()
    .withMessage('El título es obligatorio')
    .isLength({ max: 120 })
    .withMessage('El título no puede tener más de 120 caracteres'),

  check('author')
    .notEmpty()
    .withMessage('El nombre del autor es obligatorio')
    .isLength({ max: 120 })
    .withMessage('El nombre del autor no puede tener más de 120 caracteres'),

  check('publisher')
    .notEmpty()
    .withMessage('La editorial es obligatoria')
    .isLength({ max: 80 })
    .withMessage('La editorial no puede tener más de 80 caracteres'),

  check('copies')
    .notEmpty()
    .withMessage('El número de copias es obligatorio')
    .isNumeric()
    .withMessage('El número de copias debe ser un valor numérico')
    .isLength({ max: 1 })
    .withMessage('No se pueden registrar mas de 9 copias de un mismo ejemplar'),

  check('thesis_advisor')
    .notEmpty()
    .withMessage('Este campo es obligatorio')
    .isLength({ max: 120 })
    .withMessage('Este campo no puede tener más de 120 caracteres'),

  (req: Request, res: Response, next: NextFunction) => {
    fieldsValidator(req, res, next);
  },
];
