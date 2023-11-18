/*
  Warnings:

  - You are about to drop the column `idEmpleado` on the `SalaryChange` table. All the data in the column will be lost.
  - Added the required column `id_employee` to the `SalaryChange` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SalaryChange" DROP CONSTRAINT "SalaryChange_idEmpleado_fkey";

-- AlterTable
ALTER TABLE "SalaryChange" DROP COLUMN "idEmpleado",
ADD COLUMN     "id_employee" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "SalaryChange" ADD CONSTRAINT "SalaryChange_id_employee_fkey" FOREIGN KEY ("id_employee") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
