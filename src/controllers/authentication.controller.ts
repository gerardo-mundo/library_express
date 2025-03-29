import { Request, Response } from 'express';

import { ApiResponseHandler } from '@api/apiResponseHandler';
import {
  InitialUserCreation,
  UserCredentials,
} from '@interfaces/user.interface';
import { UserService } from '@services/user.service';

export class AuthenticationController {
  private apiResponse = new ApiResponseHandler();

  constructor(private userService: UserService) {}

  public async createUserAccount(req: Request, res: Response) {
    try {
      const userData: InitialUserCreation = req.body;
      const result = await this.userService.createUserAccount(userData);

      if (result.success) {
        this.apiResponse.successResponse(
          res,
          'Usuario creado con éxito',
          result
        );
      } else {
        this.apiResponse.badRequestResponse(res, 'Error al crear el usuario');
      }
    } catch (error) {
      this.apiResponse.internalServerErrorResponse(
        res,
        'error interno del servidor'
      );
    }
  }

  public async loginUser(req: Request, res: Response) {
    try {
      const userCredentials: UserCredentials = req.body;
      const result = await this.userService.login(userCredentials);

      if (result.success) {
        this.apiResponse.successCreationResponse(
          res,
          'Usuario logueado correctamente',
          result.data
        );
      } else {
        this.apiResponse.unauthorizedResponse(res, result.error);
      }
    } catch (error) {
      this.apiResponse.internalServerErrorResponse(
        res,
        `Ocurrió un error inesperado: ${error}`
      );
    }
  }
}
