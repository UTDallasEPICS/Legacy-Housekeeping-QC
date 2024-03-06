-- AddForeignKey
ALTER TABLE `Room` ADD CONSTRAINT `Room_building_id_fkey` FOREIGN KEY (`building_id`) REFERENCES `Building`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
