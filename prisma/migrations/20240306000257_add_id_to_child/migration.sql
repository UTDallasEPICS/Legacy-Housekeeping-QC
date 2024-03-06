/*
  Warnings:

  - The primary key for the `teammember` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `teammember` table. All the data in the column will be lost.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `_scheduletoteammember` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_scheduletoteammember` DROP FOREIGN KEY `_ScheduleToTeamMember_A_fkey`;

-- DropForeignKey
ALTER TABLE `_scheduletoteammember` DROP FOREIGN KEY `_ScheduleToTeamMember_B_fkey`;

-- DropForeignKey
ALTER TABLE `inspection` DROP FOREIGN KEY `Inspection_inspector_id_fkey`;

-- DropForeignKey
ALTER TABLE `score` DROP FOREIGN KEY `Score_team_member_id_fkey`;

-- AlterTable
ALTER TABLE `teammember` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`person_id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`person_id`);

-- DropTable
DROP TABLE `_scheduletoteammember`;

-- AddForeignKey
ALTER TABLE `Score` ADD CONSTRAINT `Score_team_member_id_fkey` FOREIGN KEY (`team_member_id`) REFERENCES `TeamMember`(`person_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inspection` ADD CONSTRAINT `Inspection_inspector_id_fkey` FOREIGN KEY (`inspector_id`) REFERENCES `User`(`person_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
