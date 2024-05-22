import type {
  ShopPluginConfiguratorData,
  ShopPluginCredentialsData,
} from "~/types/databaseInterfaces";
import db from "../db.server";

export async function updateShopPluginConfigurator(
  data: Partial<ShopPluginConfiguratorData>,
) {
  if (!data.shop) return { error: "Shop not found" };
  try {
    const existingCredentials = await db.shopPluginCredentials.findUnique({
      where: { shop: data.shop },
    });

    if (!existingCredentials) {
      return { error: "Shop plugin credentials not found" };
    }

    const updatedConfigurator = await db.shopPluginConfigurator.update({
      where: { shop: data.shop },
      data: {
        ...data,
        shopCredentialsId: existingCredentials.id,
      },
    });
    return updatedConfigurator;
  } catch (err) {
    console.error("Error updating shop plugin configurator:", err);
    return { error: "Failed to update shop plugin configurator" };
  }
}

export async function createOrUpdateShopPluginConfigurator(
  data: ShopPluginConfiguratorData,
) {
  try {
    const existingCredentials = await db.shopPluginCredentials.findUnique({
      where: { shop: data.shop },
      include: {
        ShopPluginConfigurator: true,
      },
    });

    if (!existingCredentials) {
      return { error: "Shop plugin credentials not found" };
    }

    if (!existingCredentials.ShopPluginConfigurator) {
      const newConfigurator = await db.shopPluginConfigurator.create({
        data: {
          ...data,
          ShopPluginCredentials: { connect: { id: existingCredentials.id } },
        },
      });
      return newConfigurator;
    }

    const updatedConfigurator = await updateShopPluginConfigurator(data);
    return updatedConfigurator;
  } catch (err) {
    console.error("Error in create Or Update Shop Plugin Configurator:", err);
    throw new Error("Failed to create or update shop plugin configurator");
  }
}

export const getShopPluginConfigurator = async (
  shop: ShopPluginCredentialsData["shop"],
) => {
  try {
    const pluginData = await db.shopPluginCredentials.findUnique({
      where: { shop },
      include: {
        ShopPluginConfigurator: true,
      },
    });
    if (!pluginData?.ShopPluginConfigurator)
      return { error: "Shop plugin configurator not found" };

    return pluginData.ShopPluginConfigurator;
  } catch (err) {
    console.error("Error in createOrUpdateShopPluginConfigurator:", err);
    throw new Error("Failed to create or update shop plugin configurator");
  }
};
