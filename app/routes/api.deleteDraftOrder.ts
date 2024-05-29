import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { deleteDraftOrder } from "~/shopify/graphql/deleteDraftOrder";

export const loader: LoaderFunction = async ({ request }) => {
  const requestedURL = new URL(request.url);

  const shop = requestedURL.searchParams.get("shop");
  const draftOrderId = requestedURL.searchParams.get("draftOrderId");

  if (!shop || !draftOrderId) {
    return json(
      { error: "Shop not provided" },
      {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  }

  const deletedDraftOrder = await deleteDraftOrder(shop, draftOrderId);
  console.log("deletedDraftOrder", deletedDraftOrder);

  return json(
    { message: "Success", data: deletedDraftOrder },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
};
