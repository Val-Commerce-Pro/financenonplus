// import type { ShopPluginConfig } from "@prisma/client";
import db from "../db.server";

export async function createShopPluginConfig() {
  /** @type {any} */

  const data = {
    username: "1pstest",
    vendorId: "8403",
    clientId: "8403",
    // laufzeiten: "12,24,6",
    // zeroMonth: "12",
    // zinsSaetze: "9.0,9.3,9.5",
    // aktionszins: 1,
    // minBestellWert: 11000,
    shop: "financenonplus.myshopify.com",
    // hash: "1234567890",
    apiKey: "e93c8c99-34ae-4f96-9a3b-8d761c99f013",
    passwort: "",
    // paymentHandle: "",
  };

  const Settings = await db.shopPluginConfig.create({ data });

  if (!Settings) {
    return null;
  }
  return Settings;
}
