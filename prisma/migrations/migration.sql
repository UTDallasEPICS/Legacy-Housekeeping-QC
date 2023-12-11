/*
  Warnings:

  - You are about to drop the `room` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `roomreport` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `teammembers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
*/

-- DropForeignKey
ALTER TABLE `Admin` DROP FOREIGN KEY `Admin_userId_fkey`;
-- DropIndex
DROP INDEX `Admin_userId_fkey` ON `Admin`;

-- DropForeignKey
ALTER TABLE `Leader` DROP FOREIGN KEY `Leader_userId_fkey`;
-- DropIndex
DROP INDEX `Leader_userId_fkey` ON `Leader`;

-- DropForeignKey
ALTER TABLE `Points` DROP FOREIGN KEY `Points_team_member_id_fkey`;
-- DropIndex
DROP INDEX `Points_team_member_id_fkey` ON `Points`;

-- DropForeignKey
ALTER TABLE `Restrooms` DROP FOREIGN KEY `Restrooms_room_id_fkey`;
-- DropIndex
DROP INDEX `Restrooms_room_id_fkey` ON `Restrooms`;

-- DropForeignKey
ALTER TABLE `RoomReport` DROP FOREIGN KEY `RoomReport_room_id_fkey`;
-- DropTable
DROP TABLE `room`;

-- DropForeignKey
ALTER TABLE `RoomReport` DROP FOREIGN KEY `RoomReport_team_member_id_fkey`;
-- DropTable
DROP TABLE `teammembers`;

-- DropTable
DROP TABLE `RoomReport`;

-- DropTable
DROP TABLE `user`;



-- CreateTable
CREATE TABLE `User` (
    `user_id` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `country_code` VARCHAR(191) NOT NULL,
    `state_code` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TeamMembers` (
    `member_id` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `country_code` VARCHAR(191) NOT NULL,
    `state_code` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NOT NULL,
    `address_line` VARCHAR(191) NOT NULL,
    `zipcode` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `total_points` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`member_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Room` (
    `room_id` VARCHAR(191) NOT NULL,
    `room_number` VARCHAR(191) NOT NULL,
    `building_number` VARCHAR(191) NOT NULL,
    `room_name` VARCHAR(191) NOT NULL,
    `floor_num` VARCHAR(191) NOT NULL,
    `is_clean` BOOLEAN NOT NULL,
    `is_active` BOOLEAN NOT NULL,
    `type_of_room` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`room_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RoomReport` (
    `team_member_id` VARCHAR(191) NOT NULL,
    `room_id` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `cleaned` BOOLEAN NOT NULL DEFAULT false,
    `comments` VARCHAR(191) NULL,
    `score` INTEGER NULL,

    PRIMARY KEY (`team_member_id`, `room_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Admin` ADD CONSTRAINT `Admin_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Leader` ADD CONSTRAINT `Leader_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Points` ADD CONSTRAINT `Points_team_member_id_fkey` FOREIGN KEY (`team_member_id`) REFERENCES `TeamMembers`(`member_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoomReport` ADD CONSTRAINT `RoomReport_team_member_id_fkey` FOREIGN KEY (`team_member_id`) REFERENCES `TeamMembers`(`member_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoomReport` ADD CONSTRAINT `RoomReport_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `Room`(`room_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Restrooms` ADD CONSTRAINT `Restrooms_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `Room`(`room_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
