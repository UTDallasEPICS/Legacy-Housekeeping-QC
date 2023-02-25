/*
  Warnings:

  - You are about to drop the column `points` on the `team_members` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Leader` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `admin` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `leader` ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `team_members` DROP COLUMN `points`;

-- CreateTable
CREATE TABLE `Points` (
    `points_id` VARCHAR(191) NOT NULL,
    `points` INTEGER NOT NULL,
    `time_stamp` DATETIME(3) NOT NULL,
    `team_member_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Points_team_member_id_key`(`team_member_id`),
    PRIMARY KEY (`points_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Admin` ADD CONSTRAINT `Admin_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Leader` ADD CONSTRAINT `Leader_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Points` ADD CONSTRAINT `Points_team_member_id_fkey` FOREIGN KEY (`team_member_id`) REFERENCES `Team_Members`(`member_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
