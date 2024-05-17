-- CreateTable
CREATE TABLE `ConsorsEfiNotifications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `order_id` VARCHAR(191) NOT NULL,
    `transaction_id` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `status_detail` VARCHAR(191) NOT NULL,
    `campaign` VARCHAR(191) NOT NULL,
    `creditAmount` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ConsorsEfiNotifications_order_id_key`(`order_id`),
    UNIQUE INDEX `ConsorsEfiNotifications_transaction_id_key`(`transaction_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
