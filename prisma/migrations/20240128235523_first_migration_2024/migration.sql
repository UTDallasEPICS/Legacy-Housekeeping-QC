/*
  Warnings:

  - Made the column `score` on table `roomreport` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `roomreport` MODIFY `date` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `score` INTEGER NOT NULL;
