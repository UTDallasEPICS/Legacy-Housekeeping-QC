-- AlterTable
ALTER TABLE `points` MODIFY `points` INTEGER NOT NULL DEFAULT 0,
    MODIFY `time_stamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
