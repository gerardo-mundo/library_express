import { Request, Response } from 'express';

import { ApiResponseHandler } from '@api/apiResponseHandler';
import { IUser } from '@interfaces/user.interface';
import { UserService } from '@services/user.service';

export class UserController {
  private apiResponseHandler = new ApiResponseHandler();

  constructor(private userService: UserService) {}

  public async getAllUsers(req: Request, res: Response) {
    try {
      const result = await this.userService.getUsers();

      if (result.success) {
        this.apiResponseHandler.successResponse(
          res,
          'usuarios obtenidos',
          result.data
        );
      } else {
        this.apiResponseHandler.badRequestResponse(
          res,
          'error en la consulta',
          null
        );
      }
    } catch (error) {
      this.apiResponseHandler.internalServerErrorResponse(
        res,
        'Error interno del servidor'
      );
    }
  }

  public async updateUserRole(req: Request, res: Response) {
    try {
      const userData: Pick<IUser, 'id' | 'role'> = req.body;

      const result = await this.userService.updateUserRole(
        userData.id,
        userData.role
      );

      if (result.success) {
        this.apiResponseHandler.successResponse(
          res,
          `El rol de usuario ha sido actualizado a: ${userData.role}`,
          result.data
        );
      } else {
        this.apiResponseHandler.badRequestResponse(
          res,
          `Uno o más datos no son correctos. ${result.error}`
        );
      }
    } catch (error) {
      this.apiResponseHandler.internalServerErrorResponse(res, `${error}`);
    }
  }
}
