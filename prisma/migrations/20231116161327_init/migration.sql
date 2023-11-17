/*
  Warnings:

  - You are about to drop the `JobTitle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_id_cargo_fkey";

-- DropForeignKey
ALTER TABLE "JobTitle" DROP CONSTRAINT "JobTitle_id_department_fkey";

-- DropTable
DROP TABLE "JobTitle";
