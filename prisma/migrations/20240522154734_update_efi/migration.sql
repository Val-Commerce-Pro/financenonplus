/*
  Warnings:

  - A unique constraint covering the columns `[draftOrderName]` on the table `ConsorsEfiNotifications` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[orderName]` on the table `ConsorsEfiNotifications` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `ConsorsEfiNotifications_draftOrderName_key` ON `ConsorsEfiNotifications`(`draftOrderName`);

-- CreateIndex
CREATE UNIQUE INDEX `ConsorsEfiNotifications_orderName_key` ON `ConsorsEfiNotifications`(`orderName`);
