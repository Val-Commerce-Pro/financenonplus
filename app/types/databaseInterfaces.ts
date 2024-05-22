import type {
  ConsorsEfiNotifications,
  ShopPluginConfigurator,
  ShopPluginCredentials,
} from "@prisma/client";

export type ShopPluginCredentialsData = Omit<ShopPluginCredentials, "id">;
export type ShopPluginConfiguratorData = Omit<
  ShopPluginConfigurator,
  "id" | "shopCredentialsId"
>;
export type ConsorsEfiNotificationsData = Omit<ConsorsEfiNotifications, "id">;
