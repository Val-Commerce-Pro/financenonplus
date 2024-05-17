-- CreateTable
CREATE TABLE `ShopPluginConfigurator` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shop` VARCHAR(191) NOT NULL,
    `appMode` BOOLEAN NOT NULL DEFAULT false,
    `minOrderValue` INTEGER NOT NULL DEFAULT 100,
    `terms` VARCHAR(191) NOT NULL,
    `zeroPercent` VARCHAR(191) NOT NULL,
    `interestRate` VARCHAR(191) NOT NULL,
    `promotionalInterestRate` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `ShopPluginConfigurator_shop_key`(`shop`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ShopPluginConfigurator` ADD CONSTRAINT `ShopPluginConfigurator_shop_fkey` FOREIGN KEY (`shop`) REFERENCES `ShopPluginCredentials`(`shop`) ON DELETE RESTRICT ON UPDATE CASCADE;
