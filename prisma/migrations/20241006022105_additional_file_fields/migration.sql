/*
  Warnings:

  - You are about to drop the column `fileName` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `fileSize` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `fileType` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `s3Bucket` on the `File` table. All the data in the column will be lost.
  - You are about to drop the column `s3Key` on the `File` table. All the data in the column will be lost.
  - Added the required column `date` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "File_s3Key_key";

-- AlterTable
ALTER TABLE "File" DROP COLUMN "fileName",
DROP COLUMN "fileSize",
DROP COLUMN "fileType",
DROP COLUMN "s3Bucket",
DROP COLUMN "s3Key",
ADD COLUMN     "bodyPart" TEXT[],
ADD COLUMN     "category" TEXT,
ADD COLUMN     "chronic" BOOLEAN,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "disease" TEXT,
ADD COLUMN     "medication" TEXT[],
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;
