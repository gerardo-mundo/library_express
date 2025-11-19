import { ApiResponseHandler } from '@api/apiResponseHandler';
import { PublicationService } from '@services/publication.service';

import { Request, Response } from 'express';

export class PublicationController {
  private apiResponseHandler = new ApiResponseHandler();

  constructor(private publicationService: PublicationService) {}

  public async getAllPublications(_: Request, res: Response) {
    try {
      const result = await this.publicationService.getAllPublications();

      if (result.success) {
        this.apiResponseHandler.successResponse(
          res,
          'Publicaciones obtenidas existosamente',
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

  public async updatePublication(req: Request, res: Response) {
    try {
      const publication = req.body;

      const result = await this.publicationService.updatePublicationFields(
        publication
      );

      if (result.success) {
        this.apiResponseHandler.successResponse(
          res,
          'Publicación actualizada',
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

  public async createNewPublication(req: Request, res: Response) {
    try {
      const publication = req.body;

      const result = await this.publicationService.createPublication(
        publication
      );

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

  public async deletePublication(req: Request, res: Response) {
    try {
      const { id } = req.body;

      const result = await this.publicationService.deletePublicationbyId(id);

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
