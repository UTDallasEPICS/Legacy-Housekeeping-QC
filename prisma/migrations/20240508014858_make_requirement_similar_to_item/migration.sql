/*
  Warnings:

  - You are about to drop the column `is_default` on the `requirement` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `requirement` DROP COLUMN `is_default`,
    ADD COLUMN `weight` INTEGER NOT NULL DEFAULT 1;
