/*
  Warnings:

  - You are about to drop the `_scheduletoteammembers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `teammembers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_scheduletoteammembers` DROP FOREIGN KEY `_ScheduleToTeamMembers_A_fkey`;

-- DropForeignKey
ALTER TABLE `_scheduletoteammembers` DROP FOREIGN KEY `_ScheduleToTeamMembers_B_fkey`;

-- DropForeignKey
ALTER TABLE `score` DROP FOREIGN KEY `Score_team_member_id_fkey`;

-- DropForeignKey
ALTER TABLE `teammembers` DROP FOREIGN KEY `TeamMembers_person_id_fkey`;

-- DropTable
DROP TABLE `_scheduletoteammembers`;

-- DropTable
DROP TABLE `teammembers`;

-- CreateTable
CREATE TABLE `TeamMember` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `person_id` INTEGER NOT NULL,

    UNIQUE INDEX `TeamMember_person_id_key`(`person_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ScheduleToTeamMember` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ScheduleToTeamMember_AB_unique`(`A`, `B`),
    INDEX `_ScheduleToTeamMember_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TeamMember` ADD CONSTRAINT `TeamMember_person_id_fkey` FOREIGN KEY (`person_id`) REFERENCES `Person`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Score` ADD CONSTRAINT `Score_team_member_id_fkey` FOREIGN KEY (`team_member_id`) REFERENCES `TeamMember`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ScheduleToTeamMember` ADD CONSTRAINT `_ScheduleToTeamMember_A_fkey` FOREIGN KEY (`A`) REFERENCES `Schedule`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ScheduleToTeamMember` ADD CONSTRAINT `_ScheduleToTeamMember_B_fkey` FOREIGN KEY (`B`) REFERENCES `TeamMember`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
