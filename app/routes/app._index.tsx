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
  const pluginConfData = await getShopPluginConfig(session.shop);

  if (!pluginConfData) return getLoaderResponse({ shop: session.shop });

  const { ShopPluginConfigurator, ...credentials } = pluginConfData;

  const consorsClient = await getConsorsClient(session.shop);
  const clientAuth = await consorsClient?.jwt();
  const subscriptionsResponse = await consorsClient?.getSubscriptions();
  if (!subscriptionsResponse || !subscriptionsResponse.ok) {
    throw new Error(`HTTP error! Status: ${subscriptionsResponse?.status}`);
  }
  const subscriptions = await subscriptionsResponse.json();
  console.log("loader subscriptions", subscriptions);

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
  [] Fix shipping cost functinos, implement using debounce and fix helper message.
  [] Remove unncessary information from the Client Form, like, Salutation, telefone and data of birth.
    [] adpate the database and the functions with this new client form obj
  [] check if there is something that can be done about the refresh of the page and when the modal open.
  [] Add ConsorsOrderId into the notifications table to be able to update it when the notification arrive
  [] When the notification arrives, get the draftOrder into the database and then change the orderId into the bank, and then save it into the database.
  [] Add the code to validate the HASH key
  [] Check how can we receive the staatus details from the bank
*/
