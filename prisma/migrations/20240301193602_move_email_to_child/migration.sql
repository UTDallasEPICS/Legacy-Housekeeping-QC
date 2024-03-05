/*
  Warnings:

  - You are about to drop the column `email` on the `person` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Person_email_key` ON `person`;

-- AlterTable
ALTER TABLE `person` DROP COLUMN `email`;

-- AlterTable
ALTER TABLE `teammember` ADD COLUMN `email` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `username`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);
