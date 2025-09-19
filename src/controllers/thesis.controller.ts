import { ApiResponseHandler } from '@api/apiResponseHandler';
import { ThesisService } from '@services/thesis.service';
import { request, Request, Response } from 'express';

export class ThesisController {
  private apiResponseHandler = new ApiResponseHandler();

  constructor(private thesisService: ThesisService) {}

  public async getAllThesis(_: Request, res: Response) {
    try {
      const result = await this.thesisService.getAllThesiss();

      if (result.success) {
        this.apiResponseHandler.successResponse(
          res,
          'Libros obtenido existosamente',
          result.data
        );
      } else {
        this.apiResponseHandler.notFoundResponse(res, result.error);
      }
    } catch (error) {
      this.apiResponseHandler.internalServerErrorResponse(
        res,
        'Error interno del servidor'
      );
    }
  }

  public async updateThesis(req: Request, res: Response) {
    try {
      const thesis = req.body;

      const result = await this.thesisService.updateThesisFields(thesis);

      if (result.success) {
        this.apiResponseHandler.successResponse(
          res,
          'Libro actualizado',
          result.data
        );
      } else {
        this.apiResponseHandler.notFoundResponse(res, result.error);
      }
    } catch (error) {
      this.apiResponseHandler.internalServerErrorResponse(
        res,
        'Error interno del servidor'
      );
    }
  }

  public async createNewThesis(req: Request, res: Response) {
    try {
      const thesis = req.body;

      const result = await this.thesisService.createThesis(thesis);

      if (result.success) {
        this.apiResponseHandler.successCreationResponse(
          res,
          'Recurso creado correctamente',
          result.data
        );
      } else {
        this.apiResponseHandler.badRequestResponse(res, result.error);
      }
    } catch (error) {
      this.apiResponseHandler.internalServerErrorResponse(
        res,
        `Error: ${error}`
      );
    }
  }

  public async deleteThesis(req: Request, res: Response) {
    try {
      const { id } = req.body;

      const result = await this.thesisService.deleteThesisbyId(id);

      if (result.success) {
        this.apiResponseHandler.successResponse(
          res,
          'Elemento eliminado correctamente',
          result.data
        );
      } else {
        this.apiResponseHandler.badRequestResponse(res, result.error);
      }
    } catch (error) {
      this.apiResponseHandler.internalServerErrorResponse(
        res,
        `Error: ${error}`
      );
    }
  }
}
