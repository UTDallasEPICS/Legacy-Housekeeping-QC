/*
  Warnings:

  - You are about to drop the column `team_member_id` on the `points` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `points` DROP FOREIGN KEY `Points_team_member_id_fkey`;

-- AlterTable
ALTER TABLE `points` DROP COLUMN `team_member_id`;

-- CreateTable
CREATE TABLE `_PointsToTeam_Members` (
    `A` VARCHAR(191) NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PointsToTeam_Members_AB_unique`(`A`, `B`),
    INDEX `_PointsToTeam_Members_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_PointsToTeam_Members` ADD CONSTRAINT `_PointsToTeam_Members_A_fkey` FOREIGN KEY (`A`) REFERENCES `Points`(`points_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PointsToTeam_Members` ADD CONSTRAINT `_PointsToTeam_Members_B_fkey` FOREIGN KEY (`B`) REFERENCES `Team_Members`(`member_id`) ON DELETE CASCADE ON UPDATE CASCADE;
