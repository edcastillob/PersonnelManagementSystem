/*
  Warnings:

  - You are about to drop the `PasswordReset` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "PasswordReset";

-- CreateTable
CREATE TABLE "Department" (
    "id_department" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Department_pkey" PRIMARY KEY ("id_department")
);

-- CreateTable
CREATE TABLE "JobTitle" (
    "id_cargo" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "id_department" INTEGER NOT NULL,

    CONSTRAINT "JobTitle_pkey" PRIMARY KEY ("id_cargo")
);

-- CreateTable
CREATE TABLE "Cargo" (
    "id_cargo" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Cargo_pkey" PRIMARY KEY ("id_cargo")
);

-- CreateTable
CREATE TABLE "Ubication" (
    "id_ubication" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Ubication_pkey" PRIMARY KEY ("id_ubication")
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "dni" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3) NOT NULL,
    "civil_status" TEXT NOT NULL,
    "photo" TEXT,
    "address" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "id_department" INTEGER NOT NULL,
    "id_cargo" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "id_ubication" INTEGER NOT NULL,
    "salary" DOUBLE PRECISION NOT NULL,
    "benefit" TEXT NOT NULL,
    "social_security" TEXT NOT NULL,
    "tax_identification" TEXT NOT NULL,
    "education_level" TEXT NOT NULL,
    "educational_degree" TEXT NOT NULL,
    "certifications" TEXT NOT NULL,
    "blood_type" TEXT NOT NULL,
    "allergic_to" TEXT NOT NULL,
    "contact_information" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "id_status" INTEGER NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SalaryChange" (
    "id" SERIAL NOT NULL,
    "idEmpleado" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "edit_for" TEXT NOT NULL,

    CONSTRAINT "SalaryChange_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Status" (
    "id_status" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id_status")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_dni_key" ON "Employee"("dni");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- AddForeignKey
ALTER TABLE "JobTitle" ADD CONSTRAINT "JobTitle_id_department_fkey" FOREIGN KEY ("id_department") REFERENCES "Department"("id_department") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_id_department_fkey" FOREIGN KEY ("id_department") REFERENCES "Department"("id_department") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_id_cargo_fkey" FOREIGN KEY ("id_cargo") REFERENCES "JobTitle"("id_cargo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_id_ubication_fkey" FOREIGN KEY ("id_ubication") REFERENCES "Ubication"("id_ubication") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_id_status_fkey" FOREIGN KEY ("id_status") REFERENCES "Status"("id_status") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SalaryChange" ADD CONSTRAINT "SalaryChange_idEmpleado_fkey" FOREIGN KEY ("idEmpleado") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
