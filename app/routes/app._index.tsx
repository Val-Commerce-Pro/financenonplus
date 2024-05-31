import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { PluginCredentialsForm } from "~/components/pluginCredentialsForm";

import { authenticate } from "~/shopify.server";
import type {
  ShopPluginConfiguratorData,
  ShopPluginCredentialsData,
} from "~/types/databaseInterfaces";

import { PluginConfiguratorForm } from "~/components/pluginConfiguratorForm";
import { createOrUpdateShopPluginConfigurator } from "~/models/configuratorPlugin.server";
import {
  createOrUpdateShopPluginCredentials,
  getShopPluginConfig,
} from "~/models/credentialsPlugin.server";
import { getLoaderResponse } from "~/utils/defaultResponse";
import { getConsorsClient } from "../consors/consorsApi";
import { formatData } from "../utils/formatData";

//TODO: RETURN Actino values as validation from database entrys
export const action: ActionFunction = async ({ request }) => {
  // const { session } = await authenticate.admin(request);
  const formData = await request.formData();
  const { _action, ...values } = Object.fromEntries(formData);

  switch (_action) {
    case "credentialsForm":
      const credentialsActionForm = formatData(
        values,
        true,
      ) as ShopPluginCredentialsData;

      const credentialsPluginBdData = await createOrUpdateShopPluginCredentials(
        credentialsActionForm,
      );

      return credentialsPluginBdData
        ? null
        : { error: "Error saving client form data" };

    case "configuratorForm":
      const configuratorActionForm = formatData(
        values,
        true,
      ) as ShopPluginConfiguratorData;

      const configuratorPluginBdData =
        await createOrUpdateShopPluginConfigurator(configuratorActionForm);

      return configuratorPluginBdData
        ? null
        : { error: "Error saving client form data" };
    default:
      return null;
  }
};

export type LoaderResponseI = {
  pluginCredentialsData: ShopPluginCredentialsData;
  pluginConfiguratorData: ShopPluginConfiguratorData;
  clientDataOk?: boolean;
  configuratorDataOk?: boolean;
};

export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderResponseI> => {
  const { session } = await authenticate.admin(request);
  const consorsClient = await getConsorsClient(session.shop);
  const pluginConfData = await getShopPluginConfig(session.shop);

  if (!pluginConfData || !consorsClient)
    return getLoaderResponse({ shop: session.shop });

  const { ShopPluginConfigurator, ...credentials } = pluginConfData;

  const clientAuth = await consorsClient?.jwt();

  const clientIdByVendorId = await consorsClient.getClientIdByVendorId();

  console.log("clientIdByVendorId", clientIdByVendorId);

  return getLoaderResponse({
    pluginCredentialsData: credentials,
    pluginConfiguratorData: ShopPluginConfigurator,
    clientDataOk: !!clientAuth,
    shop: session.shop,
  });
};

export default function Index() {
  const loaderData = useLoaderData<LoaderResponseI>();
  const {
    clientDataOk,
    pluginConfiguratorData,
    pluginCredentialsData,
    configuratorDataOk,
  } = loaderData;
  console.log("loaderData", loaderData);

  return (
    <div
      style={{
        padding: "24px",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: "16px",
      }}
    >
      <PluginCredentialsForm
        clientDataOk={clientDataOk}
        pluginCredentialsData={pluginCredentialsData}
      />
      <PluginConfiguratorForm
        clientDataOk={clientDataOk}
        configuratorDataOk={configuratorDataOk}
        pluginConfiguratorData={pluginConfiguratorData}
      />
    </div>
  );
}

/*
  [] check function to update orderId from consors, by sending no orderID when the finance starts
  [] check what happens if I can cancel after I receive a accept
  [] What to do when the merchant cancel an order even after the request is accepted
  [] Fix notification function
*/
