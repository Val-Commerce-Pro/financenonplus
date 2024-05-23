import type { ActionFunctionArgs } from "@remix-run/node";
import { webhook_ordersCancel } from "~/shopify/webhooks/ordersCancel";
import { webhook_ordersCreate } from "~/shopify/webhooks/ordersCreate";
import { webhook_ordersFulfillment } from "~/shopify/webhooks/ordersFulfillment";
import { webhook_refundsCreate } from "~/shopify/webhooks/refundsCreate";
import db from "../db.server";
import { authenticate } from "../shopify.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const { topic, shop, session, admin, payload } =
    await authenticate.webhook(request);

  if (!admin) {
    // The admin context isn't returned if the webhook fired after a shop was uninstalled.
    throw new Response();
  }

  switch (topic) {
    case "APP_UNINSTALLED":
      if (session) {
        await db.session.deleteMany({ where: { shop } });
      }
      break;
    case "ORDERS_CREATE":
      webhook_ordersCreate(shop, payload);
      return new Response("webhook ORDERS_CREATE", { status: 200 });
    case "ORDERS_FULFILLED":
      webhook_ordersFulfillment(shop, payload);
      return new Response("webhook ORDERS_FULFILLED", { status: 200 });
    case "ORDERS_CANCELLED":
      webhook_ordersCancel(shop, payload);
      return new Response("webhook ORDERS_CANCELLED", { status: 200 });
    case "REFUNDS_CREATE":
      webhook_refundsCreate(shop, payload);
      return new Response("webhook ORDERS_CANCELLED", { status: 200 });
    case "CUSTOMERS_DATA_REQUEST":
    case "CUSTOMERS_REDACT":
    case "SHOP_REDACT":
    default:
      throw new Response("Unhandled webhook topic", { status: 404 });
  }

  throw new Response();
};
