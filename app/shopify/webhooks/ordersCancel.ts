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
  const parsedCancellationData = orderCancel.parse(data);
  if (!parsedCancellationData) {
    return {
      message: "orderId not found or note_attributes not matching",
      data: parsedCancellationData,
    };
  } else console.log("parseResult - ", parsedCancellationData);

  const efiNotificationData = await getEfiNotifications({
    orderId: parsedCancellationData.admin_graphql_api_id,
  });
  if (
    !efiNotificationData ||
    !efiNotificationData.orderId ||
    !efiNotificationData.transactionId ||
    !validateCustomAttributes(parsedCancellationData.note_attributes)
  ) {
    return {
      message: "orderId not found or note_attributes not matching",
      data: efiNotificationData,
    };
  }

  const consorsClient = await getConsorsClient(shop);
  const bankResponse = await consorsClient?.cancelSubscription(
    efiNotificationData.transactionId,
  );
  if (!bankResponse?.ok) {
    return { message: "Consors cancelSubscription Failed", data: bankResponse };
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
