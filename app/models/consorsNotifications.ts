import type { ConsorsEfiNotificationsData } from "~/types/databaseInterfaces";
import db from "../db.server";

export async function updateEfiNotifications(
  data: Partial<ConsorsEfiNotificationsData>,
) {
  if (!data.consorsOrderId) return { error: "ConsorsOrderId not found" };
  try {
    const updatedEfiNotifications = await db.consorsEfiNotifications.update({
      where: { consorsOrderId: data.consorsOrderId },
      data,
    });
    return updatedEfiNotifications;
  } catch (err) {
    console.error(err);
  }
}

export async function createEfiNotifications(
  data: ConsorsEfiNotificationsData,
) {
  try {
    const existingShop = await db.consorsEfiNotifications.findUnique({
      where: { consorsOrderId: data.consorsOrderId },
    });

    if (existingShop)
      return {
        error: `This ID already exists into the database BD message - ${existingShop}`,
      };

    const settings = await db.consorsEfiNotifications.create({ data });
    return settings;
  } catch (err) {
    console.error("err createEfiNotifications", err);
  }
}

export async function getEfiNotifications(
  consorsOrderId: ConsorsEfiNotificationsData["consorsOrderId"],
) {
  try {
    const efiNotifications = await db.consorsEfiNotifications.findUnique({
      where: { consorsOrderId },
    });
    return efiNotifications;
  } catch (err) {
    console.error("err getEfiNotifications", err);
  }
}
