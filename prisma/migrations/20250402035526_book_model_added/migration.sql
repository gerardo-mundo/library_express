-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "author_two" TEXT,
    "author_three" TEXT,
    "publisher" TEXT NOT NULL,
    "collection" INTEGER NOT NULL,
    "copies" BYTEA NOT NULL,
    "available" BOOLEAN,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);
