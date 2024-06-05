-- CreateTable
CREATE TABLE `ConsorsEfiNotifications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shop` VARCHAR(191) NOT NULL,
    `consorsOrderId` VARCHAR(191) NOT NULL,
    `draftOrderId` VARCHAR(191) NOT NULL,
    `draftOrderName` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NULL,
    `orderName` VARCHAR(191) NULL,
    `transactionId` VARCHAR(191) NULL,
    `status` VARCHAR(191) NULL,
    `statusDetail` VARCHAR(191) NULL,
    `campaign` VARCHAR(191) NULL,
    `creditAmount` VARCHAR(191) NULL,

    UNIQUE INDEX `ConsorsEfiNotifications_consorsOrderId_key`(`consorsOrderId`),
    UNIQUE INDEX `ConsorsEfiNotifications_draftOrderId_key`(`draftOrderId`),
    UNIQUE INDEX `ConsorsEfiNotifications_draftOrderName_key`(`draftOrderName`),
    UNIQUE INDEX `ConsorsEfiNotifications_orderId_key`(`orderId`),
    UNIQUE INDEX `ConsorsEfiNotifications_orderName_key`(`orderName`),
    UNIQUE INDEX `ConsorsEfiNotifications_transactionId_key`(`transactionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
