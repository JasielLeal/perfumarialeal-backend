/*
  Warnings:

  - You are about to drop the column `isOwner` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[resetPasswordToken]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `secondName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "isOwner",
ADD COLUMN     "resetPasswordToken" TEXT,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'Member',
ADD COLUMN     "secondName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_resetPasswordToken_key" ON "User"("resetPasswordToken");
