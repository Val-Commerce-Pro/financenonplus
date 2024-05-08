-- CreateTable
CREATE TABLE `ShopPluginConfig` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `apiUsername` VARCHAR(191) NOT NULL,
    `verndorId` VARCHAR(191) NOT NULL,
    `clientId` VARCHAR(191) NOT NULL,
    `shop` VARCHAR(191) NOT NULL,
    `apiKey` VARCHAR(191) NOT NULL,
    `passwort` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ShopPluginConfig_shop_key`(`shop`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
