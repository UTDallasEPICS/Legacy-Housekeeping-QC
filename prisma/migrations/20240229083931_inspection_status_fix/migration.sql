/*
  Warnings:

  - Made the column `inspect_status` on table `inspection` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `inspection` MODIFY `clean_status` ENUM('CLEANED', 'NOT_CLEANED', 'UNFINISHED') NULL,
    MODIFY `inspect_status` ENUM('INSPECTED', 'NOT_INSPECTED', 'UNFINISHED') NOT NULL;
