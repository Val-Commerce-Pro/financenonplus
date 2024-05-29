import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getConsorsClient } from "~/consors/consorsApi";

export const loader: LoaderFunction = async ({ request }) => {
  const requestedURL = new URL(request.url);

  const shop = requestedURL.searchParams.get("shop");
  const page = requestedURL.searchParams.get("page");
  const size = requestedURL.searchParams.get("size");

  console.log("page", page);
  console.log("size", size);
  console.log("shop", shop);

  if (!shop || !page || !size) {
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
  const consorsClient = await getConsorsClient(shop);
  const subscriptionsResponse = await consorsClient?.getSubscriptions(
    page,
    size,
  );
  if (!subscriptionsResponse || !subscriptionsResponse.ok) {
    throw new Error(`HTTP error! Status: ${subscriptionsResponse?.status}`);
  }
  const subscriptions = await subscriptionsResponse.json();

  return json(
    { message: "Success", data: subscriptions },
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
};
