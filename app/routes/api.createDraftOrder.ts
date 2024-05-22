import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

import type { DraftOrderInput } from "~/shopify/graphql/createDraftOrder";
import { createDraftOrder } from "~/shopify/graphql/createDraftOrder";

export type ClientFormDataI = {
  salutation: string;
  dataOfBirth?: string;
  lastName: string;
  city: string;
  zipCode: string;
  street: string;
  housenumber: string;
  mobile: string;
  firstName: string;
  email: string;
};

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
  draftOrderData: ClientFormDataI;
  lineItems: LineItem[];
};

export const action: ActionFunction = async ({ request }) => {
  const data = await request.json();
  const { shop, draftOrderData, lineItems }: EfiDraftOrder = data;
  // TODO: check if address is german otherwise no financing
  // TODO: check if minimum value is reached test REJECT in firstName

  try {
    const draftOrderInfo: DraftOrderInput = {
      note: "Consors EFI Test",
      email: draftOrderData.email,
      phone: draftOrderData.mobile,
      taxExempt: true,
      tags: "Consors EFI",
      shippingAddress: {
        address1: draftOrderData.street,
        city: draftOrderData.city,
        countryCode: "DE",
        zip: draftOrderData.zipCode,
      },
      billingAddress: {
        address1: draftOrderData.street,
        city: draftOrderData.city,
        countryCode: "DE",
        zip: draftOrderData.zipCode,
      },
      customAttributes: [
        {
          key: "customAttributes",
          value: "random value",
        },
      ],
      lineItems: lineItems,
    };

    const draftOrderResponse = await createDraftOrder(shop, draftOrderInfo);
    if (!draftOrderResponse) {
      return json(draftOrderResponse, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
    const { data: draftOrderResponseData }: { data?: DraftOrderResponse } =
      draftOrderResponse;
    console.log("draftOrderData", draftOrderResponseData);

    //Save data to the database or maybe add this to the route when the notification arrives
    // const { id: draftOrderId, name: draftOrderName } =
    //   draftOrderResponseData?.draftOrderCreate.draftOrder;

    return json(draftOrderResponseData, {
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
