import type { ActionFunction } from "@remix-run/node";
// import {
//   getEfiNotifications,
//   updateEfiNotifications,
// } from "~/models/consorsNotifications";
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
    hash,
  }: HandleConsorsStatusBody = data;
  console.log(
    "consorsOrderId, creditAmount, status, statusDetail, transactionId, hash",
    consorsOrderId,
    creditAmount,
    status,
    statusDetail,
    transactionId,
    hash,
  );
  // const efiNotificationsData = await getEfiNotifications(consorsOrderId);
  // if (!efiNotificationsData) {
  //   return json(
  //     { error: "Order Id not found" },
  //     {
  //       status: 500,
  //       headers: {
  //         "Access-Control-Allow-Origin": "*",
  //       },
  //     },
  //   );
  // }
  // if (status === "success") {
  //   const newOrderResponse = await completeDraftOrder(
  //     efiNotificationsData.shop,
  //     efiNotificationsData.draftOrderId,
  //   );
  //   const {
  //     data: completeDraftOrderData,
  //   }: { data?: CompleteDraftOrderResponse } = newOrderResponse;
  //   if (
  //     !completeDraftOrderData ||
  //     !completeDraftOrderData.draftOrderComplete ||
  //     !completeDraftOrderData.draftOrderComplete.draftOrder ||
  //     !completeDraftOrderData.draftOrderComplete.draftOrder.order
  //   ) {
  //     return json(completeDraftOrderData, {
  //       headers: {
  //         "Access-Control-Allow-Origin": "*",
  //       },
  //     });
  //   }
  //   const { id: orderId, name: orderName } =
  //     completeDraftOrderData.draftOrderComplete.draftOrder.order;
  //   const updatedEfiNotificationsData = await updateEfiNotifications({
  //     status,
  //     statusDetail: statusDetail ?? null,
  //     consorsOrderId,
  //     transactionId,
  //     creditAmount,
  //     orderId,
  //     orderName,
  //   });
  //   if (!updatedEfiNotificationsData) {
  //     return json(
  //       { error: "Order updating data, try again later!" },
  //       {
  //         status: 500,
  //         headers: {
  //           "Access-Control-Allow-Origin": "*",
  //         },
  //       },
  //     );
  //   }
  //   console.log("completeDraftOrderData", completeDraftOrderData);
  // }
  // console.log("updatedConsorsOrderId response", updatedEfiNotificationsData);
  return new Response("Success", {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
};
