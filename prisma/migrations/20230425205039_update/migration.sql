/*
  Warnings:

  - You are about to alter the column `building_number` on the `room` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropIndex
DROP INDEX `Admin_userId_fkey` ON `admin`;

-- DropIndex
DROP INDEX `Items_ancillary_id_fkey` ON `items`;

-- DropIndex
DROP INDEX `Items_assisted_id_fkey` ON `items`;

-- DropIndex
DROP INDEX `Items_independent_id_fkey` ON `items`;

-- DropIndex
DROP INDEX `Items_memory_id_fkey` ON `items`;

-- DropIndex
DROP INDEX `Items_restroom_id_fkey` ON `items`;

-- DropIndex
DROP INDEX `Items_skilled_id_fkey` ON `items`;

-- DropIndex
DROP INDEX `Leader_userId_fkey` ON `leader`;

-- DropIndex
DROP INDEX `Points_team_member_id_fkey` ON `points`;

-- DropIndex
DROP INDEX `Restrooms_room_id_fkey` ON `restrooms`;

-- DropIndex
DROP INDEX `RoomReport_room_id_fkey` ON `roomreport`;

-- AlterTable
ALTER TABLE `room` MODIFY `building_number` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Admin` ADD CONSTRAINT `Admin_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Leader` ADD CONSTRAINT `Leader_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Points` ADD CONSTRAINT `Points_team_member_id_fkey` FOREIGN KEY (`team_member_id`) REFERENCES `TeamMembers`(`member_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoomReport` ADD CONSTRAINT `RoomReport_team_member_id_fkey` FOREIGN KEY (`team_member_id`) REFERENCES `TeamMembers`(`member_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RoomReport` ADD CONSTRAINT `RoomReport_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `Room`(`room_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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
