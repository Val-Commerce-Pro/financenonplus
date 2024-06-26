-- CreateTable
CREATE TABLE `ShopPluginConfigurator` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `shop` VARCHAR(191) NOT NULL,
    `appMode` BOOLEAN NOT NULL DEFAULT false,
    `minOrderValue` VARCHAR(191) NOT NULL,
    `period` VARCHAR(191) NOT NULL,
    `campaign` VARCHAR(191) NOT NULL,
    `interestRate` VARCHAR(191) NOT NULL,
    `campaignDuration` VARCHAR(191) NOT NULL,
    `minPeriod` VARCHAR(191) NOT NULL,
    `stepPeriod` VARCHAR(191) NOT NULL,
    `shopCredentialsId` INTEGER NOT NULL,

    UNIQUE INDEX `ShopPluginConfigurator_shop_key`(`shop`),
    UNIQUE INDEX `ShopPluginConfigurator_shopCredentialsId_key`(`shopCredentialsId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ShopPluginConfigurator` ADD CONSTRAINT `ShopPluginConfigurator_shopCredentialsId_fkey` FOREIGN KEY (`shopCredentialsId`) REFERENCES `ShopPluginCredentials`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
