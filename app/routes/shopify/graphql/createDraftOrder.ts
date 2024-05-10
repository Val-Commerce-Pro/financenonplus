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

interface CustomAttribute {
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
  phone?: string;
  taxExempt?: boolean;
  tags?: string;
  visibleToCustomer?: boolean;
  shippingLine?: ShippingLine;
  shippingAddress?: Address;
  billingAddress: Address;
  customAttributes: CustomAttribute[];
  lineItems: LineItem[];
}

export async function createDraftOrder(shop: string, input?: DraftOrderInput) {
  const graphQlClient = await getGraphqlClient(shop);

  const response = await graphQlClient.request(
    `mutation draftOrderCreate($input: DraftOrderInput!) {
      draftOrderCreate(input: $input) {
        draftOrder {
          id
        }
      }
    }`,
    {
      variables: {
        input: {
          note: "note",
          email: "vf@commerce-pro.de",
          taxExempt: true,
          tags: "FinanceNonPlus",
          // customAttributes: [
          //   { key: "name", value: input.customAttributes[0].value },
          // ],
          shippingAddress: {
            address1: "input.shippingAddress?.address1",
            city: "hamburg",
            zip: "20146",
            countryCode: "DE",
          },
          billingAddress: {
            address1: "input.shippingAddress?.address1",
            city: "hamburg",
            zip: "20146",
            countryCode: "DE",
          },
          lineItems: {
            quantity: 1,
            variant_id: "gid://shopify/ProductVariant/45118547165463",
          },
        },
      },
    },
  );
  return response;
}
