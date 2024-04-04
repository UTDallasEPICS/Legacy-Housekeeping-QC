/*
  Warnings:

  - Added the required column `address_line` to the `TeamMembers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `TeamMembers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country_code` to the `TeamMembers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `TeamMembers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `TeamMembers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state_code` to the `TeamMembers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipcode` to the `TeamMembers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `teammembers` ADD COLUMN `address_line` VARCHAR(191) NOT NULL,
    ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `country_code` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone_number` VARCHAR(191) NOT NULL,
    ADD COLUMN `state` VARCHAR(191) NOT NULL,
    ADD COLUMN `state_code` VARCHAR(191) NOT NULL,
    ADD COLUMN `zipcode` VARCHAR(191) NOT NULL;
