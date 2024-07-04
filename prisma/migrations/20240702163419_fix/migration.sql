/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `bankProduct` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "bankProduct_code_key" ON "bankProduct"("code");
