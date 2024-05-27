import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  getEfiNotifications,
  updateEfiNotifications,
} from "~/models/consorsNotifications";
import { completeDraftOrder } from "~/shopify/graphql/completeDraftOrder";
// import { authenticate } from "~/shopify.server";
// import { completeDraftOrder } from "~/shopify/graphql/completeDraftOrder";

// type CompleteDraftOrderResponse = {
//   draftOrderComplete: {
//     draftOrder: {
//       id: string;
//       order: {
//         id: string;
//         name: string;
//       };
//     };
//   };
// };

export const action: LoaderFunction = async ({ request }) => {
  const requestedURL = new URL(request.url);
  console.log("requestedURL - ", requestedURL);
  const status = requestedURL.searchParams.get("status");
  const statusDetail = requestedURL.searchParams.get("status_detail");
  const consorsOrderId = requestedURL.searchParams.get("order_id");
  const transactionId = requestedURL.searchParams.get("transaction_id");
  const creditAmount = requestedURL.searchParams.get("creditAmount");
  // const hash = requestedURL.searchParams.get("hash");
  console.log(
    "consorsOrderId, transactionId, statusDetail, status",
    consorsOrderId,
    transactionId,
    statusDetail,
    status,
  );

  if (!consorsOrderId || !status || !transactionId) {
    return json(
      { error: "Order Id not found" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  }
  const efiNotificationsData = await getEfiNotifications(consorsOrderId);
  if (!efiNotificationsData) {
    return json(
      { error: "Order Id not found" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  }

  if (status === "success") {
    const newOrder = await completeDraftOrder(
      efiNotificationsData.shop,
      efiNotificationsData.draftOrderId,
    );
    console.log("newOrder", newOrder);
  }

  const updatedEfiNotificationsData = await updateEfiNotifications({
    status,
    statusDetail: statusDetail ?? null,
    consorsOrderId,
    transactionId,
    creditAmount,
  });

  console.log("updatedConsorsOrderId response", updatedEfiNotificationsData);
  if (!updatedEfiNotificationsData) {
    return json(
      { error: "Order updating data, try again later!" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  }

  // const newOrder: CompleteDraftOrderResponse = await completeDraftOrder(
  //   shop,
  //   draftOrderId,
  // );
  // const { id: newOrderId, name: newOrderName } =
  //   newOrder.draftOrderComplete.draftOrder.order;
  // console.log("newOrder", newOrder);

  // const updatedEfiData = updateEfiNotifications({
  //   consorsOrderId: consorsOrderId,
  //   orderId: newOrderId,
  //   orderName: newOrderName,
  // });

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
