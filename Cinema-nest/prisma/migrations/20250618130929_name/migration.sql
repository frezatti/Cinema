/*
  Warnings:

  - Added the required column `quantity` to the `ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ticket" ADD COLUMN     "quantity" INTEGER NOT NULL;
