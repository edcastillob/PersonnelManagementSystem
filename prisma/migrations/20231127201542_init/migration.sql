/*
  Warnings:

  - You are about to drop the column `benefit` on the `Employee` table. All the data in the column will be lost.
  - Added the required column `id_benefit` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "benefit",
ADD COLUMN     "id_benefit" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Benefit" (
    "id_benefit" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Benefit_pkey" PRIMARY KEY ("id_benefit")
);

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_id_benefit_fkey" FOREIGN KEY ("id_benefit") REFERENCES "Benefit"("id_benefit") ON DELETE RESTRICT ON UPDATE CASCADE;
