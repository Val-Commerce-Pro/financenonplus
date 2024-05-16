import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

export const action: LoaderFunction = async ({ request }) => {
  console.log("notification route render");
  const requestedURL = new URL(request.url);
  console.log("requestedURL", requestedURL);
  const orderId = requestedURL.searchParams.get("orderId");
  const status = requestedURL.searchParams.get("status");
  const hash = requestedURL.searchParams.get("hash");
  console.log("orderId, status, hash", orderId, status, hash);

  // if (orderId === null || status === null) {
  //   throw new Response(
  //     "Bad Request" /*", query parameter shop is mandatory"*/,
  //     {
  //       status: 400,
  //     },
  //   );
  // }

  const response = json("order");
  response.headers.append("Access-Control-Allow-Origin", "*");
  return requestedURL;
};
