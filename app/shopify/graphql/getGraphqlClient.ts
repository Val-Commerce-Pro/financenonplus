import { shopifyApi } from "@shopify/shopify-api";
import "@shopify/shopify-app-remix/adapters/node";

import { LATEST_API_VERSION } from "@shopify/shopify-app-remix";

import prisma from "../../db.server";

const appHostName = process.env.SHOPIFY_APP_URL;

const api = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey:
    process.env.SHOPIFY_API_SECRET || "a6c1a9acfc6859f61ffc9dbe192dc515",
  apiVersion: LATEST_API_VERSION,
  scopes: process.env.SCOPES?.split(","),
  hostName: appHostName!,
  isEmbeddedApp: true,
});

export function getGraphqlClient(shop: string) {
  // might throw an exception, if no session for the shop exists
  return prisma.session.findFirst({ where: { shop } }).then((session) => {
    if (session == null) {
      throw "no session for given shop"; // TODO: handle exception
    }
    return new api.clients.Graphql({ session: session as any }); // TODO: convert types if neccessary
  });
}