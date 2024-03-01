-- AlterTable
ALTER TABLE `inspection` ADD COLUMN `inspect_status` ENUM('INSPECTED', 'NOT_INSPECTED', 'UNFINISHED') NULL,
    MODIFY `timestamp` DATETIME(3) NULL,
    MODIFY `score` INTEGER NULL;
