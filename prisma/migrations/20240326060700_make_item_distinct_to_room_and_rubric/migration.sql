/*
  Warnings:

  - You are about to drop the column `is_default` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `item_name` on the `item` table. All the data in the column will be lost.
  - You are about to drop the `_itemtoquantitativerubric` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_itemtoroom` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `is_checked` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantitative_id` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room_id` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_checked` to the `Requirement` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_itemtoquantitativerubric` DROP FOREIGN KEY `_ItemToQuantitativeRubric_A_fkey`;

-- DropForeignKey
ALTER TABLE `_itemtoquantitativerubric` DROP FOREIGN KEY `_ItemToQuantitativeRubric_B_fkey`;

-- DropForeignKey
ALTER TABLE `_itemtoroom` DROP FOREIGN KEY `_ItemToRoom_A_fkey`;

-- DropForeignKey
ALTER TABLE `_itemtoroom` DROP FOREIGN KEY `_ItemToRoom_B_fkey`;

-- AlterTable
ALTER TABLE `item` DROP COLUMN `is_default`,
    DROP COLUMN `item_name`,
    ADD COLUMN `is_checked` BOOLEAN NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `quantitative_id` INTEGER NOT NULL,
    ADD COLUMN `room_id` INTEGER NOT NULL,
    ADD COLUMN `weight` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `requirement` ADD COLUMN `is_checked` BOOLEAN NOT NULL;

-- DropTable
DROP TABLE `_itemtoquantitativerubric`;

-- DropTable
DROP TABLE `_itemtoroom`;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_room_id_fkey` FOREIGN KEY (`room_id`) REFERENCES `Room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_quantitative_id_fkey` FOREIGN KEY (`quantitative_id`) REFERENCES `QuantitativeRubric`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
