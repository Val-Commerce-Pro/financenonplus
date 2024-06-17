import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getConsorsClient } from "~/consors/consorsApi";
import { getEfiNotifications } from "~/models/consorsNotifications";

export const loader: LoaderFunction = async ({ request }) => {
  const requestedURL = new URL(request.url);

  // const shop = requestedURL.searchParams.get("shop");
  const orderId = requestedURL.searchParams.get("orderId");

  console.log("orderId", orderId);

  const efiNotificationData = await getEfiNotifications({
    consorsOrderId: orderId ?? "",
  });
  console.log("current efiNotificationData", efiNotificationData);
  if (
    !efiNotificationData ||
    !efiNotificationData.orderId ||
    !efiNotificationData.transactionId
  )
    return json(
      {
        message: "orderId not found",
      },
      {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    );

  console.log("current efiNotificationData", efiNotificationData);
  const consorsClient = await getConsorsClient(efiNotificationData.shop);
  const bankResponse = await consorsClient?.updateSubscriptionWithPartnerData({
    orderName: efiNotificationData.orderName,
    transactionId: efiNotificationData.transactionId,
  });
  console.log("bankResponse", bankResponse);
  const bankResponseData = await bankResponse?.json();
  console.log("bankResponse Data", bankResponseData);

  // if (!transactionId) {
  //   return json(
  //     { error: "Shop not provided" },
  //     {
  //       status: 400,
  //       headers: {
  //         "Access-Control-Allow-Origin": "*",
  //       },
  //     },
  //   );
  // }
  return json(
    {
      message: "updateSubscriptionWithPartnerData Response",
      data: bankResponse,
    },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
};
