import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { PluginCredentialsForm } from "~/components/pluginCredentialsForm";
import {
  createOrUpdateShopPluginCredentials,
  getShopPluginConfig,
  updateShopPluginConfigurator,
  updateShopPluginCredentials,
} from "~/models/shopPluginConfig.server";
import { authenticate } from "~/shopify.server";
import type {
  ShopPluginConfiguratorData,
  ShopPluginCredentialsData,
} from "~/types/databaseInterfaces";

import { PluginConfiguratorForm } from "~/components/pluginConfiguratorForm";
import { getConsorsClient } from "../consors/consorsApi";
import { formatData } from "../utils/formatData";

export const action: ActionFunction = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();
  const { _action, ...values } = Object.fromEntries(formData);
  console.log("session, formData, values", session, formData, values);

  switch (_action) {
    case "credentialsMode":
      const credentialsModeActionForm = formatData(
        values,
        true,
      ) as Partial<ShopPluginCredentialsData>;

      const updatedCredentialsModePluginBdData =
        await updateShopPluginCredentials(credentialsModeActionForm);
      console.log(
        "updatedCredentialsModePluginBdData",
        updatedCredentialsModePluginBdData,
      );

      return updatedCredentialsModePluginBdData
        ? null
        : { error: "Error saving client form data" };

    case "configuratorMode":
      const configuratorModeActionForm = formatData(
        values,
        true,
      ) as Partial<ShopPluginConfiguratorData>;

      const updatedConfiguratorModePluginBdData =
        await updateShopPluginConfigurator(configuratorModeActionForm);
      console.log(
        "updatedConfiguratorModePluginBdData",
        updatedConfiguratorModePluginBdData,
      );

      return updatedConfiguratorModePluginBdData
        ? null
        : { error: "Error saving client form data" };

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

      // const configuratorPluginBdData =
      //   await createOrUpdateShopPluginConfigurator(configuratorActionForm);
      // console.log("configuratorPluginBdData", configuratorPluginBdData);

      // return configuratorPluginBdData
      //   ? null
      //   : { error: "Error saving client form data" };
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

  console.log("pluginConfData form DB", pluginConfData);

  const consorsClient = await getConsorsClient(session.shop);
  const clientAuth = await consorsClient?.jwt();

  const defaultResponse = {
    pluginCredentialsData: {
      username: "",
      vendorId: "",
      apiKey: "",
      appMode: false,
      clientId: "",
      hash: "",
      passwort: "",
      shop: session.shop,
    },
    pluginConfiguratorData: {
      shop: "",
      appMode: false,
      minOrderValue: 100,
      terms: "",
      zeroPercent: "",
      interestRate: "",
      promotionalInterestRate: 0,
      aktionsZinsMonate: 0,
      ShopPluginCredentials: null, // Assuming this is an object or can be null
    },
    clientDataOk: undefined,
  };

  if (!pluginConfData) return defaultResponse;

  return {
    pluginCredentialsData: defaultResponse.pluginCredentialsData,
    pluginConfiguratorData: defaultResponse.pluginConfiguratorData,
    clientDataOk: !!clientAuth,
  };
};

export default function Index() {
  const loaderData = useLoaderData<LoaderResponseI>();
  const { clientDataOk, pluginConfiguratorData, pluginCredentialsData } =
    loaderData;

  return (
    <div
      style={{
        padding: "24px",
      }}
    >
      {pluginCredentialsData.appMode && (
        <PluginCredentialsForm
          clientDataOk={clientDataOk}
          pluginCredentialsData={pluginCredentialsData}
        />
      )}
      {pluginConfiguratorData.appMode && (
        <PluginConfiguratorForm
          clientDataOk={clientDataOk}
          pluginConfiguratorData={pluginConfiguratorData}
        />
      )}
    </div>
  );
}
