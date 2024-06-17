import { z } from "zod";

import { getConsorsClient } from "~/consors/consorsApi";
import type { ErrorConsorsSubscription } from "~/consors/types/apiTypes";
import { getEfiNotifications } from "~/models/consorsNotifications";
import { createNoteMessage } from "~/utils/formatData";
import { validateCustomAttributes } from "~/utils/validateData";
import { addNoteToOrder } from "../graphql/addNoteToOrder";

const orderCancel = z.object({
  id: z.number(),
  admin_graphql_api_id: z.string(),
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
  console.log("parseResult - ", cancellationData);

  const efiNotificationData = await getEfiNotifications({
    orderId: cancellationData.admin_graphql_api_id,
  });
  if (
    !efiNotificationData ||
    !efiNotificationData.orderId ||
    !efiNotificationData.transactionId ||
    !validateCustomAttributes(cancellationData.note_attributes)
  ) {
    return;
  }

  const consorsClient = await getConsorsClient(shop);
  const bankResponse = await consorsClient?.cancelSubscription(
    efiNotificationData.transactionId,
  );
  if (!bankResponse?.ok) {
    return { error: true, menssage: bankResponse };
  }
  const bankResponseData: ErrorConsorsSubscription | string =
    await bankResponse.json();
  const noteMessage =
    typeof bankResponseData === "string"
      ? bankResponseData
      : bankResponseData.errorCode;
  await addNoteToOrder(
    shop,
    efiNotificationData.orderId,
    createNoteMessage(noteMessage, "Cancellation"),
  );
}
