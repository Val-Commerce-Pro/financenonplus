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
  // phone?: string;
  taxExempt: boolean;
  tags: string;
  // visibleToCustomer?: boolean;
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
          customAttributes
        }
      }
    }`,
    {
      variables: {
        input,
      },
    },
    // {
    //   variables: {
    //     input: {
    //       note: input.note,
    //       email: input.email,
    //       taxExempt: input.taxExempt,
    //       tags: input.tags,
    //       customAttributes: input.customAttributes,
    //       shippingAddress: {
    //         address1: input.shippingAddress.address1,
    //         city: input.shippingAddress.city,
    //         zip: input.shippingAddress.zip,
    //         countryCode: input.shippingAddress.countryCode,
    //       },
    //       billingAddress: {
    //         address1: input.shippingAddress.address1,
    //         city: input.shippingAddress.city,
    //         zip: input.shippingAddress.zip,
    //         countryCode: input.shippingAddress.countryCode,
    //       },
    //       lineItems: input.lineItems,
    //     },
    //   },
    // },
  );
  return response;
}
