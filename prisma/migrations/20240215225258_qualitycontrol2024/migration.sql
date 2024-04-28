/*
  Warnings:

  - You are about to drop the `room` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `score` on table `RoomReport` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `RoomReport` MODIFY `date` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `score` INTEGER NOT NULL;

-- DropForeignKey
ALTER TABLE `RoomReport` DROP FOREIGN KEY `RoomReport_room_id_fkey`;

-- DropForeignKey
ALTER TABLE `Restrooms` DROP FOREIGN KEY `Restrooms_room_id_fkey`;

-- DropTable
DROP TABLE `room`;

-- CreateTable
CREATE TABLE `Room` (
    `room_id` VARCHAR(191) NOT NULL,
    `room_number` VARCHAR(191) NOT NULL,
    `building_number` VARCHAR(191) NOT NULL,
    `building_id` VARCHAR(191) NOT NULL,
    `room_name` VARCHAR(191) NOT NULL,
    `floor_num` VARCHAR(191) NOT NULL,
    `is_clean` BOOLEAN NOT NULL,
    `is_active` BOOLEAN NOT NULL,
    `type_of_room` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`room_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RoomReport` ADD CONSTRAINT `RoomReport_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `Room`(`room_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Restrooms` ADD CONSTRAINT `Restrooms_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `Room`(`room_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
