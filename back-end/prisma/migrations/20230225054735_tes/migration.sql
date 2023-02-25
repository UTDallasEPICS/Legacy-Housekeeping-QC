/*
  Warnings:

  - You are about to alter the column `team_member_id` on the `points` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `team_members` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `member_id` on the `team_members` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `points` DROP FOREIGN KEY `Points_team_member_id_fkey`;

-- DropIndex
DROP INDEX `Team_Members_member_id_key` ON `team_members`;

-- AlterTable
ALTER TABLE `points` MODIFY `team_member_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `team_members` DROP PRIMARY KEY,
    MODIFY `member_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`member_id`);

-- AddForeignKey
ALTER TABLE `Points` ADD CONSTRAINT `Points_team_member_id_fkey` FOREIGN KEY (`team_member_id`) REFERENCES `Team_Members`(`member_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
