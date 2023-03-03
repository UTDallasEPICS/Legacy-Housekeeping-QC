-- CreateTable
CREATE TABLE `User` (
    `user_id` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin` (
    `admin_id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`admin_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Leader` (
    `leader_id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`leader_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TeamMembers` (
    `member_id` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`member_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Points` (
    `points_id` VARCHAR(191) NOT NULL,
    `points` INTEGER NOT NULL,
    `time_stamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `team_member_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`points_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Room` (
    `room_id` VARCHAR(191) NOT NULL,
    `time_stamp` DATETIME(3) NOT NULL,
    `room_number` VARCHAR(191) NOT NULL,
    `building_number` INTEGER NOT NULL,
    `is_clean` BOOLEAN NOT NULL,
    `is_active` BOOLEAN NOT NULL,
    `type_of_room` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`room_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RoomsOnTeamMembers` (
    `team_member_id` VARCHAR(191) NOT NULL,
    `room_id` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `cleaned` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`team_member_id`, `room_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Items` (
    `item_id` VARCHAR(191) NOT NULL,
    `item` VARCHAR(191) NOT NULL,
    `restroom_id` VARCHAR(191) NOT NULL,
    `ancillary_id` VARCHAR(191) NOT NULL,
    `independent_id` VARCHAR(191) NOT NULL,
    `assisted_id` VARCHAR(191) NOT NULL,
    `skilled_id` VARCHAR(191) NOT NULL,
    `memory_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`item_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Restrooms` (
    `restroom_id` VARCHAR(191) NOT NULL,
    `room_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`restroom_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ancillary_Areas` (
    `ancillary_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ancillary_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Independent_Living` (
    `independent_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`independent_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Assisted_Living` (
    `assisted_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`assisted_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Skilled` (
    `skilled_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`skilled_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Memory` (
    `memory_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`memory_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Admin` ADD CONSTRAINT `Admin_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Leader` ADD CONSTRAINT `Leader_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Points` ADD CONSTRAINT `Points_team_member_id_fkey` FOREIGN KEY (`team_member_id`) REFERENCES `TeamMembers`(`member_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoomsOnTeamMembers` ADD CONSTRAINT `RoomsOnTeamMembers_team_member_id_fkey` FOREIGN KEY (`team_member_id`) REFERENCES `TeamMembers`(`member_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoomsOnTeamMembers` ADD CONSTRAINT `RoomsOnTeamMembers_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `Room`(`room_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Items` ADD CONSTRAINT `Items_restroom_id_fkey` FOREIGN KEY (`restroom_id`) REFERENCES `Restrooms`(`restroom_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Items` ADD CONSTRAINT `Items_ancillary_id_fkey` FOREIGN KEY (`ancillary_id`) REFERENCES `Ancillary_Areas`(`ancillary_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Items` ADD CONSTRAINT `Items_independent_id_fkey` FOREIGN KEY (`independent_id`) REFERENCES `Independent_Living`(`independent_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Items` ADD CONSTRAINT `Items_assisted_id_fkey` FOREIGN KEY (`assisted_id`) REFERENCES `Assisted_Living`(`assisted_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Items` ADD CONSTRAINT `Items_skilled_id_fkey` FOREIGN KEY (`skilled_id`) REFERENCES `Skilled`(`skilled_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Items` ADD CONSTRAINT `Items_memory_id_fkey` FOREIGN KEY (`memory_id`) REFERENCES `Memory`(`memory_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Restrooms` ADD CONSTRAINT `Restrooms_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `Room`(`room_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
