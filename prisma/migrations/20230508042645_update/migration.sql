/*
  Warnings:

  - Added the required column `floor_num` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room_name` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `room` ADD COLUMN `floor_num` INTEGER NOT NULL,
    ADD COLUMN `room_name` VARCHAR(191) NOT NULL;
