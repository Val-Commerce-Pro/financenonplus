import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

export const action: LoaderFunction = async ({ request }) => {
  console.log("notification route render");
  const requestedURL = new URL(request.url);
  console.log("requestedURL", requestedURL);
  const orderId = requestedURL.searchParams.get("order_id");
  const transactionId = requestedURL.searchParams.get("transaction_id");
  const statusDetail = requestedURL.searchParams.get("status_detail");
  const status = requestedURL.searchParams.get("status");
  const hash = requestedURL.searchParams.get("hash");
  console.log(
    "orderId, status, hash",
    orderId,
    transactionId,
    statusDetail,
    status,
    hash,
  );

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
