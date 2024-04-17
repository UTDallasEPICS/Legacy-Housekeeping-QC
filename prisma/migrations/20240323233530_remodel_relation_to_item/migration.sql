/*
  Warnings:

  - The primary key for the `item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `personal_room_id` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `quantitative_id` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `room_id` on the `item` table. All the data in the column will be lost.
  - Added the required column `id` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_default` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_default` to the `Requirement` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `item` DROP FOREIGN KEY `Item_personal_room_id_fkey`;

-- DropForeignKey
ALTER TABLE `item` DROP FOREIGN KEY `Item_quantitative_id_fkey`;

-- DropForeignKey
ALTER TABLE `item` DROP FOREIGN KEY `Item_room_id_fkey`;

-- AlterTable
ALTER TABLE `item` DROP PRIMARY KEY,
    DROP COLUMN `personal_room_id`,
    DROP COLUMN `quantitative_id`,
    DROP COLUMN `room_id`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `is_default` BOOLEAN NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `requirement` ADD COLUMN `is_default` BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE `_ItemToRoom` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ItemToRoom_AB_unique`(`A`, `B`),
    INDEX `_ItemToRoom_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ItemToQuantitativeRubric` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ItemToQuantitativeRubric_AB_unique`(`A`, `B`),
    INDEX `_ItemToQuantitativeRubric_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ItemToRoom` ADD CONSTRAINT `_ItemToRoom_A_fkey` FOREIGN KEY (`A`) REFERENCES `Item`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ItemToRoom` ADD CONSTRAINT `_ItemToRoom_B_fkey` FOREIGN KEY (`B`) REFERENCES `Room`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ItemToQuantitativeRubric` ADD CONSTRAINT `_ItemToQuantitativeRubric_A_fkey` FOREIGN KEY (`A`) REFERENCES `Item`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ItemToQuantitativeRubric` ADD CONSTRAINT `_ItemToQuantitativeRubric_B_fkey` FOREIGN KEY (`B`) REFERENCES `QuantitativeRubric`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
