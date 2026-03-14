import {
  bookLoanCreationDTO,
  BookLoanDTO,
} from '@interfaces/bookLoan.interface';
import { errorHandler } from '@utils/handlePrismaKnownRequestError';
import { PrismaClient } from 'prisma/prisma-client';

export class LoansRepository {
  private prisma = new PrismaClient();

  public async Create(loanData: bookLoanCreationDTO): Promise<BookLoanDTO> {
    if (!loanData) throw new Error('Se necesita la información del préstamo');

    const { approver_id, borrower_id, loan_items } = loanData;
    const bookIds = loan_items.map((item) => item.book_id);

    try {
      const createdLoan = await this.prisma.$transaction(async (tx) => {
        const availableBooksCount = await tx.book.count({
          where: { id: { in: bookIds }, available: true },
        });

        if (availableBooksCount !== bookIds.length)
          throw new Error(
            'Uno o más libros no se encontraron o no están disponibles'
          );

        const bookLoan = await tx.bookLoan.create({
          data: {
            approver_id,
            borrower_id,
            loan_items: {
              create: loan_items.map((item) => ({
                book_id: item.book_id,
              })),
            },
          },
          include: { loan_items: true },
        });

        await tx.book.updateMany({
          where: { id: { in: bookIds } },
          data: { available: false },
        });

        return bookLoan;
      });

      return createdLoan;
    } catch (error) {
      errorHandler(error, 'loans.repository');

      throw Error;
    }
  }
}
