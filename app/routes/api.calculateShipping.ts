import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { DraftOrderInputShipping, draftOrderCalculate } from "~/shopify/graphql/calculateShipping";

import type { DraftOrderInput } from "~/shopify/graphql/createDraftOrder";

type CalculateShippingResponse = {
  calculatedDraftOrder: {
    availableShippingRates: {
      price: string;
    };
  };
};


export const action: ActionFunction = async ({ request }) => {
  const data: DraftOrderInputShipping = await request.json();
  const { shop,  lineItems, shippingAddress } = data;

  console.log("Shipping calculator Route", shop, shippingAddress, lineItems);
  try {
    const calculateShippingResponse = await draftOrderCalculate(data);
    console.log("draftOrderCalculate", calculateShippingResponse);
    if (!calculateShippingResponse) {
      return json(calculateShippingResponse, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
    const { data: shippingCost }: { data?: CalculateShippingResponse } =
    calculateShippingResponse;
    console.log("shippingCost", shippingCost);
    return json(calculateShippingResponse, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response("Internal Server Error", {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
};
