/*
  Warnings:

  - A unique constraint covering the columns `[points_id]` on the table `Points` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Points_points_id_key` ON `Points`(`points_id`);
