/*
  Warnings:

  - You are about to drop the column `rubric_id` on the `room` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `room` DROP FOREIGN KEY `Room_rubric_id_fkey`;

-- AlterTable
ALTER TABLE `room` DROP COLUMN `rubric_id`;
