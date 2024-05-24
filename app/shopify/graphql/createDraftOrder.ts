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

export interface CustomAttribute {
  key: string;
  value: string;
}

interface LineItem {
  variantId: string;
  quantity: number;
}

export interface DraftOrderInput {
  customerId?: string;
  note: string;
  email: string;
  taxExempt: boolean;
  tags: string;
  shippingLine: ShippingLine;
  shippingAddress: Address;
  billingAddress: Address;
  customAttributes: CustomAttribute[];
  lineItems: LineItem[];
}

export async function createDraftOrder(shop: string, input: DraftOrderInput) {
  const graphQlClient = await getGraphqlClient(shop);

  const response = await graphQlClient.request(
    `mutation draftOrderCreate($input: DraftOrderInput!) {
      draftOrderCreate(input: $input) {
        draftOrder {
          id,
          name,
          customAttributes {
            key
            value
          }
        }
      }
    }`,
    { variables: { input } },
  );
  return response;
}
