/*
  Warnings:

  - The primary key for the `building` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `building_id` on the `building` table. All the data in the column will be lost.
  - You are about to drop the column `building_name` on the `building` table. All the data in the column will be lost.
  - The primary key for the `commonarea` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `hollisticrubric` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `inspection` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `inspection_score` on the `inspection` table. All the data in the column will be lost.
  - The primary key for the `person` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `person_id` on the `person` table. All the data in the column will be lost.
  - The primary key for the `personalroom` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `quantitativerubric` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `quantitative_id` on the `quantitativerubric` table. All the data in the column will be lost.
  - The primary key for the `requirement` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `requirement_id` on the `requirement` table. All the data in the column will be lost.
  - The primary key for the `room` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `building_id` on the `room` table. All the data in the column will be lost.
  - You are about to drop the column `room_id` on the `room` table. All the data in the column will be lost.
  - You are about to drop the column `room_name` on the `room` table. All the data in the column will be lost.
  - The primary key for the `rubric` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `rubric_id` on the `rubric` table. All the data in the column will be lost.
  - The primary key for the `schedule` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `schedule_id` on the `schedule` table. All the data in the column will be lost.
  - The primary key for the `score` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `score` on the `score` table. All the data in the column will be lost.
  - You are about to drop the column `score_id` on the `score` table. All the data in the column will be lost.
  - The primary key for the `teammembers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `team_member_id` on the `teammembers` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_id` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[room_id]` on the table `CommonArea` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[hollistic_id]` on the table `HollisticRubric` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[room_id]` on the table `PersonalRoom` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[rubric_id]` on the table `QuantitativeRubric` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[person_id]` on the table `TeamMembers` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[person_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `Building` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Building` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `CommonArea` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `HollisticRubric` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Inspection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `score` to the `Inspection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `person_type` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `PersonalRoom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `QuantitativeRubric` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rubric_id` to the `QuantitativeRubric` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Requirement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Requirement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `floor_id` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Rubric` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Rubric` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `Score` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Score` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `TeamMembers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `person_id` to the `TeamMembers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `person_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_inspectiontorubric` DROP FOREIGN KEY `_InspectionToRubric_A_fkey`;

-- DropForeignKey
ALTER TABLE `_inspectiontorubric` DROP FOREIGN KEY `_InspectionToRubric_B_fkey`;

-- DropForeignKey
ALTER TABLE `_scheduletoteammembers` DROP FOREIGN KEY `_ScheduleToTeamMembers_A_fkey`;

-- DropForeignKey
ALTER TABLE `_scheduletoteammembers` DROP FOREIGN KEY `_ScheduleToTeamMembers_B_fkey`;

-- DropForeignKey
ALTER TABLE `commonarea` DROP FOREIGN KEY `CommonArea_room_id_fkey`;

-- DropForeignKey
ALTER TABLE `hollisticrubric` DROP FOREIGN KEY `HollisticRubric_hollistic_id_fkey`;

-- DropForeignKey
ALTER TABLE `inspection` DROP FOREIGN KEY `Inspection_inspector_id_fkey`;

-- DropForeignKey
ALTER TABLE `inspection` DROP FOREIGN KEY `Inspection_schedule_id_fkey`;

-- DropForeignKey
ALTER TABLE `item` DROP FOREIGN KEY `Item_personal_room_id_fkey`;

-- DropForeignKey
ALTER TABLE `item` DROP FOREIGN KEY `Item_quantitative_id_fkey`;

-- DropForeignKey
ALTER TABLE `item` DROP FOREIGN KEY `Item_room_id_fkey`;

-- DropForeignKey
ALTER TABLE `personalroom` DROP FOREIGN KEY `PersonalRoom_room_id_fkey`;

-- DropForeignKey
ALTER TABLE `quantitativerubric` DROP FOREIGN KEY `QuantitativeRubric_quantitative_id_fkey`;

-- DropForeignKey
ALTER TABLE `requirement` DROP FOREIGN KEY `Requirement_rubric_id_fkey`;

-- DropForeignKey
ALTER TABLE `room` DROP FOREIGN KEY `Room_building_id_fkey`;

-- DropForeignKey
ALTER TABLE `schedule` DROP FOREIGN KEY `Schedule_room_id_fkey`;

-- DropForeignKey
ALTER TABLE `score` DROP FOREIGN KEY `Score_team_member_id_fkey`;

-- DropForeignKey
ALTER TABLE `teammembers` DROP FOREIGN KEY `TeamMembers_team_member_id_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_user_id_fkey`;

-- AlterTable
ALTER TABLE `building` DROP PRIMARY KEY,
    DROP COLUMN `building_id`,
    DROP COLUMN `building_name`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `commonarea` DROP PRIMARY KEY,
    ADD COLUMN `id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `hollisticrubric` DROP PRIMARY KEY,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `inspection` DROP PRIMARY KEY,
    DROP COLUMN `inspection_score`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `score` INTEGER NOT NULL,
    MODIFY `room_pics` VARCHAR(191) NULL,
    MODIFY `comment` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `person` DROP PRIMARY KEY,
    DROP COLUMN `person_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `person_type` ENUM('USER', 'TEAM_MEMBER') NOT NULL,
    MODIFY `country_code` VARCHAR(191) NULL,
    MODIFY `state_code` VARCHAR(191) NULL,
    MODIFY `phone_number` VARCHAR(191) NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `personalroom` DROP PRIMARY KEY,
    ADD COLUMN `id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `quantitativerubric` DROP PRIMARY KEY,
    DROP COLUMN `quantitative_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `rubric_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `requirement` DROP PRIMARY KEY,
    DROP COLUMN `requirement_id`,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `room` DROP PRIMARY KEY,
    DROP COLUMN `building_id`,
    DROP COLUMN `room_id`,
    DROP COLUMN `room_name`,
    ADD COLUMN `floor_id` INTEGER NOT NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `type` ENUM('COMMON_AREA', 'PERSONAL_ROOM') NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `rubric` DROP PRIMARY KEY,
    DROP COLUMN `rubric_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `type` ENUM('QUANTITATIVE', 'HOLLISTIC') NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `schedule` DROP PRIMARY KEY,
    DROP COLUMN `schedule_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `clean_type` ENUM('NORMAL', 'DEEP') NOT NULL DEFAULT 'NORMAL',
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `score` DROP PRIMARY KEY,
    DROP COLUMN `score`,
    DROP COLUMN `score_id`,
    ADD COLUMN `amount` INTEGER NOT NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `teammembers` DROP PRIMARY KEY,
    DROP COLUMN `team_member_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `person_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `user_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `person_id` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `Floor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number` INTEGER NOT NULL,
    `building_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `CommonArea_room_id_key` ON `CommonArea`(`room_id`);

-- CreateIndex
CREATE UNIQUE INDEX `HollisticRubric_hollistic_id_key` ON `HollisticRubric`(`hollistic_id`);

-- CreateIndex
CREATE UNIQUE INDEX `PersonalRoom_room_id_key` ON `PersonalRoom`(`room_id`);

-- CreateIndex
CREATE UNIQUE INDEX `QuantitativeRubric_rubric_id_key` ON `QuantitativeRubric`(`rubric_id`);

-- CreateIndex
CREATE UNIQUE INDEX `TeamMembers_person_id_key` ON `TeamMembers`(`person_id`);

-- CreateIndex
CREATE UNIQUE INDEX `User_person_id_key` ON `User`(`person_id`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_person_id_fkey` FOREIGN KEY (`person_id`) REFERENCES `Person`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamMembers` ADD CONSTRAINT `TeamMembers_person_id_fkey` FOREIGN KEY (`person_id`) REFERENCES `Person`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Score` ADD CONSTRAINT `Score_team_member_id_fkey` FOREIGN KEY (`team_member_id`) REFERENCES `TeamMembers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `Schedule_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_floor_id_fkey` FOREIGN KEY (`floor_id`) REFERENCES `Floor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommonArea` ADD CONSTRAINT `CommonArea_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PersonalRoom` ADD CONSTRAINT `PersonalRoom_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Floor` ADD CONSTRAINT `Floor_building_id_fkey` FOREIGN KEY (`building_id`) REFERENCES `Building`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inspection` ADD CONSTRAINT `Inspection_inspector_id_fkey` FOREIGN KEY (`inspector_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inspection` ADD CONSTRAINT `Inspection_schedule_id_fkey` FOREIGN KEY (`schedule_id`) REFERENCES `Schedule`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuantitativeRubric` ADD CONSTRAINT `QuantitativeRubric_rubric_id_fkey` FOREIGN KEY (`rubric_id`) REFERENCES `Rubric`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HollisticRubric` ADD CONSTRAINT `HollisticRubric_hollistic_id_fkey` FOREIGN KEY (`hollistic_id`) REFERENCES `Rubric`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Requirement` ADD CONSTRAINT `Requirement_rubric_id_fkey` FOREIGN KEY (`rubric_id`) REFERENCES `Rubric`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_quantitative_id_fkey` FOREIGN KEY (`quantitative_id`) REFERENCES `QuantitativeRubric`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_personal_room_id_fkey` FOREIGN KEY (`personal_room_id`) REFERENCES `PersonalRoom`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ScheduleToTeamMembers` ADD CONSTRAINT `_ScheduleToTeamMembers_A_fkey` FOREIGN KEY (`A`) REFERENCES `Schedule`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ScheduleToTeamMembers` ADD CONSTRAINT `_ScheduleToTeamMembers_B_fkey` FOREIGN KEY (`B`) REFERENCES `TeamMembers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_InspectionToRubric` ADD CONSTRAINT `_InspectionToRubric_A_fkey` FOREIGN KEY (`A`) REFERENCES `Inspection`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_InspectionToRubric` ADD CONSTRAINT `_InspectionToRubric_B_fkey` FOREIGN KEY (`B`) REFERENCES `Rubric`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
