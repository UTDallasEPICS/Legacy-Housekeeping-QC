/*
  Warnings:

  - You are about to drop the column `score` on the `inspection` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[inspection_id]` on the table `Score` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `inspection_id` to the `Score` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `inspection` DROP COLUMN `score`,
    ADD COLUMN `extra_score` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `score` ADD COLUMN `inspection_id` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Score_inspection_id_key` ON `Score`(`inspection_id`);

-- AddForeignKey
ALTER TABLE `Score` ADD CONSTRAINT `Score_inspection_id_fkey` FOREIGN KEY (`inspection_id`) REFERENCES `Inspection`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
