/*
  Warnings:

  - You are about to drop the `Maneger` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `managerId` to the `Worker` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Worker` ADD COLUMN `managerId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `Maneger`;

-- CreateTable
CREATE TABLE `Manager` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `wage` DECIMAL(65, 30) NOT NULL,
    `defaultStartTime` VARCHAR(191) NOT NULL,
    `defaultEndTime` VARCHAR(191) NOT NULL,
    `weekendStartTime` VARCHAR(191) NOT NULL,
    `weekendEndTime` VARCHAR(191) NOT NULL,
    `holidayStartTime` VARCHAR(191) NOT NULL,
    `holidayEndTime` VARCHAR(191) NOT NULL,
    `closedDays` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Worker` ADD CONSTRAINT `Worker_managerId_fkey` FOREIGN KEY (`managerId`) REFERENCES `Manager`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
