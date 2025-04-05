/*
  Warnings:

  - Changed the type of `copies` on the `Book` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `available` on table `Book` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "copies",
ADD COLUMN     "copies" INTEGER NOT NULL,
ALTER COLUMN "available" SET NOT NULL;
