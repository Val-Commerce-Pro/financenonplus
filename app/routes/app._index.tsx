import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData, useSubmit } from "@remix-run/react";
import {
  Badge,
  BlockStack,
  Box,
  Button,
  Spinner,
  TextField,
} from "@shopify/polaris";
import type { ChangeEvent } from "react";
import { useState } from "react";
import {
  createOrUpdateShopPluginConfig,
  getShopPluginConfig,
} from "~/models/shopPluginConfig.server";
import { authenticate } from "~/shopify.server";
import type { ShopPluginConfigData } from "~/types/databaseInterfaces";
import { Switch } from "../components/switch";
import { getConsorsClient } from "../consors/consorsApi";
import { formatData } from "../utils/formatData";
// import { createDraftOrder } from "./shopify/graphql/createDraftOrder";

export const action: ActionFunction = async ({ request }) => {
  console.log("ACtion function rendered");
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();
  const { ...values } = Object.fromEntries(formData);
  console.log("session, formData, values", session, formData, values);

  const dataActionForm = formatData(values, true) as ShopPluginConfigData;
  console.log("format data", dataActionForm);
  const shopConfigPlugin = await createOrUpdateShopPluginConfig(dataActionForm);
  console.log("shopConfigPlugin", shopConfigPlugin);
  // const formData = await request.formData();
  // const { _action, ...values } = Object.fromEntries(formData);
  // console.log("action function called with this data ", formData);
  // const draftorder = await createDraftOrder("financenonplus.myshopify.com");
  // console.log("session, draftOrder, values", session, draftorder, values);
  return null;
};

type LoaderResponseI = {
  pluginConfData: {
    username: string;
    vendorId: string;
    apiKey: string;
    appMode: boolean;
    clientId: string;
    hash: string;
    passwort: string;
    shop: string;
  };
  clientDataOk?: boolean;
};

export const loader: LoaderFunction = async ({
  request,
}): Promise<LoaderResponseI> => {
  console.log("Loader function rendered");
  const { session } = await authenticate.admin(request);
  const pluginConfData = await getShopPluginConfig(session.shop);

  const consorsClient = await getConsorsClient(session.shop);
  const clientAuth = await consorsClient?.jwt();

  const defaultResponse = {
    pluginConfData: {
      username: "",
      vendorId: "",
      apiKey: "",
      appMode: false,
      clientId: "",
      hash: "",
      passwort: "",
      shop: session.shop,
    },
    clientDataOk: undefined,
  };

  if (!pluginConfData) return defaultResponse;

  return {
    pluginConfData,
    clientDataOk: !!clientAuth,
  };
};

export default function Index() {
  const submit = useSubmit();
  const [savingConfig, setSavingCofig] = useState(false);
  const loaderData = useLoaderData<LoaderResponseI>();
  const { clientDataOk, pluginConfData } = loaderData;
  const [pluginConfig, setPluginConfig] = useState<ShopPluginConfigData>({
    username: pluginConfData.username ?? "",
    vendorId: pluginConfData.vendorId ?? "",
    apiKey: pluginConfData.apiKey ?? "",
    appMode: pluginConfData.appMode ?? false,
    clientId: pluginConfData.vendorId ?? "",
    hash: pluginConfData.hash ?? "",
    passwort: pluginConfData.passwort ?? "",
    shop: pluginConfData.shop ?? "",
  });

  const handleSave = () => {
    console.log("handle save called pluginConfig", { ...pluginConfig });
    setSavingCofig(true);
    submit(
      { ...pluginConfig },
      {
        method: "POST",
      },
    );
    setSavingCofig(false);
  };

  const handleAppMode = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, checked } = e.target;
    console.log("handleAppMode checked and Id", checked, name);
    const updatedPluginData = { ...pluginConfig, [name]: checked };
    console.log("updatedPluginData", updatedPluginData);
    setPluginConfig(updatedPluginData);
  };

  const handleOnChange = (value: string, id: string) => {
    console.log("OncHange value and Id", value, id);
    setPluginConfig((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div
      style={{
        padding: "24px",
      }}
    >
      <Box
        background="bg-fill"
        padding={{ md: "600" }}
        width="500px"
        borderRadius="300"
      >
        <ui-title-bar title="Einstellungen"> </ui-title-bar>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <h2 style={{ fontWeight: "bold", fontSize: "18px" }}>Consors BNPL</h2>
          <Switch
            name="appMode"
            handleOnChange={handleAppMode}
            checkboxValue={pluginConfig.appMode}
          />
          <img
            src="https://cdn.shopify.com/s/files/1/0758/3137/8199/files/ConsorsFinanzLogo.png?v=1701077799"
            alt="consors banner"
            style={{ maxHeight: "80px", maxWidth: "160px" }}
          />
        </div>

        {pluginConfData.appMode && (
          <>
            <BlockStack gap={"300"}>
              <TextField
                id="vendorId"
                label="VendorID"
                autoComplete="off"
                value={pluginConfig.vendorId}
                onChange={handleOnChange}
                requiredIndicator
              />
              <TextField
                id="username"
                label="Username"
                autoComplete="off"
                value={pluginConfig.username}
                onChange={handleOnChange}
                requiredIndicator
              />
              <TextField
                id="passwort"
                label="Password"
                autoComplete="off"
                value={pluginConfig.passwort}
                onChange={handleOnChange}
                requiredIndicator
              />
              <TextField
                id="apiKey"
                label="Api Key"
                autoComplete="off"
                value={pluginConfig.apiKey}
                onChange={handleOnChange}
                requiredIndicator
              />
              <TextField
                id="hash"
                label="Notification Hash Key"
                autoComplete="off"
                value={pluginConfig.hash}
                onChange={handleOnChange}
                requiredIndicator
              />
            </BlockStack>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              {clientDataOk === undefined ? (
                <></>
              ) : clientDataOk ? (
                <Badge size="medium" tone="success">
                  Credentials Success
                </Badge>
              ) : (
                <Badge size="medium" tone="attention">
                  Credentials Error
                </Badge>
              )}
              {savingConfig ? (
                <div
                  style={{
                    marginRight: "25px",
                  }}
                >
                  <Spinner
                    size="small"
                    accessibilityLabel="Loading Saving data"
                  />
                </div>
              ) : (
                <Button onClick={handleSave}>Save</Button>
              )}
            </div>
          </>
        )}
      </Box>
    </div>
  );
}
