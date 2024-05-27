import { z } from "zod";

import { getConsorsClient } from "~/consors/consorsApi";
import { getEfiNotifications } from "~/models/consorsNotifications";
import { validateCustomAttributes } from "~/utils/validateData";

const orderCancel = z.object({
  id: z.number(),
  note_attributes: z.array(
    z.object({
      name: z.string(),
      value: z.string(),
    }),
  ),
});

export async function webhook_ordersCancel(shop: string, payload: unknown) {
  console.log("ordersCancel rended");
  const data = payload?.valueOf();
  const cancellationData = orderCancel.parse(data);
  console.log("webhook_ordersCancel - ", data);
  // console.log("parseResult - ", cancellationData);

  const consorsOrderId = cancellationData.id
    .toString()
    .replace(/[^\dA-Za-z]/g, "");
  const consorsClient = await getConsorsClient(shop);
  const efiNotificationData = await getEfiNotifications(consorsOrderId);
  if (!efiNotificationData || !efiNotificationData.transactionId) return;
  console.log(
    "validateCustomAttributes",
    validateCustomAttributes(cancellationData.note_attributes),
  );
  const bankResponse = await consorsClient?.cancelSubscription(
    efiNotificationData.transactionId,
  );
  console.log("bankResponse cancelSubscription", bankResponse);
}
