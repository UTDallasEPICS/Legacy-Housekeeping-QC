/*
  Warnings:

  - You are about to drop the `_scheduletoteammember` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `schedule` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_scheduletoteammember` DROP FOREIGN KEY `_ScheduleToTeamMember_A_fkey`;

-- DropForeignKey
ALTER TABLE `_scheduletoteammember` DROP FOREIGN KEY `_ScheduleToTeamMember_B_fkey`;

-- DropForeignKey
ALTER TABLE `inspection` DROP FOREIGN KEY `Inspection_schedule_id_fkey`;

-- DropForeignKey
ALTER TABLE `schedule` DROP FOREIGN KEY `Schedule_room_id_fkey`;

-- DropTable
DROP TABLE `_scheduletoteammember`;

-- DropTable
DROP TABLE `schedule`;
