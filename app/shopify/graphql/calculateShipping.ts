import { getGraphqlClient } from "./getGraphqlClient";

interface Address {
  address1: string;
  city: string;
  zip: string;
  countryCode: string;
}

interface ShippingLine {
  title: string;
  price: number;
}

interface LineItem {
  variantId: string;
  quantity: number;
}

export interface DraftOrderInput {
  shippingLine?: ShippingLine;
  shippingAddress?: Address;
  lineItems: LineItem[];
}

export async function draftOrderCalculate(shop: string, input: DraftOrderInput) {
  const graphQlClient = await getGraphqlClient(shop);

  const response = await graphQlClient.request(
    `mutation draftOrderCalculate($input: DraftOrderInput!) {
      draftOrderCalculate(input: $input) {
        calculatedDraftOrder {
          availableShippingRates {
              price {
                  amount
                    }
          }
        }
      }
    }`,
    {
      variables: {
        input: {
          shippingAddress: {
            address1: input.shippingAddress?.address1,
            city: input.shippingAddress?.city,
            zip: input.shippingAddress?.zip,
            countryCode: "DE",
          },
          lineItems: input.lineItems,
        },
      },
    },
  );
  return response;
}
