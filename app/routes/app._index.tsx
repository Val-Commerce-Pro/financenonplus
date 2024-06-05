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

export const action: ActionFunction = async ({ request }) => {
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

  const clientAuth = await consorsClient.jwt();

  // const clientIdByVendorId = await consorsClient.getClientIdByVendorId();
  // console.log("clientIdByVendorId", clientIdByVendorId);

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
    </div>
  );
}

/*
  [] check function to update orderId from consors, by sending no orderID when the finance starts
  [] check what happens if I can cancel after I receive a accept
  [] What to do when the merchant cancel an order even after the request is accepted
  [] Fix valitade hash notification function
*/
