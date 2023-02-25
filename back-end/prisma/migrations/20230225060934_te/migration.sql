/*
  Warnings:

  - The primary key for the `points` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `points_id` on the `points` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the `_pointstoteam_members` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `team_member_id` to the `Points` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_pointstoteam_members` DROP FOREIGN KEY `_PointsToTeam_Members_A_fkey`;

-- DropForeignKey
ALTER TABLE `_pointstoteam_members` DROP FOREIGN KEY `_PointsToTeam_Members_B_fkey`;

-- AlterTable
ALTER TABLE `points` DROP PRIMARY KEY,
    ADD COLUMN `team_member_id` INTEGER NOT NULL,
    MODIFY `points_id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`points_id`);

-- DropTable
DROP TABLE `_pointstoteam_members`;

-- AddForeignKey
ALTER TABLE `Points` ADD CONSTRAINT `Points_team_member_id_fkey` FOREIGN KEY (`team_member_id`) REFERENCES `Team_Members`(`member_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
