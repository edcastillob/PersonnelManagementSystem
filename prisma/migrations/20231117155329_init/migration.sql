/*
  Warnings:

  - You are about to drop the column `role` on the `Employee` table. All the data in the column will be lost.
  - Added the required column `id_role` to the `Employee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "role",
ADD COLUMN     "id_role" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Role" (
    "id_role" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id_role")
);

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_id_cargo_fkey" FOREIGN KEY ("id_cargo") REFERENCES "Cargo"("id_cargo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_id_role_fkey" FOREIGN KEY ("id_role") REFERENCES "Role"("id_role") ON DELETE RESTRICT ON UPDATE CASCADE;
