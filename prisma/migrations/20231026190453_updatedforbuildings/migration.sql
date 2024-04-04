/*
  Warnings:

  - A unique constraint covering the columns `[building_name]` on the table `Building` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Building_building_name_key` ON `Building`(`building_name`);
