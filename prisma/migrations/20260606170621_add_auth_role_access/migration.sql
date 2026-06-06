/*
  Warnings:

  - A unique constraint covering the columns `[authUserId]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "AppRole" AS ENUM ('ADMIN', 'EMPLOYEE');

-- AlterTable
ALTER TABLE "Employee" ADD COLUMN     "appRole" "AppRole" NOT NULL DEFAULT 'EMPLOYEE',
ADD COLUMN     "authUserId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Employee_authUserId_key" ON "Employee"("authUserId");
