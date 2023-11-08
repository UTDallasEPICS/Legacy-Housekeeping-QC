/*
  Warnings:

  - Added the required column `building_id` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `room` ADD COLUMN `building_id` VARCHAR(191) NOT NULL;
