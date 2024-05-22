import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getShopPluginConfig } from "~/models/credentialsPlugin.server";

export const loader: LoaderFunction = async ({ request }) => {
  const requestedURL = new URL(request.url);

  const shop = requestedURL.searchParams.get("shop");

  try {
    const pluginConfData = shop && (await getShopPluginConfig(shop));

    if (!pluginConfData) {
      return new Response("Invalid Credentials", {
        status: 404,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
    if (!pluginConfData.ShopPluginConfigurator) {
      return json(
        {
          appMode: false,
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
    const { id, ...rest } = ShopPluginConfigurator;
    const appPlugin = {
      credentials: {
        vendorId: pluginConfData.vendorId,
        appMode: pluginConfData.appMode,
        shop: pluginConfData.shop,
      },
      configurator: { ...rest },
    };
    return json(appPlugin, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
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
