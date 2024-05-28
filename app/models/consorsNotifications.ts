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
    if (!data.consorsOrderId || !data.shop) {
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
        shop: data.shop,
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

type GetEfiNotifications = {
  consorsOrderId?: string;
  orderId?: string;
};

export async function getEfiNotifications(query: GetEfiNotifications) {
  console.log("getEfiNotifications called with", query);

  if (!query.consorsOrderId && !query.orderId) {
    throw new Error("Either consorsOrderId or orderId must be provided");
  }

  try {
    let efiNotifications;

    if (query.consorsOrderId) {
      efiNotifications = await db.consorsEfiNotifications.findUnique({
        where: { consorsOrderId: query.consorsOrderId },
      });
    } else if (query.orderId) {
      efiNotifications = await db.consorsEfiNotifications.findUnique({
        where: { orderId: query.orderId },
      });
    }
    console.log("getEfiNotifications result", efiNotifications);
    return efiNotifications;
  } catch (err) {
    console.error("err getEfiNotifications", err);
    return;
  }
}
