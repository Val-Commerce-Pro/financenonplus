import { json, type ActionFunction } from "@remix-run/node";
import { getConsorsClient } from "~/consors/consorsApi";
import {
  getEfiNotifications,
  updateEfiNotifications,
} from "~/models/consorsNotifications";
import { addNoteToOrder } from "~/shopify/graphql/addNoteToOrder";
import { completeDraftOrder } from "~/shopify/graphql/completeDraftOrder";
import { deleteDraftOrder } from "~/shopify/graphql/deleteDraftOrder";
import { orderMarkAsPaid } from "~/shopify/graphql/orderMarkAsPaid";
import { createNoteMessage } from "~/utils/formatData";

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
  const data = await request.json();
  const {
    consorsOrderId,
    creditAmount,
    status,
    statusDetail,
    transactionId,
    // hash,
  }: HandleConsorsStatusBody = data;

  console.log("handle Consors Status data", data);

  const efiNotificationsData = await getEfiNotifications({
    consorsOrderId,
  });
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
  if (
    status === "error" &&
    ["DECLINED", "TIMEOUT", "INCOMPLETE", "BAD_REQUEST"].includes(statusDetail)
  ) {
    const deletedDraftOrder = await deleteDraftOrder(
      efiNotificationsData.shop,
      efiNotificationsData.draftOrderId,
    );
    console.log("deletedDraftOrder", deletedDraftOrder);
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

    const consorsClient = await getConsorsClient(efiNotificationsData.shop);

    await consorsClient?.updateSubscriptionWithPartnerData({
      orderId: efiNotificationsData.orderId,
      transactionId: efiNotificationsData.transactionId,
    });

    const updatedEfiNotificationsData = await updateEfiNotifications({
      status,
      statusDetail: statusDetail ?? null,
      consorsOrderId,
      transactionId,
      creditAmount,
      orderId,
      orderName,
    });
    await addNoteToOrder(
      efiNotificationsData.shop,
      orderId,
      createNoteMessage(status),
    );
    if (!updatedEfiNotificationsData) {
      return json(updatedEfiNotificationsData, {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
  }
  if (status === "accepted") {
    const markedAsPaid = await orderMarkAsPaid(
      efiNotificationsData.shop,
      efiNotificationsData.orderId ?? "",
    );
    console.log("markedAsPaid", markedAsPaid);
  }
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
