/*
  Warnings:

  - Changed the type of `dni` on the `Employee` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "dni",
ADD COLUMN     "dni" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Employee_dni_key" ON "Employee"("dni");
