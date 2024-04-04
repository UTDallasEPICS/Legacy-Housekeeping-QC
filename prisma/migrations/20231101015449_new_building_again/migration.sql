/*
  Warnings:

  - You are about to drop the column `building_id` on the `room` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Room_building_id_fkey` ON `room`;

-- AlterTable
ALTER TABLE `room` DROP COLUMN `building_id`;
