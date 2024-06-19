import { z } from "zod";
import { getConsorsClient } from "~/consors/consorsApi";
// import type { ErrorConsorsSubscription } from "~/consors/types/apiTypes";
import { getEfiNotifications } from "~/models/consorsNotifications";
import { createNoteMessage } from "~/utils/formatData";
import { validateCustomAttributes } from "~/utils/validateData";
import { addNoteToOrder } from "../graphql/addNoteToOrder";

const orderFulfilled = z.object({
  id: z.number(),
  admin_graphql_api_id: z.string(),
  note_attributes: z.array(
    z.object({
      name: z.string(),
      value: z.string(),
    }),
  ),
});

export async function webhook_ordersFulfillment(
  shop: string,
  payload: unknown,
) {
  console.log("ordersFulfillment rended");
  const data = payload?.valueOf();
  const parsedFulfilledData = orderFulfilled.parse(data);

  if (!parsedFulfilledData) {
    return {
      message: "orderId not found or note_attributes not matching",
      data: parsedFulfilledData,
    };
  } else console.log("parseResult - ", parsedFulfilledData);

  const efiNotificationData = await getEfiNotifications({
    orderId: parsedFulfilledData.admin_graphql_api_id,
  });
  if (
    !efiNotificationData ||
    !efiNotificationData.orderId ||
    !efiNotificationData.transactionId ||
    !validateCustomAttributes(parsedFulfilledData.note_attributes)
  ) {
    return {
      message: "orderId not found or note_attributes not matching",
      data: efiNotificationData,
    };
  }

  const consorsClient = await getConsorsClient(shop);
  const bankResponse = await consorsClient?.updateSubscriptionDeliveryStatus(
    efiNotificationData.transactionId,
  );
  if (!bankResponse?.ok) {
    return {
      message: "Consors updateSubscriptionDeliveryStatus Failed",
      data: bankResponse,
    };
  }
  const bankResponseData = await bankResponse.json();
  const noteMessage =
    typeof bankResponseData === "string"
      ? bankResponseData
      : bankResponseData.errorCode;
  await addNoteToOrder(
    shop,
    efiNotificationData.orderId,
    createNoteMessage(noteMessage, "Fulfillment"),
  );
}
