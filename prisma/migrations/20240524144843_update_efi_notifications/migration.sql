/*
  Warnings:

  - A unique constraint covering the columns `[consorsOrderId]` on the table `ConsorsEfiNotifications` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `consorsOrderId` to the `ConsorsEfiNotifications` table without a default value. This is not possible if the table is not empty.
  - Made the column `draftOrderId` on table `ConsorsEfiNotifications` required. This step will fail if there are existing NULL values in that column.
  - Made the column `draftOrderName` on table `ConsorsEfiNotifications` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `ConsorsEfiNotifications` ADD COLUMN `consorsOrderId` VARCHAR(191) NOT NULL,
    MODIFY `draftOrderId` VARCHAR(191) NOT NULL,
    MODIFY `draftOrderName` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `ConsorsEfiNotifications_consorsOrderId_key` ON `ConsorsEfiNotifications`(`consorsOrderId`);
