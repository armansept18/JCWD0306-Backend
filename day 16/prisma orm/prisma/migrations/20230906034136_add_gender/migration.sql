-- AlterTable
ALTER TABLE `user` ADD COLUMN `gender` ENUM('male', 'female') NOT NULL DEFAULT 'male';
