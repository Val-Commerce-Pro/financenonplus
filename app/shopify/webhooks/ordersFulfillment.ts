import { z } from "zod";
import { getConsorsClient } from "~/consors/consorsApi";
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
  const fulfilledDataObj = orderFulfilled.parse(data);
  console.log("fulfilledDataObj parsed - ", fulfilledDataObj);

  const efiNotificationData = await getEfiNotifications({
    orderId: fulfilledDataObj.admin_graphql_api_id,
  });
  if (
    !efiNotificationData ||
    !efiNotificationData.orderId ||
    !efiNotificationData.transactionId ||
    !validateCustomAttributes(fulfilledDataObj.note_attributes)
  )
    return;

  const consorsClient = await getConsorsClient(shop);
  const bankResponse = await consorsClient?.updateSubscriptionDeliveryStatus(
    efiNotificationData.transactionId,
  );
  console.log("bankResponse updateSubscriptionDeliveryStatus", bankResponse);
  // if (!bankResponse?.ok) {
  //   return { error: true, menssage: bankResponse };
  // }
  const bankResponseData = await bankResponse?.json();
  console.log("bankResponseData", bankResponseData);
  await addNoteToOrder(
    shop,
    efiNotificationData.orderId,
    createNoteMessage(bankResponseData, "Fulfillment"),
  );
}
