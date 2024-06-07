import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getConsorsClient } from "~/consors/consorsApi";
import { getEfiNotifications } from "~/models/consorsNotifications";

export const loader: LoaderFunction = async ({ request }) => {
  const requestedURL = new URL(request.url);

  // const shop = requestedURL.searchParams.get("shop");
  const orderId = requestedURL.searchParams.get("orderId");

  const efiNotificationData = await getEfiNotifications({
    orderId: orderId ?? "",
  });
  if (
    !efiNotificationData ||
    !efiNotificationData.orderId ||
    !efiNotificationData.transactionId
  )
    return;

  const consorsClient = await getConsorsClient(efiNotificationData.shop);
  const bankResponse = await consorsClient?.updateSubscriptionDeliveryStatus(
    efiNotificationData.transactionId,
  );
  console.log("bankResponse updateSubscriptionDeliveryStatus", bankResponse);

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
      message: "updateSubscriptionDeliveryStatus Response",
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
