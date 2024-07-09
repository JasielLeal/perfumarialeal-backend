/*
  Warnings:

  - You are about to drop the column `productId` on the `SaleProduct` table. All the data in the column will be lost.
  - Added the required column `BankProductId` to the `SaleProduct` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SaleProduct" DROP CONSTRAINT "SaleProduct_productId_fkey";

-- AlterTable
ALTER TABLE "SaleProduct" DROP COLUMN "productId",
ADD COLUMN     "BankProductId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "SaleProduct" ADD CONSTRAINT "SaleProduct_BankProductId_fkey" FOREIGN KEY ("BankProductId") REFERENCES "bankProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
