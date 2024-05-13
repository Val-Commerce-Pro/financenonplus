import type { ShopPluginConfig } from "@prisma/client";

export type ShopPluginConfigData = Omit<ShopPluginConfig, "id">;
