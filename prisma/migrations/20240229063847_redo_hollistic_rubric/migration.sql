/*
  Warnings:

  - You are about to drop the column `hollistic_id` on the `hollisticrubric` table. All the data in the column will be lost.
  - You are about to drop the column `rubric_id` on the `requirement` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[rubric_id]` on the table `HollisticRubric` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rubric_id` to the `HollisticRubric` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hollistic_id` to the `Requirement` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `hollisticrubric` DROP FOREIGN KEY `HollisticRubric_hollistic_id_fkey`;

-- DropForeignKey
ALTER TABLE `requirement` DROP FOREIGN KEY `Requirement_rubric_id_fkey`;

-- AlterTable
ALTER TABLE `hollisticrubric` DROP COLUMN `hollistic_id`,
    ADD COLUMN `rubric_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `requirement` DROP COLUMN `rubric_id`,
    ADD COLUMN `hollistic_id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `HollisticRubric_rubric_id_key` ON `HollisticRubric`(`rubric_id`);

-- AddForeignKey
ALTER TABLE `HollisticRubric` ADD CONSTRAINT `HollisticRubric_rubric_id_fkey` FOREIGN KEY (`rubric_id`) REFERENCES `Rubric`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Requirement` ADD CONSTRAINT `Requirement_hollistic_id_fkey` FOREIGN KEY (`hollistic_id`) REFERENCES `HollisticRubric`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
