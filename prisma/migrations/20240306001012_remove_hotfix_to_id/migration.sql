-- CreateTable
CREATE TABLE `_ScheduleToTeamMember` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ScheduleToTeamMember_AB_unique`(`A`, `B`),
    INDEX `_ScheduleToTeamMember_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ScheduleToTeamMember` ADD CONSTRAINT `_ScheduleToTeamMember_A_fkey` FOREIGN KEY (`A`) REFERENCES `Schedule`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ScheduleToTeamMember` ADD CONSTRAINT `_ScheduleToTeamMember_B_fkey` FOREIGN KEY (`B`) REFERENCES `TeamMember`(`person_id`) ON DELETE CASCADE ON UPDATE CASCADE;
