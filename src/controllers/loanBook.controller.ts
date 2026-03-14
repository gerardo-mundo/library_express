import { Request, Response } from 'express';

import { ApiResponseHandler } from '@api/apiResponseHandler';

import { LoanBookService } from '@services/loanBook.service';

export class LoanBookController {
  private apiResponse = new ApiResponseHandler();

  constructor(private loanBookService: LoanBookService) {}

  public async createLoanBook(req: Request, res: Response) {
    try {
      const result = await this.loanBookService.createLoan(req.body);

      if (result.success) {
        this.apiResponse.successCreationResponse(
          res,
          'Préstamo creado correctamente',
          result.data
        );
      } else {
        this.apiResponse.badRequestResponse(res, result.error);
      }
    } catch (error) {
      this.apiResponse.internalServerErrorResponse(
        res,
        'error interno del servidor'
      );
    }
  }
}
