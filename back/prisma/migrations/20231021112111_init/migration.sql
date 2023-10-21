/*
  Warnings:

  - You are about to drop the column `totalWorkTime` on the `Worker` table. All the data in the column will be lost.
  - You are about to drop the `WorkTime` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `WorkTime` DROP FOREIGN KEY `WorkTime_workerId_fkey`;

-- AlterTable
ALTER TABLE `Worker` DROP COLUMN `totalWorkTime`;

-- DropTable
DROP TABLE `WorkTime`;

-- CreateTable
CREATE TABLE `DefaultWorkTime` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `workDay` VARCHAR(191) NOT NULL,
    `startTime` VARCHAR(191) NOT NULL,
    `endTime` VARCHAR(191) NOT NULL,
    `workerId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RealWorkTime` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `workDay` DATETIME(3) NOT NULL,
    `startTime` VARCHAR(191) NOT NULL,
    `endTime` VARCHAR(191) NOT NULL,
    `workerId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `DefaultWorkTime` ADD CONSTRAINT `DefaultWorkTime_workerId_fkey` FOREIGN KEY (`workerId`) REFERENCES `Worker`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RealWorkTime` ADD CONSTRAINT `RealWorkTime_workerId_fkey` FOREIGN KEY (`workerId`) REFERENCES `Worker`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
