-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAd" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isOwner" BOOLEAN NOT NULL DEFAULT false;
