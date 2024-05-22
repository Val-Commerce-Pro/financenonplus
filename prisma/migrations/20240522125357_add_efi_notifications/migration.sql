-- CreateTable
CREATE TABLE `ConsorsEfiNotifications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `draftOrderId` VARCHAR(191) NOT NULL,
    `draftOrderName` VARCHAR(191) NULL,
    `orderId` VARCHAR(191) NOT NULL,
    `orderName` VARCHAR(191) NULL,
    `transactionId` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `statusDetail` VARCHAR(191) NOT NULL,
    `campaign` VARCHAR(191) NOT NULL,
    `creditAmount` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ConsorsEfiNotifications_draftOrderId_key`(`draftOrderId`),
    UNIQUE INDEX `ConsorsEfiNotifications_orderId_key`(`orderId`),
    UNIQUE INDEX `ConsorsEfiNotifications_transactionId_key`(`transactionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
