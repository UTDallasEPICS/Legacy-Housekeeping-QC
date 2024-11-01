-- CreateTable
CREATE TABLE `Person` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `country_code` VARCHAR(191) NULL,
    `state_code` VARCHAR(191) NULL,
    `phone_number` VARCHAR(191) NULL,
    `type` ENUM('USER', 'TEAM_MEMBER') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `person_id` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `User_person_id_key`(`person_id`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`person_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TeamMember` (
    `person_id` INTEGER NOT NULL,
    `email` VARCHAR(191) NULL,

    UNIQUE INDEX `TeamMember_person_id_key`(`person_id`),
    PRIMARY KEY (`person_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Score` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` INTEGER NOT NULL,
    `inspection_id` INTEGER NOT NULL,

    UNIQUE INDEX `Score_inspection_id_key`(`inspection_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Schedule` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `start_time` DATETIME(3) NULL,
    `end_time` DATETIME(3) NULL,
    `clean_type` ENUM('NORMAL', 'DEEP') NOT NULL DEFAULT 'NORMAL',
    `room_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Room` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `type` ENUM('COMMON_AREA', 'PERSONAL_ROOM') NOT NULL,
    `building_id` INTEGER NOT NULL,
    `floor_number` INTEGER NOT NULL,

    INDEX `Room_building_id_floor_number_idx`(`building_id`, `floor_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CommonArea` (
    `id` INTEGER NOT NULL,
    `room_id` INTEGER NOT NULL,

    UNIQUE INDEX `CommonArea_room_id_key`(`room_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PersonalRoom` (
    `id` INTEGER NOT NULL,
    `is_occupied` BOOLEAN NOT NULL,
    `room_id` INTEGER NOT NULL,

    UNIQUE INDEX `PersonalRoom_room_id_key`(`room_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Building` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `floor_count` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Inspection` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `timestamp` DATETIME(3) NULL,
    `room_pics` VARCHAR(191) NULL,
    `comment` VARCHAR(191) NULL,
    `inspect_status` ENUM('INSPECTED', 'NOT_INSPECTED', 'UNFINISHED') NOT NULL,
    `clean_status` ENUM('CLEANED', 'NOT_CLEANED', 'UNFINISHED') NULL,
    `extra_score` INTEGER NOT NULL DEFAULT 0,
    `inspector_id` INTEGER NOT NULL,
    `schedule_id` INTEGER NOT NULL,
    `rubric_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rubric` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('QUANTITATIVE', 'HOLLISTIC') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QuantitativeRubric` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rubric_id` INTEGER NOT NULL,

    UNIQUE INDEX `QuantitativeRubric_rubric_id_key`(`rubric_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `HollisticRubric` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rubric_id` INTEGER NOT NULL,

    UNIQUE INDEX `HollisticRubric_rubric_id_key`(`rubric_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Requirement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `is_checked` BOOLEAN NOT NULL,
    `weight` INTEGER NOT NULL DEFAULT 1,
    `hollistic_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `category` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `is_checked` BOOLEAN NOT NULL,
    `weight` INTEGER NOT NULL DEFAULT 1,
    `room_id` INTEGER NOT NULL,
    `quantitative_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ScoreToTeamMember` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ScoreToTeamMember_AB_unique`(`A`, `B`),
    INDEX `_ScoreToTeamMember_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ScheduleToTeamMember` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ScheduleToTeamMember_AB_unique`(`A`, `B`),
    INDEX `_ScheduleToTeamMember_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_person_id_fkey` FOREIGN KEY (`person_id`) REFERENCES `Person`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TeamMember` ADD CONSTRAINT `TeamMember_person_id_fkey` FOREIGN KEY (`person_id`) REFERENCES `Person`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Score` ADD CONSTRAINT `Score_inspection_id_fkey` FOREIGN KEY (`inspection_id`) REFERENCES `Inspection`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Schedule` ADD CONSTRAINT `Schedule_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_building_id_fkey` FOREIGN KEY (`building_id`) REFERENCES `Building`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CommonArea` ADD CONSTRAINT `CommonArea_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PersonalRoom` ADD CONSTRAINT `PersonalRoom_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inspection` ADD CONSTRAINT `Inspection_inspector_id_fkey` FOREIGN KEY (`inspector_id`) REFERENCES `User`(`person_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inspection` ADD CONSTRAINT `Inspection_schedule_id_fkey` FOREIGN KEY (`schedule_id`) REFERENCES `Schedule`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Inspection` ADD CONSTRAINT `Inspection_rubric_id_fkey` FOREIGN KEY (`rubric_id`) REFERENCES `Rubric`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `QuantitativeRubric` ADD CONSTRAINT `QuantitativeRubric_rubric_id_fkey` FOREIGN KEY (`rubric_id`) REFERENCES `Rubric`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `HollisticRubric` ADD CONSTRAINT `HollisticRubric_rubric_id_fkey` FOREIGN KEY (`rubric_id`) REFERENCES `Rubric`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Requirement` ADD CONSTRAINT `Requirement_hollistic_id_fkey` FOREIGN KEY (`hollistic_id`) REFERENCES `HollisticRubric`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_quantitative_id_fkey` FOREIGN KEY (`quantitative_id`) REFERENCES `QuantitativeRubric`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ScoreToTeamMember` ADD CONSTRAINT `_ScoreToTeamMember_A_fkey` FOREIGN KEY (`A`) REFERENCES `Score`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ScoreToTeamMember` ADD CONSTRAINT `_ScoreToTeamMember_B_fkey` FOREIGN KEY (`B`) REFERENCES `TeamMember`(`person_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ScheduleToTeamMember` ADD CONSTRAINT `_ScheduleToTeamMember_A_fkey` FOREIGN KEY (`A`) REFERENCES `Schedule`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ScheduleToTeamMember` ADD CONSTRAINT `_ScheduleToTeamMember_B_fkey` FOREIGN KEY (`B`) REFERENCES `TeamMember`(`person_id`) ON DELETE CASCADE ON UPDATE CASCADE;
