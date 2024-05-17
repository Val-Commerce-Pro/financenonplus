-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `shop` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `isOnline` BOOLEAN NOT NULL DEFAULT false,
    `scope` VARCHAR(191) NULL,
    `expires` DATETIME(3) NULL,
    `accessToken` VARCHAR(191) NOT NULL,
    `userId` BIGINT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ShopPluginCredentials` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shop` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `vendorId` VARCHAR(191) NOT NULL,
    `clientId` VARCHAR(191) NOT NULL,
    `apiKey` VARCHAR(191) NOT NULL,
    `passwort` VARCHAR(191) NOT NULL,
    `hash` VARCHAR(191) NOT NULL,
    `appMode` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `ShopPluginCredentials_shop_key`(`shop`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
