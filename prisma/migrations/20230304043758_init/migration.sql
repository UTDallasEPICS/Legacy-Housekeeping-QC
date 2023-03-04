/*
  Warnings:

  - You are about to drop the `roomsonteammembers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `roomsonteammembers` DROP FOREIGN KEY `RoomsOnTeamMembers_room_id_fkey`;

-- DropForeignKey
ALTER TABLE `roomsonteammembers` DROP FOREIGN KEY `RoomsOnTeamMembers_team_member_id_fkey`;

-- AlterTable
ALTER TABLE `points` MODIFY `points` INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE `roomsonteammembers`;

-- CreateTable
CREATE TABLE `RoomReport` (
    `team_member_id` VARCHAR(191) NOT NULL,
    `room_id` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `cleaned` BOOLEAN NOT NULL DEFAULT false,
    `comments` VARCHAR(191) NULL,

    PRIMARY KEY (`team_member_id`, `room_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RoomReport` ADD CONSTRAINT `RoomReport_team_member_id_fkey` FOREIGN KEY (`team_member_id`) REFERENCES `TeamMembers`(`member_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoomReport` ADD CONSTRAINT `RoomReport_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `Room`(`room_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
