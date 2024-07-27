/*
  Warnings:

  - Added the required column `bankName` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "PaymentStatus" ADD VALUE 'NOT_PAID';

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "bankName" TEXT NOT NULL;
