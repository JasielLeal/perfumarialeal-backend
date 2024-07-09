/*
  Warnings:

  - Added the required column `amount` to the `SaleProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SaleProduct" ADD COLUMN     "amount" TEXT NOT NULL;
