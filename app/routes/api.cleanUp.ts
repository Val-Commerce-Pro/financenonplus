import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  deleteEfiNotifications,
  getEfiNotifications,
} from "~/models/consorsNotifications";
import { deleteDraftOrder } from "~/shopify/graphql/deleteDraftOrder";
import { scheduleCleanUp } from "../cronJobs";

export const action: ActionFunction = async ({ request }) => {
  const data = await request.json();
  const { consorsOrderId } = data;

  if (!data) {
    return json(`consorsOrderId not found ${consorsOrderId}`, {
      status: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  const currentOrderData = await getEfiNotifications({
    consorsOrderId,
  });

  if (!currentOrderData) {
    return json(`consorsOrderId not found ${consorsOrderId}`, {
      status: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  if (currentOrderData.orderId) {
    // Cancel the scheduled job for the consorsOrderId
    const scheduledTask = scheduleCleanUp(consorsOrderId);
    if (scheduledTask) {
      scheduledTask.cancel();
      return json(
        {
          message: `Scheduled task for consorsOrderId ${consorsOrderId} has been canceled.`,
        },
        {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        },
      );
    }
  }

  if (!currentOrderData.orderId) {
    await deleteDraftOrder(
      currentOrderData.shop,
      currentOrderData.draftOrderId,
    );
    await deleteEfiNotifications(consorsOrderId);

    return json(
      { message: "draft order deleted" },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  }
};
