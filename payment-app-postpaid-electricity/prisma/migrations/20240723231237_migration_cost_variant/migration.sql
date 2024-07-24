/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Cost_Variant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Cost_Variant_name_key" ON "Cost_Variant"("name");
