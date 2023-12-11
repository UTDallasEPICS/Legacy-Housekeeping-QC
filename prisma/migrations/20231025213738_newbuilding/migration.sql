/*
  Warnings:

  - Added the required column `building_id` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `room` ADD COLUMN `building_id` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `Building` (
    `id` VARCHAR(191) NOT NULL,
    `building_name` VARCHAR(191) NOT NULL,
    `floors_amount` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_building_id_fkey` FOREIGN KEY (`building_id`) REFERENCES `Building`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
