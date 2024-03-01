/*
  Warnings:

  - The primary key for the `building` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `floors_amount` on the `building` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `building` table. All the data in the column will be lost.
  - The primary key for the `room` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `building_number` on the `room` table. All the data in the column will be lost.
  - You are about to drop the column `floor_num` on the `room` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `room` table. All the data in the column will be lost.
  - You are about to drop the column `is_clean` on the `room` table. All the data in the column will be lost.
  - You are about to drop the column `room_number` on the `room` table. All the data in the column will be lost.
  - You are about to drop the column `type_of_room` on the `room` table. All the data in the column will be lost.
  - You are about to alter the column `room_id` on the `room` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `building_id` on the `room` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `teammembers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `address_line` on the `teammembers` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `teammembers` table. All the data in the column will be lost.
  - You are about to drop the column `country_code` on the `teammembers` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `teammembers` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `teammembers` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `teammembers` table. All the data in the column will be lost.
  - You are about to drop the column `member_id` on the `teammembers` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `teammembers` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `teammembers` table. All the data in the column will be lost.
  - You are about to drop the column `state_code` on the `teammembers` table. All the data in the column will be lost.
  - You are about to drop the column `total_points` on the `teammembers` table. All the data in the column will be lost.
  - You are about to drop the column `zipcode` on the `teammembers` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `country_code` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `state_code` on the `user` table. All the data in the column will be lost.
  - You are about to alter the column `user_id` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the `admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ancillary_areas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `assisted_living` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `independent_living` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `leader` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `memory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `points` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `restrooms` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `roomreport` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `skilled` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `building_id` to the `Building` table without a default value. This is not possible if the table is not empty.
  - Added the required column `team_member_id` to the `TeamMembers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `admin` DROP FOREIGN KEY `Admin_userId_fkey`;

-- DropForeignKey
ALTER TABLE `items` DROP FOREIGN KEY `Items_ancillary_id_fkey`;

-- DropForeignKey
ALTER TABLE `items` DROP FOREIGN KEY `Items_assisted_id_fkey`;

-- DropForeignKey
ALTER TABLE `items` DROP FOREIGN KEY `Items_independent_id_fkey`;

-- DropForeignKey
ALTER TABLE `items` DROP FOREIGN KEY `Items_memory_id_fkey`;

-- DropForeignKey
ALTER TABLE `items` DROP FOREIGN KEY `Items_restroom_id_fkey`;

-- DropForeignKey
ALTER TABLE `items` DROP FOREIGN KEY `Items_skilled_id_fkey`;

-- DropForeignKey
ALTER TABLE `leader` DROP FOREIGN KEY `Leader_userId_fkey`;

-- DropForeignKey
ALTER TABLE `points` DROP FOREIGN KEY `Points_team_member_id_fkey`;

-- DropForeignKey
ALTER TABLE `restrooms` DROP FOREIGN KEY `Restrooms_room_id_fkey`;

-- DropForeignKey
ALTER TABLE `roomreport` DROP FOREIGN KEY `RoomReport_room_id_fkey`;

-- DropForeignKey
ALTER TABLE `roomreport` DROP FOREIGN KEY `RoomReport_team_member_id_fkey`;

-- DropIndex
DROP INDEX `Building_building_name_key` ON `building`;

-- DropIndex
DROP INDEX `User_email_key` ON `user`;

-- AlterTable
ALTER TABLE `building` DROP PRIMARY KEY,
    DROP COLUMN `floors_amount`,
    DROP COLUMN `id`,
    ADD COLUMN `building_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`building_id`);

-- AlterTable
ALTER TABLE `room` DROP PRIMARY KEY,
    DROP COLUMN `building_number`,
    DROP COLUMN `floor_num`,
    DROP COLUMN `is_active`,
    DROP COLUMN `is_clean`,
    DROP COLUMN `room_number`,
    DROP COLUMN `type_of_room`,
    MODIFY `room_id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `building_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`room_id`);

-- AlterTable
ALTER TABLE `teammembers` DROP PRIMARY KEY,
    DROP COLUMN `address_line`,
    DROP COLUMN `city`,
    DROP COLUMN `country_code`,
    DROP COLUMN `email`,
    DROP COLUMN `first_name`,
    DROP COLUMN `last_name`,
    DROP COLUMN `member_id`,
    DROP COLUMN `phone_number`,
    DROP COLUMN `state`,
    DROP COLUMN `state_code`,
    DROP COLUMN `total_points`,
    DROP COLUMN `zipcode`,
    ADD COLUMN `team_member_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`team_member_id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `country_code`,
    DROP COLUMN `email`,
    DROP COLUMN `first_name`,
    DROP COLUMN `last_name`,
    DROP COLUMN `phone_number`,
    DROP COLUMN `role`,
    DROP COLUMN `state_code`,
    ADD COLUMN `username` VARCHAR(191) NOT NULL,
    MODIFY `user_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`user_id`);

-- DropTable
DROP TABLE `admin`;

-- DropTable
DROP TABLE `ancillary_areas`;

-- DropTable
DROP TABLE `assisted_living`;

-- DropTable
DROP TABLE `independent_living`;

-- DropTable
DROP TABLE `items`;

-- DropTable
DROP TABLE `leader`;

-- DropTable
DROP TABLE `memory`;

-- DropTable
DROP TABLE `points`;

-- DropTable
DROP TABLE `restrooms`;

-- DropTable
DROP TABLE `roomreport`;

-- DropTable
DROP TABLE `skilled`;

-- CreateTable
CREATE TABLE `Person` (
    `person_id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `country_code` VARCHAR(191) NOT NULL,
    `state_code` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Person_email_key`(`email`),
    PRIMARY KEY (`person_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Score` (
    `score_id` INTEGER NOT NULL AUTO_INCREMENT,
    `score` INTEGER NOT NULL,
    `team_member_id` INTEGER NOT NULL,

    PRIMARY KEY (`score_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Schedule` (
    `schedule_id` INTEGER NOT NULL AUTO_INCREMENT,
    `start_time` DATETIME(3) NOT NULL,
    `end_time` DATETIME(3) NOT NULL,
    `clean_type` ENUM('NORMAL', 'DEEP') NOT NULL,
    `room_id` INTEGER NOT NULL,

    PRIMARY KEY (`schedule_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CommonArea` (
    `room_id` INTEGER NOT NULL,

    PRIMARY KEY (`room_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PersonalRoom` (
    `room_id` INTEGER NOT NULL,
    `is_occupied` BOOLEAN NOT NULL,

    PRIMARY KEY (`room_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Inspection` (
    `inspector_id` INTEGER NOT NULL,
    `schedule_id` INTEGER NOT NULL,
    `timestamp` DATETIME(3) NOT NULL,
    `room_pics` VARCHAR(191) NOT NULL,
    `comment` VARCHAR(191) NOT NULL,
    `clean_status` ENUM('CLEANED', 'NOT_CLEANED', 'UNFINISHED') NOT NULL,
    `inspection_score` INTEGER NOT NULL,

    PRIMARY KEY (`inspector_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rubric` (
    `rubric_id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`rubric_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QuantitativeRubric` (
    `quantitative_id` INTEGER NOT NULL,

    PRIMARY KEY (`quantitative_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HollisticRubric` (
    `hollistic_id` INTEGER NOT NULL,

    PRIMARY KEY (`hollistic_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Requirement` (
    `requirement_id` INTEGER NOT NULL AUTO_INCREMENT,
    `rubric_id` INTEGER NOT NULL,

    PRIMARY KEY (`requirement_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item` (
    `item_name` VARCHAR(191) NOT NULL,
    `room_id` INTEGER NOT NULL,
    `quantitative_id` INTEGER NOT NULL,
    `personal_room_id` INTEGER NOT NULL,

    PRIMARY KEY (`room_id`, `item_name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ScheduleToTeamMembers` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ScheduleToTeamMembers_AB_unique`(`A`, `B`),
    INDEX `_ScheduleToTeamMembers_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_InspectionToRubric` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_InspectionToRubric_AB_unique`(`A`, `B`),
    INDEX `_InspectionToRubric_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Person`(`person_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamMembers` ADD CONSTRAINT `TeamMembers_team_member_id_fkey` FOREIGN KEY (`team_member_id`) REFERENCES `Person`(`person_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Score` ADD CONSTRAINT `Score_team_member_id_fkey` FOREIGN KEY (`team_member_id`) REFERENCES `TeamMembers`(`team_member_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `Schedule_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `Room`(`room_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_building_id_fkey` FOREIGN KEY (`building_id`) REFERENCES `Building`(`building_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommonArea` ADD CONSTRAINT `CommonArea_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `Room`(`room_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PersonalRoom` ADD CONSTRAINT `PersonalRoom_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `Room`(`room_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inspection` ADD CONSTRAINT `Inspection_inspector_id_fkey` FOREIGN KEY (`inspector_id`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inspection` ADD CONSTRAINT `Inspection_schedule_id_fkey` FOREIGN KEY (`schedule_id`) REFERENCES `Schedule`(`schedule_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuantitativeRubric` ADD CONSTRAINT `QuantitativeRubric_quantitative_id_fkey` FOREIGN KEY (`quantitative_id`) REFERENCES `Rubric`(`rubric_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HollisticRubric` ADD CONSTRAINT `HollisticRubric_hollistic_id_fkey` FOREIGN KEY (`hollistic_id`) REFERENCES `Rubric`(`rubric_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Requirement` ADD CONSTRAINT `Requirement_rubric_id_fkey` FOREIGN KEY (`rubric_id`) REFERENCES `Rubric`(`rubric_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `Room`(`room_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_quantitative_id_fkey` FOREIGN KEY (`quantitative_id`) REFERENCES `QuantitativeRubric`(`quantitative_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_personal_room_id_fkey` FOREIGN KEY (`personal_room_id`) REFERENCES `PersonalRoom`(`room_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ScheduleToTeamMembers` ADD CONSTRAINT `_ScheduleToTeamMembers_A_fkey` FOREIGN KEY (`A`) REFERENCES `Schedule`(`schedule_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ScheduleToTeamMembers` ADD CONSTRAINT `_ScheduleToTeamMembers_B_fkey` FOREIGN KEY (`B`) REFERENCES `TeamMembers`(`team_member_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_InspectionToRubric` ADD CONSTRAINT `_InspectionToRubric_A_fkey` FOREIGN KEY (`A`) REFERENCES `Inspection`(`inspector_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_InspectionToRubric` ADD CONSTRAINT `_InspectionToRubric_B_fkey` FOREIGN KEY (`B`) REFERENCES `Rubric`(`rubric_id`) ON DELETE CASCADE ON UPDATE CASCADE;
