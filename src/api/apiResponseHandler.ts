import { Response } from 'express';

import { IApiResponse } from '@interfaces/api.interface';

export class ApiResponseHandler {
  /**
   * Envía una respuesta exitosa con un código de estado personalizado.
   * @param res Objeto Response de Express.
   * @param status Código de estado HTTP (por ejemplo, 200, 201).
   * @param message Mensaje descriptivo.
   * @param data Datos opcionales para incluir en la respuesta.
   */
  private sendSuccessResponse<T>(
    res: Response,
    status: number,
    message: string,
    data: T
  ) {
    const response: IApiResponse<T> = {
      ok: true,
      message,
      data,
    };
    return res.status(status).json(response);
  }

  /**
   * Envía una respuesta de error con un código de estado personalizado.
   * @param res Objeto Response de Express.
   * @param status Código de estado HTTP (por ejemplo, 400, 500).
   * @param message Mensaje descriptivo del error.
   */
  private sendErrorResponse(
    res: Response,
    status: number,
    message: string,
    data?: any
  ) {
    const response: IApiResponse<null> = {
      ok: false,
      message,
      data,
    };
    return res.status(status).json(response);
  }

  // Métodos específicos para respuestas comunes
  public successResponse<T>(res: Response, message: string, data?: T) {
    return this.sendSuccessResponse(res, 200, message, data);
  }

  public successCreationResponse<T>(res: Response, message: string, data?: T) {
    return this.sendSuccessResponse(res, 201, message, data);
  }

  public badRequestResponse(res: Response, message: string, data?: any) {
    return this.sendErrorResponse(res, 400, message, data);
  }

  public unauthorizedResponse(res: Response, message: string) {
    return this.sendErrorResponse(res, 401, message);
  }

  public forbiddenResponse(res: Response, message: string) {
    return this.sendErrorResponse(res, 403, message);
  }

  public notFoundResponse(res: Response, message: string) {
    return this.sendErrorResponse(res, 404, message);
  }

  public internalServerErrorResponse(res: Response, message: string) {
    return this.sendErrorResponse(res, 500, message);
  }
}
