import type {
  ShopPluginConfigurator,
  ShopPluginCredentials,
} from "@prisma/client";

export type ShopPluginCredentialsData = Omit<ShopPluginCredentials, "id">;
export type ShopPluginConfiguratorData = Omit<
  ShopPluginConfigurator,
  "id" | "ShopPluginCredentials"
>;
