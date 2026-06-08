-- CreateEnum
CREATE TYPE "AbsenceStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "Absence" ADD COLUMN     "status" "AbsenceStatus" NOT NULL DEFAULT 'PENDING';
