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
    if (!data.consorsOrderId) {
      return { error: "consorsOrderId is required" };
    }
    const existingShop = await db.consorsEfiNotifications.findUnique({
      where: { consorsOrderId: data.consorsOrderId },
    });

    if (existingShop)
      return {
        error: `This ID already exists into the database BD message - ${existingShop}`,
      };
    const settings = await db.consorsEfiNotifications.create({
      data: {
        consorsOrderId: data.consorsOrderId,
        draftOrderId: data.draftOrderId,
        draftOrderName: data.draftOrderName,
        orderId: data.orderId ?? null,
        orderName: data.orderName ?? null,
        transactionId: data.transactionId ?? null,
        status: data.status ?? null,
        statusDetail: data.statusDetail ?? null,
        campaign: data.campaign ?? null,
        creditAmount: data.creditAmount ?? null,
      },
    });
    return settings;
  } catch (err) {
    console.error("err createEfiNotifications", err);
  }
}

export async function getEfiNotifications(
  consorsOrderId: ConsorsEfiNotificationsData["consorsOrderId"],
) {
  console.log("getEfiNotifications rended", consorsOrderId);
  try {
    const efiNotifications = await db.consorsEfiNotifications.findUnique({
      where: { consorsOrderId },
    });
    console.log("getEfiNotifications", efiNotifications);
    return efiNotifications;
  } catch (err) {
    console.error("err getEfiNotifications", err);
  }
}
