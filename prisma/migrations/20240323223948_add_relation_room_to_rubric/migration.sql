/*
  Warnings:

  - A unique constraint covering the columns `[rubric_id]` on the table `Room` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rubric_id` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `room` ADD COLUMN `rubric_id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Room_rubric_id_key` ON `Room`(`rubric_id`);

-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_rubric_id_fkey` FOREIGN KEY (`rubric_id`) REFERENCES `Rubric`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
