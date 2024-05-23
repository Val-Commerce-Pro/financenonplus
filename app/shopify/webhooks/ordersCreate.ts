// import { z } from "zod";
// import { createOrderWithCustomerDetails } from "~/models/order.server";
// import type { CreateCustomerDetails, CreateOrder } from "~/models/types";
// import {
//   createCustomCustomerId,
//   isPayLaterPaymentGateway,
// } from "~/utils/dataMutation";
// import { addTagsToOrder } from "../graphql/addTagsToOrder";

// const orderCreateSchema = z.object({
//   id: z.number(),
//   admin_graphql_api_id: z.string(),
//   tags: z.union([z.string(), z.array(z.string())]).nullable(),
//   email: z.string(),
//   order_number: z.number().transform((num) => num.toString()),
//   name: z.string(),
//   payment_gateway_names: z.array(z.string()),
//   total_price: z.string().transform((num) => Number(num)),
//   customer: z.object({
//     id: z.number().transform((num) => num.toString()),
//     first_name: z.string().nullable(),
//     last_name: z.string(),
//   }),
//   billing_address: z.object({
//     zip: z.string(),
//     city: z.string(),
//     address1: z.string(),
//     country_code: z.string(),
//   }),
// });

export async function webhook_ordersCreate(shop: string, payload: unknown) {
  console.log("ordersCreate rended");
  const data = payload?.valueOf();
  // const parseResult = orderCreateSchema.safeParse(data);
  console.log("webhook_ordersCreate", data);
  // console.log("parseResult - ", parseResult);
}
