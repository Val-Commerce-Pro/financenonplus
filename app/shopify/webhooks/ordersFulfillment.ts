import { z } from "zod";
import { getConsorsClient } from "~/consors/consorsApi";
import { getEfiNotifications } from "~/models/consorsNotifications";
import { validateCustomAttributes } from "~/utils/validateData";

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
  const fulfilledDataObj = orderFulfilled.parse(data);
  console.log("webhook_ordersFulfillment", data);
  // console.log("fulfilledDataObj parsed - ", data);

  const efiNotificationData = await getEfiNotifications({
    orderId: fulfilledDataObj.admin_graphql_api_id,
  });
  console.log(
    "webhook_ordersFulfillment efiNotificationData",
    efiNotificationData,
  );
  if (
    !efiNotificationData ||
    !efiNotificationData.transactionId ||
    !validateCustomAttributes(fulfilledDataObj.note_attributes)
  )
    return;

  console.log(
    "validateCustomAttributes",
    validateCustomAttributes(fulfilledDataObj.note_attributes),
  );
  const consorsClient = await getConsorsClient(shop);
  const bankResponse = await consorsClient?.updateSubscriptionDeliveryStatus(
    efiNotificationData.transactionId,
  );
  if (!bankResponse?.ok) {
    return { error: true, menssage: bankResponse };
  }
  const bankResponseData = await bankResponse.json();
  console.log(
    "bankResponseData updateSubscriptionDeliveryStatus",
    bankResponseData,
  );
}
