import { ApiResponseHandler } from '@api/apiResponseHandler';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const fieldsValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  const apiResponseHandler = new ApiResponseHandler();

  if (!errors.isEmpty()) {
    return apiResponseHandler.badRequestResponse(
      res,
      'Error al crear el registro',
      errors.mapped()
    );
  }

  next();
};
