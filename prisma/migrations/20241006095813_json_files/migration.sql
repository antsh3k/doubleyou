/*
  Warnings:

  - You are about to drop the column `bodyPart` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `chronic` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `disease` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `medication` on the `File` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "File" DROP COLUMN "bodyPart",
DROP COLUMN "category",
DROP COLUMN "chronic",
DROP COLUMN "date",
DROP COLUMN "disease",
DROP COLUMN "medication",
ADD COLUMN     "summary" JSONB;
