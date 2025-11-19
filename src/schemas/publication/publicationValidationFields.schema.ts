import { NextFunction, Request, Response } from 'express';
import { check } from 'express-validator';
import { PublicationTypes } from 'prisma/prisma-client';

import { fieldsValidator } from 'middlewares/fieldsValidator';

export const publicationFieldsValidation = [
  check('title')
    .notEmpty()
    .withMessage('El título es obligatorio')
    .isLength({ max: 120 })
    .withMessage('El título no puede tener más de 120 caracteres'),

  check('type')
    .notEmpty()
    .withMessage('El título es obligatorio')
    .isIn(Object.values(PublicationTypes))
    .withMessage(
      `El tipo de publicación debe ser del tipo: ${Object.values(
        PublicationTypes
      ).join(', ')}`
    ),

  check('author')
    .notEmpty()
    .withMessage('El nombre del autor es obligatorio')
    .isLength({ max: 120 })
    .withMessage('El nombre del autor no puede tener más de 120 caracteres'),

  check('ISBN').isISBN().withMessage('El ISBN debe ser válido').optional(),

  check('ISSN').isISSN().withMessage('El ISSN debe ser válido').optional(),

  check('copies')
    .notEmpty()
    .withMessage('El número de copias es obligatorio')
    .isNumeric()
    .withMessage('El número de copias debe ser un valor numérico')
    .isLength({ max: 1 })
    .withMessage('No se pueden registrar mas de 9 copias de un mismo ejemplar'),

  (req: Request, res: Response, next: NextFunction) => {
    fieldsValidator(req, res, next);
  },
];
