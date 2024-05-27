import { getGraphqlClient } from "./getGraphqlClient";

export async function completeDraftOrder(shop: string, draftOrderId?: string) {
  const graphQlClient = await getGraphqlClient(shop);

  const response = await graphQlClient.request(
    `#graphql
    mutation draftOrderComplete($id: ID!) {
      draftOrderComplete(id: $id) {
        draftOrder {
          id,
          order {
            id,
            name
          }
        }
      }
    }`,
    {
      variables: {
        id: draftOrderId,
      },
    },
  );
  return response;
}
