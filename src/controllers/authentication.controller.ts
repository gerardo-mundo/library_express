import { Request, Response } from 'express';

import { ApiResponseHandler } from '@api/apiResponseHandler';
import { InitialUserCreation } from '@interfaces/user.interface';
import { UserService } from '@services/user.service';

export class UserController {
  private apiResponse = new ApiResponseHandler();

  constructor(private userService: UserService) {}

  public async createUserAccount(req: Request, res: Response) {
    try {
      const userData: InitialUserCreation = req.body;
      const newUser = await this.userService.createUserAccount(userData);

      this.apiResponse.successResponse(
        res,
        'Usuario creado con éxito',
        newUser
      );
    } catch (error) {
      if (error instanceof Error) {
        this.apiResponse.badRequestResponse(res, `${error.message}`);
      } else {
        this.apiResponse.internalServerErrorResponse(
          res,
          `Error interno del servidor: ${error}`
        );
      }
    }
  }
}
