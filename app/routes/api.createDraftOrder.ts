import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { createEfiNotifications } from "~/models/consorsNotifications";

import type {
  CustomAttribute,
  DraftOrderInput,
} from "~/shopify/graphql/createDraftOrder";
import { createDraftOrder } from "~/shopify/graphql/createDraftOrder";

export type ClientFormDataI = {
  customerid?: string;
  shippingPrice?: number;
  salutation: string;
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
      customAttributes: CustomAttribute[];
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
      email: draftOrderData.email,
      taxExempt: true,
      tags: "Consors EFI",
      shippingLine: {
        title: "Custom Shipping",
        price: draftOrderData.shippingPrice ?? 0,
      },
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
          key: "Commerce-Pro",
          value: "Consors-EFI",
        },
      ],
      lineItems: lineItems,
    };
    if (draftOrderData.customerid) {
      draftOrderInfo.customerId = `gid://shopify/Customer/${draftOrderData.customerid}`;
    }

    const draftOrderResponse = await createDraftOrder(shop, draftOrderInfo);
    console.log("draftOrderResponse", draftOrderResponse);

    const { data: draftOrderResponseData }: { data?: DraftOrderResponse } =
      draftOrderResponse;
    if (
      !draftOrderResponse ||
      !draftOrderResponseData ||
      !draftOrderResponseData.draftOrderCreate ||
      !draftOrderResponseData.draftOrderCreate.draftOrder
    ) {
      return json(draftOrderResponse, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
    const { id: draftOrderId, name: draftOrderName } =
      draftOrderResponseData.draftOrderCreate.draftOrder;
    const consorsOrderId = draftOrderName.replace(/[^\dA-Za-z]/g, "");

    const currentEfiNotificationData = {
      draftOrderId,
      shop,
      draftOrderName,
      consorsOrderId,
      orderId: null,
      orderName: null,
      transactionId: null,
      status: null,
      statusDetail: null,
      campaign: null,
      creditAmount: null,
    };

    await createEfiNotifications(currentEfiNotificationData);

    return json(
      { consorsOrderId },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
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
