import type { ShopPluginCredentialsData } from "~/types/databaseInterfaces";
import db from "../db.server";

export async function updateShopPluginCredentials(
  data: Partial<ShopPluginCredentialsData>,
) {
  if (!data.shop) return { error: "Shop not found" };
  try {
    const updatedShopPluginCredentials = await db.shopPluginCredentials.update({
      where: { shop: data.shop },
      data,
    });
    return updatedShopPluginCredentials;
  } catch (err) {
    console.error(err);
  }
}

export async function createOrUpdateShopPluginCredentials(
  data: ShopPluginCredentialsData,
) {
  try {
    const existingShop = await db.shopPluginCredentials.findUnique({
      where: { shop: data.shop },
    });

    if (!existingShop) {
      const settings = await db.shopPluginCredentials.create({ data });
      return settings;
    }

    const updatedShopPluginData = await updateShopPluginCredentials(data);
    return updatedShopPluginData;
  } catch (err) {
    console.error("err", err);
  }
}

export async function getShopPluginConfig(
  shop: ShopPluginCredentialsData["shop"],
) {
  try {
    const shopPluginConfig = await db.shopPluginCredentials.findUnique({
      where: { shop },
      include: {
        ShopPluginConfigurator: true,
      },
    });
    return shopPluginConfig;
  } catch (err) {
    console.error(err);
  }
}
