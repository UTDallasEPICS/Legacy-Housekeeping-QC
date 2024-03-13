/*
  Warnings:

  - The primary key for the `floor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `floor` table. All the data in the column will be lost.
  - You are about to drop the column `floor_id` on the `room` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[number]` on the table `Floor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `building_id` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `floor_number` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `room` DROP FOREIGN KEY `Room_floor_id_fkey`;

-- DropForeignKey
ALTER TABLE `score` DROP FOREIGN KEY `Score_team_member_id_fkey`;

-- DropForeignKey
ALTER TABLE `teammember` DROP FOREIGN KEY `TeamMember_person_id_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_person_id_fkey`;

-- AlterTable
ALTER TABLE `floor` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`building_id`, `number`);

-- AlterTable
ALTER TABLE `room` DROP COLUMN `floor_id`,
    ADD COLUMN `building_id` INTEGER NOT NULL,
    ADD COLUMN `floor_number` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Floor_number_key` ON `Floor`(`number`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_person_id_fkey` FOREIGN KEY (`person_id`) REFERENCES `Person`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamMember` ADD CONSTRAINT `TeamMember_person_id_fkey` FOREIGN KEY (`person_id`) REFERENCES `Person`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Score` ADD CONSTRAINT `Score_team_member_id_fkey` FOREIGN KEY (`team_member_id`) REFERENCES `TeamMember`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_building_id_floor_number_fkey` FOREIGN KEY (`building_id`, `floor_number`) REFERENCES `Floor`(`building_id`, `number`) ON DELETE RESTRICT ON UPDATE CASCADE;
