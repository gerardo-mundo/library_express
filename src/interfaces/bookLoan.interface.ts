import { BookLoan, LoanItem } from 'prisma/prisma-client';
import { Result } from './api.interface';
// in BookLoan {
//   id          Int        @id @default(autoincrement())
//   returned    Boolean    @default(false)
//   loan_date   DateTime   @default(now())
//   return_date DateTime?
//   //FK's
//   loan_items  LoanItem[]
//   book        Book?      @relation(fields: [bookId], references: [id])
//   bookId      Int?
//   borrower    User       @relation("BorrowerRelation", fields: [borrower_id], references: [id])
//   borrower_id String
//   approver    User      @relation("ApproverRelation", fields: [approver_id], references: [id])
//   approver_id String
// }

// model LoanItem {
//   id         Int      @id @default(autoincrement())
//   loan       BookLoan @relation(fields: [loan_id], references: [id])
//   loan_id    Int
//   book       Book     @relation(fields: [book_id], references: [id])
//   book_id    Int
//   returned   Boolean  @default(false)
//   created_at DateTime @default(now())
// }
export interface IBookLoan extends BookLoan {
  loan_items: loanItemCreationDTO[];
}
export type loanItemCreationDTO = Pick<LoanItem, 'book_id'>;

export type bookLoanCreationDTO = Omit<
  IBookLoan,
  'id' | 'loan_date' | 'returned' | 'return_date'
>;

export type BookLoanDTO = IBookLoan;

export interface IBookLoanService {
  createLoan(loanData: bookLoanCreationDTO): Promise<Result<BookLoanDTO>>;
}
