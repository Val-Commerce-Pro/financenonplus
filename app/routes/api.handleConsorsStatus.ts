import { json, type ActionFunction } from "@remix-run/node";
import {
  getEfiNotifications,
  updateEfiNotifications,
} from "~/models/consorsNotifications";
import { completeDraftOrder } from "~/shopify/graphql/completeDraftOrder";

type CompleteDraftOrderResponse = {
  draftOrderComplete: {
    draftOrder: {
      id: string;
      order: {
        id: string;
        name: string;
      };
    };
  };
};

type HandleConsorsStatusBody = {
  consorsOrderId: string;
  transactionId: string;
  statusDetail: string;
  status: string;
  creditAmount: string;
  hash: string;
};

export const action: ActionFunction = async ({ request }) => {
  console.log("HandleConsorsStatusBody route rendered");
  const data = await request.json();
  const {
    consorsOrderId,
    creditAmount,
    status,
    statusDetail,
    transactionId,
    // hash,
  }: HandleConsorsStatusBody = data;

  const efiNotificationsData = await getEfiNotifications(consorsOrderId);
  if (!efiNotificationsData) {
    return json(
      { error: "Server error" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  }
  if (status === "success") {
    const newOrderResponse = await completeDraftOrder(
      efiNotificationsData.shop,
      efiNotificationsData.draftOrderId,
    );
    const {
      data: completeDraftOrderData,
    }: { data?: CompleteDraftOrderResponse } = newOrderResponse;
    if (
      !completeDraftOrderData ||
      !completeDraftOrderData.draftOrderComplete ||
      !completeDraftOrderData.draftOrderComplete.draftOrder ||
      !completeDraftOrderData.draftOrderComplete.draftOrder.order
    ) {
      return json(completeDraftOrderData, {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
    const { id: orderId, name: orderName } =
      completeDraftOrderData.draftOrderComplete.draftOrder.order;
    const updatedEfiNotificationsData = await updateEfiNotifications({
      status,
      statusDetail: statusDetail ?? null,
      consorsOrderId,
      transactionId,
      creditAmount,
      orderId,
      orderName,
    });
    if (!updatedEfiNotificationsData) {
      return json(updatedEfiNotificationsData, {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  }
  console.log("PASSOU DO IF");
  return json(
    { message: "Success" },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
};
