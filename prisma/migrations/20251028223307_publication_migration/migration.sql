-- CreateEnum
CREATE TYPE "PublicationTypes" AS ENUM ('ARTICLE', 'MAGAZINE', 'NEWSPAPER');

-- CreateTable
CREATE TABLE "Publication" (
    "id" SERIAL NOT NULL,
    "type" "PublicationTypes" NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "author_two" TEXT,
    "author_three" TEXT,
    "copies" INTEGER NOT NULL,
    "ISBN" TEXT,
    "ISSN" TEXT,
    "available" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Publication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Publication_title_key" ON "Publication"("title");
