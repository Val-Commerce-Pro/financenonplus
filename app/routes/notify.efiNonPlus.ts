import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
// import {
//   getEfiNotifications,
//   updateEfiNotifications,
// } from "~/models/consorsNotifications";
// import { completeDraftOrder } from "~/shopify/graphql/completeDraftOrder";
// import { authenticate } from "~/shopify.server";
// import { completeDraftOrder } from "~/shopify/graphql/completeDraftOrder";

export const action: ActionFunction = async ({ request }) => {
  const requestedURL = new URL(request.url);
  console.log("notification route requestedURL - ", requestedURL);
  const status = requestedURL.searchParams.get("status");
  const statusDetail = requestedURL.searchParams.get("status_detail");
  const consorsOrderId = requestedURL.searchParams.get("order_id");
  const transactionId = requestedURL.searchParams.get("transaction_id");
  const creditAmount = requestedURL.searchParams.get("creditAmount");
  const hash = requestedURL.searchParams.get("hash");
  console.log(
    "consorsOrderId, transactionId, statusDetail, status",
    consorsOrderId,
    transactionId,
    statusDetail,
    status,
  );
  try {
    if (!consorsOrderId || !status || !transactionId || !hash) {
      return json(
        { error: "Order Id, Status or Transaction Id or hash, not found" },
        {
          status: 500,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        },
      );
    }

    // Immediately acknowledge the notification with a 200 status code
    const response = json(
      { message: "Notification received" },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    );

    // Trigger the database handling route
    setImmediate(() => {
      const body = JSON.stringify({
        consorsOrderId,
        transactionId,
        statusDetail,
        status,
        creditAmount,
        hash,
      });
      fetch("https://financenonplus.cpro-server.de/api/handleConsorsStatus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      }).catch((error) => {
        console.error("Failed to trigger database handling route:", error);
      });
    });

    return response;
  } catch (error) {
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
};
