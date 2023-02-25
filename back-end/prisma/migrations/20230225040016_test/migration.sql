/*
  Warnings:

  - You are about to drop the column `time_stamp` on the `points` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `points` DROP COLUMN `time_stamp`,
    ALTER COLUMN `points` DROP DEFAULT;
