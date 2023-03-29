/*
  Warnings:

  - Added the required column `country_code` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state_code` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `country_code` VARCHAR(191) NOT NULL,
    ADD COLUMN `state_code` VARCHAR(191) NOT NULL;
