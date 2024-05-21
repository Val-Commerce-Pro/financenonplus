import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { PluginCredentialsForm } from "~/components/pluginCredentialsForm";
import {
  createOrUpdateShopPluginCredentials,
  getShopPluginConfig,
} from "~/models/shopPluginConfig.server";
import { authenticate } from "~/shopify.server";
import type {
  ShopPluginConfiguratorData,
  // ShopPluginConfiguratorData,
  ShopPluginCredentialsData,
} from "~/types/databaseInterfaces";

import { PluginConfiguratorForm } from "~/components/pluginConfiguratorForm";
import { getLoaderResponse } from "~/utils/defaultResponse";
import { getConsorsClient } from "../consors/consorsApi";
import { formatData } from "../utils/formatData";

export const action: ActionFunction = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();
  const { _action, ...values } = Object.fromEntries(formData);
  console.log("session, formData, values", session, formData, values);

  switch (_action) {
    case "credentialsForm":
      const credentialsActionForm = formatData(
        values,
        true,
      ) as ShopPluginCredentialsData;

      const credentialsPluginBdData = await createOrUpdateShopPluginCredentials(
        credentialsActionForm,
      );
      console.log("credentialsPluginBdData", credentialsPluginBdData);

      return credentialsPluginBdData
        ? null
        : { error: "Error saving client form data" };

    case "configuratorForm":
      console.log("Processing configuratorForm");
      const configuratorActionForm = formatData(values, true);
      console.log(
        "Formatted Configurator Action Form: ",
        configuratorActionForm,
      );
      return null;
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
  console.log("Loader function rendered");
  const { session } = await authenticate.admin(request);
  const pluginConfData = await getShopPluginConfig(session.shop);

  if (!pluginConfData) return getLoaderResponse({});

  const { ShopPluginConfigurator, ...credentials } = pluginConfData;

  console.log("pluginConfData form DB", pluginConfData);

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
