import { NextFunction, Request, Response } from 'express';
import { check } from 'express-validator';

import { fieldsValidator } from 'middlewares/fieldsValidator';

export const bookFieldsValidation = [
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

  check('collection')
    .notEmpty()
    .withMessage('El nombre de la colección es obligatorio')
    .isLength({ max: 60 })
    .withMessage('La colección no puede tener más de 60 caracteres'),

  check('adquisition')
    .notEmpty()
    .withMessage('El número de adquisición es obligatorio')
    .isNumeric()
    .withMessage('El número de adquisición debe ser un número válido'),

  check('copies')
    .notEmpty()
    .withMessage('El número de copias es obligatorio')
    .isNumeric()
    .withMessage('El número de copias debe ser un valor numérico')
    .isLength({ max: 1 })
    .withMessage('No se pueden registrar mas de 9 copias de un mismo ejemplar'),

  check('available')
    .notEmpty()
    .withMessage('La disponibilidad del libro es obligatoria')
    .isBoolean()
    .withMessage('El campo solo acepta valores de tipo true o false'),

  (req: Request, res: Response, next: NextFunction) => {
    fieldsValidator(req, res, next);
  },
];
