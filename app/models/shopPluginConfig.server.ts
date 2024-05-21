import type {
  ShopPluginConfiguratorData,
  ShopPluginCredentialsData,
} from "~/types/databaseInterfaces";
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

export async function updateShopPluginConfigurator(
  data: Partial<ShopPluginConfiguratorData>,
) {
  if (!data.shop) return { error: "Shop not found" };
  try {
    const updatedShopPluginConfigurator =
      await db.shopPluginConfigurator.update({
        where: { shop: data.shop },
        data,
      });
    return updatedShopPluginConfigurator;
  } catch (err) {
    console.error(err);
  }
}

export async function createOrUpdateShopPluginCredentials(
  data: ShopPluginCredentialsData,
) {
  console.log("Data to create credentials", data)
  console.log("Data to create credentials ... ", {...data})
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

// export async function createOrUpdateShopPluginConfigurator(
//   data: ShopPluginConfiguratorData,
// ) {
//   const { shop } = data;
//   try {
//     const existingShop = await db.shopPluginCredentials.findUnique({
//       where: { shop },
//     });

//     if (!existingShop) return { error: "Credentials not found for the shop" };

//     const existingConfigurator = await db.shopPluginConfigurator.findUnique({
//       where: { shop },
//     });

//     const configuratorData = {
//       appMode: data.appMode,
//       minOrderValue: data.minOrderValue,
//       terms: data.terms,
//       zeroPercent: data.zeroPercent,
//       interestRate: data.interestRate,
//       promotionalInterestRate: data.promotionalInterestRate,
//       shop, // Ensure shop field is correctly handled
//     };

//     if (!existingConfigurator) {
//       const configurator = await db.shopPluginConfigurator.create({
//         data: {
//           ...configuratorData,
//           ShopPluginCredentials: {
//             connect: { shop },
//           },
//         },
//       });
//       return configurator;
//     }

//     const updatedConfigurator = await updateShopPluginConfigurator(data);
//     return updatedConfigurator;
//   } catch (err) {
//     console.error("err", err);
//   }
// }

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
