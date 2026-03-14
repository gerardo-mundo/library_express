import { Result } from '@interfaces/api.interface';
import {
  bookLoanCreationDTO,
  BookLoanDTO,
  IBookLoanService,
} from '@interfaces/bookLoan.interface';
import { LoansRepository } from '@repositories/loans.repository';
import { generateResult } from '@utils/generateResult';

export class LoanBookService implements IBookLoanService {
  private loanBookRepository;

  constructor() {
    this.loanBookRepository = new LoansRepository();
  }

  public async createLoan(
    loanData: bookLoanCreationDTO
  ): Promise<Result<BookLoanDTO>> {
    const { borrower_id } = loanData;
    if (!loanData) throw new Error('Los datos del préstamo con obligatorios');

    try {
      const newLoan = await this.loanBookRepository.Create(loanData);

      return generateResult(
        true,
        `Préstamo creado exitosamente para el usuario: ${borrower_id}`,
        newLoan
      );
    } catch (error) {
      return generateResult(false, `${error}`);
    }
  }
}
