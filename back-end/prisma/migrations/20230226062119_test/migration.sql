/*
  Warnings:

  - You are about to drop the `team_members` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `room_id` to the `Restrooms` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `points` DROP FOREIGN KEY `Points_team_member_id_fkey`;

-- AlterTable
ALTER TABLE `restrooms` ADD COLUMN `room_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `room` ALTER COLUMN `time_stamp` DROP DEFAULT;

-- DropTable
DROP TABLE `team_members`;

-- CreateTable
CREATE TABLE `TeamMembers` (
    `member_id` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`member_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RoomsOnTeamMembers` (
    `team_member_id` VARCHAR(191) NOT NULL,
    `room_id` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `cleaned` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`team_member_id`, `room_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Items` (
    `item_id` VARCHAR(191) NOT NULL,
    `item` VARCHAR(191) NOT NULL,
    `restroom_id` VARCHAR(191) NOT NULL,
    `ancillary_id` VARCHAR(191) NOT NULL,
    `independent_id` VARCHAR(191) NOT NULL,
    `assisted_id` VARCHAR(191) NOT NULL,
    `skilled_id` VARCHAR(191) NOT NULL,
    `memory_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Points` ADD CONSTRAINT `Points_team_member_id_fkey` FOREIGN KEY (`team_member_id`) REFERENCES `TeamMembers`(`member_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoomsOnTeamMembers` ADD CONSTRAINT `RoomsOnTeamMembers_team_member_id_fkey` FOREIGN KEY (`team_member_id`) REFERENCES `TeamMembers`(`member_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoomsOnTeamMembers` ADD CONSTRAINT `RoomsOnTeamMembers_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `Room`(`room_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Items` ADD CONSTRAINT `Items_restroom_id_fkey` FOREIGN KEY (`restroom_id`) REFERENCES `Restrooms`(`restroom_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Items` ADD CONSTRAINT `Items_ancillary_id_fkey` FOREIGN KEY (`ancillary_id`) REFERENCES `Ancillary_Areas`(`ancillary_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Items` ADD CONSTRAINT `Items_independent_id_fkey` FOREIGN KEY (`independent_id`) REFERENCES `Independent_Living`(`independent_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Items` ADD CONSTRAINT `Items_assisted_id_fkey` FOREIGN KEY (`assisted_id`) REFERENCES `Assisted_Living`(`assisted_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Items` ADD CONSTRAINT `Items_skilled_id_fkey` FOREIGN KEY (`skilled_id`) REFERENCES `Skilled`(`skilled_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Items` ADD CONSTRAINT `Items_memory_id_fkey` FOREIGN KEY (`memory_id`) REFERENCES `Memory`(`memory_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Restrooms` ADD CONSTRAINT `Restrooms_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `Room`(`room_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
