/*
  Warnings:

  - You are about to drop the column `apiUsername` on the `ShopPluginConfig` table. All the data in the column will be lost.
  - You are about to drop the column `verndorId` on the `ShopPluginConfig` table. All the data in the column will be lost.
  - Added the required column `hash` to the `ShopPluginConfig` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `ShopPluginConfig` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vendorId` to the `ShopPluginConfig` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ShopPluginConfig` DROP COLUMN `apiUsername`,
    DROP COLUMN `verndorId`,
    ADD COLUMN `appMode` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `hash` VARCHAR(191) NOT NULL,
    ADD COLUMN `username` VARCHAR(191) NOT NULL,
    ADD COLUMN `vendorId` VARCHAR(191) NOT NULL;
