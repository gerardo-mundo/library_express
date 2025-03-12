import { NextFunction, Request, Response } from 'express';
import { check } from 'express-validator';

import { fieldsValidator } from 'middlewares/fieldsValidator';

export const userValidationFields = [
  check('name', 'El nombre del usuario no es correcto')
    .isLength({ max: 120 })
    .not()
    .isEmpty(),
  check('last_name', 'Los apellidos del usuario no son correctos')
    .isLength({ max: 120 })
    .not()
    .isEmpty(),
  check('email', 'El nombre del correo no es válido').isEmail(),
  check('password', 'El password es incorrecto')
    .isLength({ min: 8 })
    .isStrongPassword(),
  (req: Request, res: Response, next: NextFunction) => {
    fieldsValidator(req, res, next);
  },
];
