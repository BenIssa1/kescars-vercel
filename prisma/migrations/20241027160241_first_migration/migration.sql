-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER', 'PROVIDER', 'CARE_CENTER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "password" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "isTwoFactorEnabled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PasswordResetToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PasswordResetToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TwoFactorToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TwoFactorToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TwoFactorConfirmation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "TwoFactorConfirmation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bringer" (
    "id" TEXT NOT NULL,
    "avatar" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "terminate" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bringer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "avatar" TEXT,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscriber" (
    "id" TEXT NOT NULL,
    "avatar" TEXT,
    "subscriberFullName" TEXT NOT NULL,
    "taxpayer" TEXT,
    "fieldOfActivity" TEXT,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "bringerId" TEXT NOT NULL,

    CONSTRAINT "Subscriber_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Insured" (
    "id" TEXT NOT NULL,
    "avatar" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "placeOfBirth" TEXT NOT NULL,
    "bloodGroup" TEXT NOT NULL,
    "professionalActivity" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "urgentNumber" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "prefecture" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "policyNumber" TEXT,
    "typeOfContrat" TEXT,
    "paiementMode" TEXT,
    "effectiveDate" TIMESTAMP(3),
    "expirationDate" TIMESTAMP(3),
    "status" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "subscriberId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "Insured_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guarantee" (
    "id" TEXT NOT NULL,
    "product" VARCHAR(15) NOT NULL,
    "capitaldeath" VARCHAR(10) NOT NULL,
    "disabilityCapital" VARCHAR(10) NOT NULL,
    "medicalFees" VARCHAR(10) NOT NULL,
    "dailyFees" VARCHAR(10) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "insuredId" TEXT NOT NULL,

    CONSTRAINT "Guarantee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Prime" (
    "id" TEXT NOT NULL,
    "netPrime" VARCHAR(10) NOT NULL,
    "taxes" VARCHAR(10) NOT NULL,
    "feesAndAccessories" VARCHAR(10) NOT NULL,
    "totalCashBonus" VARCHAR(10) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "guaranteeId" TEXT NOT NULL,
    "insuredId" TEXT NOT NULL,

    CONSTRAINT "Prime_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Statement" (
    "id" TEXT NOT NULL,
    "disasterDate" TIMESTAMP(3) NOT NULL,
    "disasterPlace" TEXT NOT NULL,
    "hospitalCenter" TEXT NOT NULL,
    "accidentReport" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "insuredId" TEXT NOT NULL,

    CONSTRAINT "Statement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flow" (
    "id" SERIAL NOT NULL,
    "month" VARCHAR(4) NOT NULL,
    "subscribers" INTEGER NOT NULL,
    "insureds" INTEGER NOT NULL,

    CONSTRAINT "Flow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_email_token_key" ON "VerificationToken"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_token_key" ON "PasswordResetToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordResetToken_email_token_key" ON "PasswordResetToken"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "TwoFactorToken_token_key" ON "TwoFactorToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "TwoFactorToken_email_token_key" ON "TwoFactorToken"("email", "token");

-- CreateIndex
CREATE UNIQUE INDEX "TwoFactorConfirmation_userId_key" ON "TwoFactorConfirmation"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Bringer_email_key" ON "Bringer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Company_email_key" ON "Company"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Subscriber_email_key" ON "Subscriber"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Insured_email_key" ON "Insured"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Guarantee_insuredId_key" ON "Guarantee"("insuredId");

-- CreateIndex
CREATE UNIQUE INDEX "Prime_guaranteeId_key" ON "Prime"("guaranteeId");

-- CreateIndex
CREATE UNIQUE INDEX "Prime_insuredId_key" ON "Prime"("insuredId");

-- CreateIndex
CREATE UNIQUE INDEX "Statement_insuredId_key" ON "Statement"("insuredId");

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TwoFactorConfirmation" ADD CONSTRAINT "TwoFactorConfirmation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscriber" ADD CONSTRAINT "Subscriber_bringerId_fkey" FOREIGN KEY ("bringerId") REFERENCES "Bringer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Insured" ADD CONSTRAINT "Insured_subscriberId_fkey" FOREIGN KEY ("subscriberId") REFERENCES "Subscriber"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Insured" ADD CONSTRAINT "Insured_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guarantee" ADD CONSTRAINT "Guarantee_insuredId_fkey" FOREIGN KEY ("insuredId") REFERENCES "Insured"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prime" ADD CONSTRAINT "Prime_guaranteeId_fkey" FOREIGN KEY ("guaranteeId") REFERENCES "Guarantee"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prime" ADD CONSTRAINT "Prime_insuredId_fkey" FOREIGN KEY ("insuredId") REFERENCES "Insured"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Statement" ADD CONSTRAINT "Statement_insuredId_fkey" FOREIGN KEY ("insuredId") REFERENCES "Insured"("id") ON DELETE CASCADE ON UPDATE CASCADE;
