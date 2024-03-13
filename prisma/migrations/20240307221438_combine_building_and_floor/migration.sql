/*
  Warnings:

  - You are about to drop the `floor` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `floor_count` to the `Building` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `floor` DROP FOREIGN KEY `Floor_building_id_fkey`;

-- DropForeignKey
ALTER TABLE `room` DROP FOREIGN KEY `Room_building_id_floor_number_fkey`;

-- AlterTable
ALTER TABLE `building` ADD COLUMN `floor_count` INTEGER NOT NULL;

-- DropTable
DROP TABLE `floor`;
