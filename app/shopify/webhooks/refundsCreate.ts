// import { z } from "zod";

// const refundsSchema = z.object({
//   order_id: z.number(),
//   created_at: z.string(),
//   note: z.string().nullable(),
//   transactions: z.array(
//     z.object({
//       gateway: z.string(),
//       amount: z.string(),
//     }),
//   ),
// });

export async function webhook_refundsCreate(shop: string, payload: unknown) {
  console.log("refundsCreate rended");
  // const data = payload?.valueOf();
  // const refundsDataParsed = refundsSchema.safeParse(data);
  // console.log("webhook_refundsCreate - ", data);
  // console.log("refundsData parsed - ", refundsDataParsed);
}
