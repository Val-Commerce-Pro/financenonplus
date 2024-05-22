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
      console.log("Processing configuratorForm");
      const configuratorActionForm = formatData(
        values,
        true,
      ) as ShopPluginConfiguratorData;

      console.log("Formatted Configurator Action Form: ", {
        ...configuratorActionForm,
      });

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
};

export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderResponseI> => {
  const { session } = await authenticate.admin(request);
  const pluginConfData = await getShopPluginConfig(session.shop);

  if (!pluginConfData) return getLoaderResponse({ shop: session.shop });

  const { ShopPluginConfigurator, ...credentials } = pluginConfData;

  const consorsClient = await getConsorsClient({
    shop: session.shop,
    apiKey: pluginConfData?.apiKey,
    passwort: pluginConfData?.passwort,
    username: pluginConfData?.username,
    vendorId: pluginConfData?.vendorId,
  });
  const clientAuth = await consorsClient?.jwt();

  return getLoaderResponse({
    pluginCredentialsData: credentials,
    pluginConfiguratorData: ShopPluginConfigurator,
    clientDataOk: !!clientAuth,
    shop: session.shop,
  });
};

export default function Index() {
  const loaderData = useLoaderData<LoaderResponseI>();
  const { clientDataOk, pluginConfiguratorData, pluginCredentialsData } =
    loaderData;
  console.log("loaderData", loaderData);

  return (
    <div
      style={{
        padding: "24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
      }}
    >
      <PluginCredentialsForm
        clientDataOk={clientDataOk}
        pluginCredentialsData={pluginCredentialsData}
      />
      <PluginConfiguratorForm
        clientDataOk={clientDataOk}
        pluginConfiguratorData={pluginConfiguratorData}
      />
    </div>
  );
}
