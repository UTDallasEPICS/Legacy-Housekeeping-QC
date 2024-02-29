/*
  Warnings:

  - You are about to drop the column `person_type` on the `person` table. All the data in the column will be lost.
  - Added the required column `type` to the `Person` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `person` DROP COLUMN `person_type`,
    ADD COLUMN `type` ENUM('USER', 'TEAM_MEMBER') NOT NULL;
