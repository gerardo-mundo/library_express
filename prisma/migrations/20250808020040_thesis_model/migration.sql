-- CreateTable
CREATE TABLE "Thesis" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "author_two" TEXT,
    "author_three" TEXT,
    "publisher" TEXT NOT NULL,
    "thesis_advisor" TEXT NOT NULL,
    "copies" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Thesis_pkey" PRIMARY KEY ("id")
);
