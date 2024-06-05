import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getEfiNotifications } from "~/models/consorsNotifications";
import { deleteDraftOrder } from "~/shopify/graphql/deleteDraftOrder";
import { getScheduledJob } from "../cronJobs";

export const action: ActionFunction = async ({ request }) => {
  const data = await request.json();
  const { consorsOrderId } = data;

  const currentOrderData = await getEfiNotifications({
    consorsOrderId,
  });

  if (!currentOrderData) {
    return json(currentOrderData, {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  if (currentOrderData.orderId) {
    // Cancel the scheduled job for the consorsOrderId
    const scheduledTask = getScheduledJob(consorsOrderId);
    if (scheduledTask) {
      scheduledTask.cancel();
      console.log(
        `Scheduled task for consorsOrderId ${consorsOrderId} has been canceled.`,
      );
    }
  }

  if (!currentOrderData.orderId) {
    const deleteDraftResponse = await deleteDraftOrder(
      currentOrderData.shop,
      currentOrderData.draftOrderId,
    );

    console.log("deleteDraftOrder", deleteDraftResponse.data);
    return json(
      { message: "order deleted" },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  }

  return json(
    { message: "success" },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },0
    },
  );
};
