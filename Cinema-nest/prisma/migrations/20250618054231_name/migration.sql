/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `theater` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `number` to the `theater` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "theater" ADD COLUMN     "number" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "theater_number_key" ON "theater"("number");
