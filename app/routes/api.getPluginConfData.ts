import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getShopPluginConfig } from "~/models/credentialsPlugin.server";

export const loader: LoaderFunction = async ({ request }) => {
  const requestedURL = new URL(request.url);

  const shop = requestedURL.searchParams.get("shop");

  try {
    const pluginConfData = shop && (await getShopPluginConfig(shop));

    if (!pluginConfData) {
      return new Response("No configuration found for this shop", {
        status: 404,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
    const pluginCredentials = {
      vendorId: pluginConfData.vendorId,
      appMode: pluginConfData.appMode,
      shop: pluginConfData.shop,
    };
    if (!pluginConfData.ShopPluginConfigurator) {
      return json(
        {
          pluginCredentials,
          pluginConfigurator: { appMode: false },
        },
        {
          status: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        },
      );
    }

    const { ShopPluginConfigurator } = pluginConfData;
    const { id, shopCredentialsId, ...rest } = ShopPluginConfigurator;
    return json(
      {
        pluginCredentials,
        pluginConfigurator: { ...rest },
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response("Internal Server Error", {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
};
