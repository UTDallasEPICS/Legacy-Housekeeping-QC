/*
  Warnings:

  - The primary key for the `points` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `team_members` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `points` DROP FOREIGN KEY `Points_team_member_id_fkey`;

-- AlterTable
ALTER TABLE `points` DROP PRIMARY KEY,
    MODIFY `points_id` VARCHAR(191) NOT NULL,
    MODIFY `team_member_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`points_id`);

-- AlterTable
ALTER TABLE `team_members` DROP PRIMARY KEY,
    MODIFY `member_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`member_id`);

-- AddForeignKey
ALTER TABLE `Points` ADD CONSTRAINT `Points_team_member_id_fkey` FOREIGN KEY (`team_member_id`) REFERENCES `Team_Members`(`member_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
