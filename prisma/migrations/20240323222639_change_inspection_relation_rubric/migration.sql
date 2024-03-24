/*
  Warnings:

  - You are about to drop the `_inspectiontorubric` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `rubric_id` to the `Inspection` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_inspectiontorubric` DROP FOREIGN KEY `_InspectionToRubric_A_fkey`;

-- DropForeignKey
ALTER TABLE `_inspectiontorubric` DROP FOREIGN KEY `_InspectionToRubric_B_fkey`;

-- AlterTable
ALTER TABLE `inspection` ADD COLUMN `rubric_id` INTEGER NOT NULL;

-- DropTable
DROP TABLE `_inspectiontorubric`;

-- AddForeignKey
ALTER TABLE `Inspection` ADD CONSTRAINT `Inspection_rubric_id_fkey` FOREIGN KEY (`rubric_id`) REFERENCES `Rubric`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
