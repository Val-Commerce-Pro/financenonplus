import { json, type ActionFunction } from "@remix-run/node";
import {
  deleteEfiNotifications,
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
    await deleteDraftOrder(
      efiNotificationsData.shop,
      efiNotificationsData.draftOrderId,
    );
    await deleteEfiNotifications({ consorsOrderId });
    return json(
      { message: status, statusDetails: statusDetail },
      {
        status: 200,
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
      return json(
        {
          error: `completeDraftOrder error response ${completeDraftOrderData}`,
        },
        {
          status: 500,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        },
      );
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
    await addNoteToOrder(
      efiNotificationsData.shop,
      orderId,
      createNoteMessage(
        status === "success" ? "Waiting_For_Documents" : status,
        undefined,
        statusDetail,
      ),
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
    await orderMarkAsPaid(
      efiNotificationsData.shop,
      efiNotificationsData.orderId ?? "",
    );
    await addNoteToOrder(
      efiNotificationsData.shop,
      efiNotificationsData.orderId ?? "",
      createNoteMessage(status, undefined, statusDetail),
    );
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
