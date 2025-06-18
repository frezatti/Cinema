/*
  Warnings:

  - You are about to drop the column `dataTime` on the `session` table. All the data in the column will be lost.
  - Added the required column `dateTime` to the `session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "movies" ADD COLUMN     "poster" TEXT;

-- AlterTable
ALTER TABLE "session" DROP COLUMN "dataTime",
ADD COLUMN     "dateTime" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "theater" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
