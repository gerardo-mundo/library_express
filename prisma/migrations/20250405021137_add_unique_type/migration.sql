/*
  Warnings:

  - A unique constraint covering the columns `[adquisition]` on the table `Book` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Book_adquisition_key" ON "Book"("adquisition");
