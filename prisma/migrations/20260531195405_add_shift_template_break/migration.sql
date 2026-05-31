/*
  Warnings:

  - You are about to drop the `EmployeeSkill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Skill` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `ShiftTemplate` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "EmployeeSkill" DROP CONSTRAINT "EmployeeSkill_employeeId_fkey";

-- DropForeignKey
ALTER TABLE "EmployeeSkill" DROP CONSTRAINT "EmployeeSkill_skillId_fkey";

-- AlterTable
ALTER TABLE "ShiftTemplate" ADD COLUMN     "isBreak" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "EmployeeSkill";

-- DropTable
DROP TABLE "Skill";

-- CreateTable
CREATE TABLE "Responsibility" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Responsibility_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmployeeResponsibility" (
    "employeeId" TEXT NOT NULL,
    "responsibilityId" TEXT NOT NULL,
    "proficiency" INTEGER NOT NULL DEFAULT 3,

    CONSTRAINT "EmployeeResponsibility_pkey" PRIMARY KEY ("employeeId","responsibilityId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Responsibility_name_key" ON "Responsibility"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ShiftTemplate_name_key" ON "ShiftTemplate"("name");

-- AddForeignKey
ALTER TABLE "EmployeeResponsibility" ADD CONSTRAINT "EmployeeResponsibility_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeResponsibility" ADD CONSTRAINT "EmployeeResponsibility_responsibilityId_fkey" FOREIGN KEY ("responsibilityId") REFERENCES "Responsibility"("id") ON DELETE CASCADE ON UPDATE CASCADE;
