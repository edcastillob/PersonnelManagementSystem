/*
  Warnings:

  - Made the column `dni` on table `Employee` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "dni" SET NOT NULL;
