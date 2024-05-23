// import { z } from "zod";

// const orderFulfilled = z.object({
//   id: z.number(),
//   created_at: z.string(),
// });

export async function webhook_ordersFulfillment(
  shop: string,
  payload: unknown,
) {
  console.log("ordersFulfillment rended");
  const data = payload?.valueOf();
  // const fulfilledDataObj = orderFulfilled.safeParse(data);
  console.log("webhook_ordersFulfillment", data);
  // console.log("fulfilledDataObj parsed - ", data);
}
