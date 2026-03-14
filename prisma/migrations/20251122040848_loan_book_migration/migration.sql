-- CreateTable
CREATE TABLE "BookLoan" (
    "id" SERIAL NOT NULL,
    "returned" BOOLEAN NOT NULL DEFAULT false,
    "loan_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "return_date" TIMESTAMP(3),
    "borrower_id" UUID NOT NULL,
    "approver_id" UUID,

    CONSTRAINT "BookLoan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanItem" (
    "id" SERIAL NOT NULL,
    "loan_id" INTEGER NOT NULL,
    "book_id" INTEGER NOT NULL,
    "returned" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LoanItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BookLoan" ADD CONSTRAINT "BookLoan_borrower_id_fkey" FOREIGN KEY ("borrower_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookLoan" ADD CONSTRAINT "BookLoan_approver_id_fkey" FOREIGN KEY ("approver_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanItem" ADD CONSTRAINT "LoanItem_loan_id_fkey" FOREIGN KEY ("loan_id") REFERENCES "BookLoan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanItem" ADD CONSTRAINT "LoanItem_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
