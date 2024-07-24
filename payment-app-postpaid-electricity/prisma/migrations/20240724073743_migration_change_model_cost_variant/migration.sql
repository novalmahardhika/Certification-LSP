/*
  Warnings:

  - You are about to drop the `Cost_Variant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Cost_Variant";

-- CreateTable
CREATE TABLE "CostVariant" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "power" TEXT NOT NULL,
    "costPerKwh" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CostVariant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CostVariant_code_key" ON "CostVariant"("code");
