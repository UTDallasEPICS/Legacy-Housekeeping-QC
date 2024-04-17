/*
  Warnings:

  - You are about to drop the column `team_member_id` on the `score` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `score` DROP FOREIGN KEY `Score_team_member_id_fkey`;

-- AlterTable
ALTER TABLE `score` DROP COLUMN `team_member_id`;

-- CreateTable
CREATE TABLE `_ScoreToTeamMember` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ScoreToTeamMember_AB_unique`(`A`, `B`),
    INDEX `_ScoreToTeamMember_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ScoreToTeamMember` ADD CONSTRAINT `_ScoreToTeamMember_A_fkey` FOREIGN KEY (`A`) REFERENCES `Score`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ScoreToTeamMember` ADD CONSTRAINT `_ScoreToTeamMember_B_fkey` FOREIGN KEY (`B`) REFERENCES `TeamMember`(`person_id`) ON DELETE CASCADE ON UPDATE CASCADE;
