/*
  Warnings:

  - A unique constraint covering the columns `[member_id]` on the table `Team_Members` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Team_Members_member_id_key` ON `Team_Members`(`member_id`);
