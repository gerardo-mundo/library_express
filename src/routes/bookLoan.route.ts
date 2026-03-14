import { Request, Response, Router } from 'express';

import { LoanBookService } from '@services/loanBook.service';
import { LoanBookController } from '@controllers/loanBook.controller';
import { bookLoanValidationFields } from '@schemas/loans/bookLoan.schema';

const router = Router();
const loanBookService = new LoanBookService();
const loanBookController = new LoanBookController(loanBookService);

router.post(
  '/register-loan',
  bookLoanValidationFields,
  (req: Request, res: Response) => loanBookController.createLoanBook(req, res)
);

export default router;
