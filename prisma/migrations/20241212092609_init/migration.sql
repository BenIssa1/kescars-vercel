/*
  Warnings:

  - The values [PROVIDER] on the enum `UserRole` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `neighborhood` on the `Insured` table. All the data in the column will be lost.
  - The `status` column on the `Insured` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `feesAndAccessories` on the `Prime` table. All the data in the column will be lost.
  - You are about to drop the column `guaranteeId` on the `Prime` table. All the data in the column will be lost.
  - You are about to drop the column `netPrime` on the `Prime` table. All the data in the column will be lost.
  - You are about to drop the column `taxes` on the `Prime` table. All the data in the column will be lost.
  - You are about to drop the column `totalCashBonus` on the `Prime` table. All the data in the column will be lost.
  - You are about to drop the `Statement` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `dailyCosts` to the `Prime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deathCapital` to the `Prime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `individualCapital` to the `Prime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medicalExpenses` to the `Prime` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'INACTIVE', 'PENDING');

-- CreateEnum
CREATE TYPE "Declarant" AS ENUM ('FIRST_AIDERS', 'HEALTH_CENTER');

-- AlterEnum
BEGIN;
CREATE TYPE "UserRole_new" AS ENUM ('ADMIN', 'USER', 'FIRST_AIDERS', 'CARE_CENTER', 'BROKERAGECOMPANY');
ALTER TABLE "User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "role" TYPE "UserRole_new" USING ("role"::text::"UserRole_new");
ALTER TYPE "UserRole" RENAME TO "UserRole_old";
ALTER TYPE "UserRole_new" RENAME TO "UserRole";
DROP TYPE "UserRole_old";
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;

-- DropForeignKey
ALTER TABLE "Prime" DROP CONSTRAINT "Prime_guaranteeId_fkey";

-- DropForeignKey
ALTER TABLE "Statement" DROP CONSTRAINT "Statement_insuredId_fkey";

-- DropIndex
DROP INDEX "Prime_guaranteeId_key";

-- AlterTable
ALTER TABLE "Bringer" ADD COLUMN     "brokerageCompanyId" TEXT;

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "brokerageCompanyId" TEXT;

-- AlterTable
ALTER TABLE "Insured" DROP COLUMN "neighborhood",
ADD COLUMN     "brokerageCompanyId" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "Prime" DROP COLUMN "feesAndAccessories",
DROP COLUMN "guaranteeId",
DROP COLUMN "netPrime",
DROP COLUMN "taxes",
DROP COLUMN "totalCashBonus",
ADD COLUMN     "dailyCosts" INTEGER NOT NULL,
ADD COLUMN     "deathCapital" INTEGER NOT NULL,
ADD COLUMN     "individualCapital" INTEGER NOT NULL,
ADD COLUMN     "medicalExpenses" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Subscriber" ADD COLUMN     "brokerageCompanyId" TEXT,
ADD COLUMN     "prime" VARCHAR(10);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "brokerageCompanyId" TEXT;

-- DropTable
DROP TABLE "Statement";

-- CreateTable
CREATE TABLE "BrokerageCompany" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "number" TEXT,

    CONSTRAINT "BrokerageCompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Beneficiary" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "percentage" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "insuredId" TEXT NOT NULL,

    CONSTRAINT "Beneficiary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Treatment" (
    "id" TEXT NOT NULL,
    "pickupDate" TIMESTAMP(3) NOT NULL,
    "pickupLocation" TEXT NOT NULL,
    "supportCenter" TEXT NOT NULL,
    "report" TEXT NOT NULL,
    "declarant" "Declarant" NOT NULL DEFAULT 'FIRST_AIDERS',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "insuredId" TEXT NOT NULL,

    CONSTRAINT "Treatment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Treatment_insuredId_key" ON "Treatment"("insuredId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_brokerageCompanyId_fkey" FOREIGN KEY ("brokerageCompanyId") REFERENCES "BrokerageCompany"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bringer" ADD CONSTRAINT "Bringer_brokerageCompanyId_fkey" FOREIGN KEY ("brokerageCompanyId") REFERENCES "BrokerageCompany"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_brokerageCompanyId_fkey" FOREIGN KEY ("brokerageCompanyId") REFERENCES "BrokerageCompany"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscriber" ADD CONSTRAINT "Subscriber_brokerageCompanyId_fkey" FOREIGN KEY ("brokerageCompanyId") REFERENCES "BrokerageCompany"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Insured" ADD CONSTRAINT "Insured_brokerageCompanyId_fkey" FOREIGN KEY ("brokerageCompanyId") REFERENCES "BrokerageCompany"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Beneficiary" ADD CONSTRAINT "Beneficiary_insuredId_fkey" FOREIGN KEY ("insuredId") REFERENCES "Insured"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Treatment" ADD CONSTRAINT "Treatment_insuredId_fkey" FOREIGN KEY ("insuredId") REFERENCES "Insured"("id") ON DELETE CASCADE ON UPDATE CASCADE;
