/*
  Warnings:

  - A unique constraint covering the columns `[customerId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Address_customerId_key" ON "Address"("customerId");
