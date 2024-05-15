import type { ShopPluginConfigData } from "~/types/databaseInterfaces";
import db from "../db.server";

export async function updateShopPluginConfig(
  data: Partial<ShopPluginConfigData>,
) {
  if (!data.shop) return { error: "Shop not found" };
  try {
    const updatedShopPluginConfig = await db.shopPluginConfig.update({
      where: { shop: data.shop },
      data,
    });
    return updatedShopPluginConfig;
  } catch (err) {
    console.error(err);
  }
}

export async function createOrUpdateShopPluginConfig(
  data: ShopPluginConfigData,
) {
  try {
    const existingShop = await db.shopPluginConfig.findUnique({
      where: { shop: data.shop },
    });
    console.log("existingShop", existingShop);
    if (!existingShop) {
      const settings = await db.shopPluginConfig.create({ data });
      return settings;
    }
    const updatedShopPluginData = await updateShopPluginConfig(data);
    return updatedShopPluginData;
  } catch (err) {
    console.error("err", err);
  }
}

export async function getShopPluginConfig(shop: ShopPluginConfigData["shop"]) {
  try {
    const shopPluginConfig = await db.shopPluginConfig.findUnique({
      where: { shop },
    });
    return shopPluginConfig;
  } catch (err) {
    console.error(err);
  }
}
