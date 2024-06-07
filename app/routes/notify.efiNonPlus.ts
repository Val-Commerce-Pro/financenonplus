import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
// import { checkNotifyHash } from "~/consors/notification";
import { checkNotifyHash2 } from "~/consors/notification2";
import { getEfiNotifications } from "~/models/consorsNotifications";
import { getShopPluginConfig } from "~/models/credentialsPlugin.server";

export const action: ActionFunction = async ({ request }) => {
  const requestedURL = new URL(request.url);
  const status = requestedURL.searchParams.get("status");
  const statusDetail = requestedURL.searchParams.get("status_detail");
  const consorsOrderId = requestedURL.searchParams.get("order_id");
  const transactionId = requestedURL.searchParams.get("transaction_id");
  const creditAmount = requestedURL.searchParams.get("creditAmount");
  console.log("consors requestedURL", requestedURL);

  if (!consorsOrderId || !status || !transactionId) {
    return json(
      { error: "Order Id, Status, or Transaction Id not found" },
      {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  }

  const notificationData = await getEfiNotifications({ consorsOrderId });
  if (!notificationData?.shop) {
    return json(
      { error: "Shop key not found in the database" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  }
  const credentialsData = await getShopPluginConfig(notificationData?.shop);
  console.log("credentialsData.hash", credentialsData?.hash);
  //console.log("checkNotifyHash", checkNotifyHash(request.url));
  checkNotifyHash2(request.url, "12345678910");

  // if (!checkNotifyHash(request.url, credentialsData?.hash ?? "")) {
  //   return json(
  //     { error: "Invalid hash" },
  //     {
  //       status: 400,
  //       headers: {
  //         "Access-Control-Allow-Origin": "*",
  //       },
  //     },
  //   );
  // }

  try {
    const response = json(
      { message: "Notification received" },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    );

    // Trigger the handling route
    setImmediate(() => {
      const body = JSON.stringify({
        consorsOrderId,
        transactionId,
        statusDetail,
        status,
        creditAmount,
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
