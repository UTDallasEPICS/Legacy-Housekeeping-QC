-- DropForeignKey
ALTER TABLE `admin` DROP FOREIGN KEY `Admin_userId_fkey`;

-- DropForeignKey
ALTER TABLE `items` DROP FOREIGN KEY `Items_ancillary_id_fkey`;

-- DropForeignKey
ALTER TABLE `items` DROP FOREIGN KEY `Items_assisted_id_fkey`;

-- DropForeignKey
ALTER TABLE `items` DROP FOREIGN KEY `Items_independent_id_fkey`;

-- DropForeignKey
ALTER TABLE `items` DROP FOREIGN KEY `Items_memory_id_fkey`;

-- DropForeignKey
ALTER TABLE `items` DROP FOREIGN KEY `Items_restroom_id_fkey`;

-- DropForeignKey
ALTER TABLE `items` DROP FOREIGN KEY `Items_skilled_id_fkey`;

-- DropForeignKey
ALTER TABLE `leader` DROP FOREIGN KEY `Leader_userId_fkey`;

-- DropForeignKey
ALTER TABLE `points` DROP FOREIGN KEY `Points_team_member_id_fkey`;

-- DropForeignKey
ALTER TABLE `restrooms` DROP FOREIGN KEY `Restrooms_room_id_fkey`;

-- DropForeignKey
ALTER TABLE `roomreport` DROP FOREIGN KEY `RoomReport_room_id_fkey`;

-- DropForeignKey
ALTER TABLE `roomreport` DROP FOREIGN KEY `RoomReport_team_member_id_fkey`;

-- AlterTable
ALTER TABLE `room` MODIFY `building_number` VARCHAR(191) NOT NULL;
