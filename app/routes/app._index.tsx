import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { PluginCredentialsForm } from "~/components/pluginCredentialsForm";

import { authenticate } from "~/shopify.server";
import type {
  ShopPluginConfiguratorData,
  ShopPluginCredentialsData,
} from "~/types/databaseInterfaces";

import { PluginConfiguratorForm } from "~/components/pluginConfiguratorForm";
import {
  createOrUpdateShopPluginConfigurator,
  updateShopPluginConfigurator,
} from "~/models/configuratorPlugin.server";
import {
  createOrUpdateShopPluginCredentials,
  getShopPluginConfig,
  updateShopPluginCredentials,
} from "~/models/credentialsPlugin.server";
import { getLoaderResponse } from "~/utils/defaultResponse";
import { getConsorsClient } from "../consors/consorsApi";
import { formatData } from "../utils/formatData";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const { _action, ...values } = Object.fromEntries(formData);

  switch (_action) {
    case "credentialsAppMode":
      const appModeCredentialsActionForm = formatData(
        values,
        true,
      ) as Partial<ShopPluginCredentialsData>;

      const updatedCredentialsPluginBdData = await updateShopPluginCredentials(
        appModeCredentialsActionForm,
      );

      return updatedCredentialsPluginBdData
        ? null
        : { error: "Error saving AppMode credentails form data" };
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

    case "configuratorAppMode":
      const appModeConfiguratorActionForm = formatData(
        values,
        true,
      ) as Partial<ShopPluginConfiguratorData>;

      const currentCredentials = await getShopPluginConfig(
        appModeConfiguratorActionForm.shop ?? "",
      );
      if (!currentCredentials)
        return {
          error: `Credentials not found for the provide shop ${appModeConfiguratorActionForm.shop}`,
        };

      const appModeConfiguratorPluginBdData =
        await updateShopPluginConfigurator(
          appModeConfiguratorActionForm,
          currentCredentials.id,
        );

      return appModeConfiguratorPluginBdData
        ? null
        : { error: "Error saving calculator AppMode data" };

    case "configuratorForm":
      const configuratorActionForm = formatData(
        values,
        true,
      ) as ShopPluginConfiguratorData;

      const configuratorPluginBdData =
        await createOrUpdateShopPluginConfigurator(configuratorActionForm);

      return configuratorPluginBdData
        ? null
        : { error: "Error saving calculator form data" };
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

  const clientAuth = await consorsClient.jwt();

  return getLoaderResponse({
    pluginCredentialsData: credentials,
    pluginConfiguratorData: ShopPluginConfigurator,
    clientDataOk: clientAuth ? !!clientAuth : undefined,
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

  return (
    <div
      style={{
        margin: "24px 0 0 24px",
        maxWidth: "910px",
        borderRadius: "6px",
        padding: "24px",
        paddingTop: "12px",
        backgroundColor: "#f1f1f1",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "100%",
          marginBottom: "12px",
        }}
      >
        <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>Consors BNPL</h1>
        <img
          src="https://cdn.shopify.com/s/files/1/0758/3137/8199/files/ConsorsFinanzLogo.png?v=1701077799"
          alt="consors banner"
          style={{ maxHeight: "150px", maxWidth: "250px" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: "16px",
        }}
      >
        <div
          style={{
            height: "500px",
          }}
        >
          <PluginCredentialsForm
            clientDataOk={clientDataOk}
            pluginCredentialsData={pluginCredentialsData}
          />
        </div>
        <div
          style={{
            height: "500px",
            alignSelf: "flex-start",
          }}
        >
          <PluginConfiguratorForm
            clientDataOk={!pluginCredentialsData.appMode ? false : clientDataOk}
            configuratorDataOk={configuratorDataOk}
            pluginConfiguratorData={pluginConfiguratorData}
          />
        </div>
      </div>
    </div>
  );
}
