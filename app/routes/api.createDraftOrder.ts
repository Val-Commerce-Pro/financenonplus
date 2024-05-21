import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import type { DraftOrderInput } from "~/shopify/graphql/createDraftOrder";
import { createDraftOrder } from "~/shopify/graphql/createDraftOrder";

type DraftOrderResponse = {
  draftOrderCreate: {
    draftOrder: {
      id: string;
      name: string;
    };
  };
};

interface LineItem {
  variantId: string;
  quantity: number;
}

type EfiDraftOrder = {
  shop: string;
  draftOrderData: DraftOrderInput;
  lineItems: LineItem[];
};

export const action: ActionFunction = async ({ request }) => {
  const data = await request.json();
  const { shop, draftOrderData, lineItems }: EfiDraftOrder = data;
  console.log("EFI Draft Order Route", shop, draftOrderData, lineItems);
  try {
    const draftOrderResponse = await createDraftOrder(shop, draftOrderData);
    console.log("draftOrderResponse", draftOrderResponse);
    if (!draftOrderResponse) {
      return json(draftOrderResponse, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
    // const { data: draftOrderData }: { data?: DraftOrderResponse } =
    //   draftOrderResponse;
    // console.log("draftOrderData", draftOrderData);
    return json(draftOrderResponse, {
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
