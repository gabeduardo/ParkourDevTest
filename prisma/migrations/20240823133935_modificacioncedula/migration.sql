/*
  Warnings:

  - A unique constraint covering the columns `[cedula]` on the table `Record` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Record_cedula_key" ON "Record"("cedula");
