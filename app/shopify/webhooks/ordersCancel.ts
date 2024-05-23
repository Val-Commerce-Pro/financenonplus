// import { z } from "zod";

// const orderCancel = z.object({
//   id: z.number(),
//   cancelled_at: z.string().transform((str) => new Date(str).toUTCString()),
// });

export async function webhook_ordersCancel(shop: string, payload: unknown) {
  console.log("ordersCancel rended");
  const data = payload?.valueOf();
  // const cancellationData = orderCancel.parse(data);
  console.log("webhook_ordersCancel - ", data);
  // console.log("parseResult - ", cancellationData);
}
