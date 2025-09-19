/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `Thesis` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Thesis_title_key" ON "Thesis"("title");
