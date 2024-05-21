import { useSubmit } from "@remix-run/react";
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
import type { LoaderResponseI } from "~/routes/app._index";
import type { ShopPluginCredentialsData } from "~/types/databaseInterfaces";
import { Switch } from "../switch";

type PluginCredentialsFormProps = {
  clientDataOk: LoaderResponseI["clientDataOk"];
  pluginCredentialsData: LoaderResponseI["pluginCredentialsData"];
};

export const PluginCredentialsForm = ({
  clientDataOk,
  pluginCredentialsData,
}: PluginCredentialsFormProps) => {
  const submit = useSubmit();
  const [savingConfig, setSavingConfig] = useState(false);
  const [pluginConfig, setPluginConfig] = useState<ShopPluginCredentialsData>({
    username: pluginCredentialsData.username,
    vendorId: pluginCredentialsData.vendorId,
    apiKey: pluginCredentialsData.apiKey,
    appMode: pluginCredentialsData.appMode,
    clientId: pluginCredentialsData.vendorId,
    hash: pluginCredentialsData.hash,
    passwort: pluginCredentialsData.passwort,
    shop: pluginCredentialsData.shop,
  });

  const handleOnChange = (value: string, id: string) => {
    console.log("OncHange value and Id", value, id);
    setPluginConfig((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = () => {
    setSavingConfig(true);

    const actionData: ShopPluginCredentialsData = {
      ...pluginConfig,
      clientId: pluginConfig.vendorId
    }
    const data = {
       ...actionData,
      _action: "credentialsForm",
    };
    console.log("handle save called PluginCredentialsForm", { ...data });
    submit(data, {
      method: "POST",
    });
    setSavingConfig(false);
  };

  const handleAppMode = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, checked } = e.target;
    const updatedPluginData = { ...pluginConfig, [name]: checked };
    console.log("updatedPluginData", updatedPluginData);
    setPluginConfig(updatedPluginData);
  };

  return (
    <Box
      background="bg-fill"
      padding={{ md: "600" }}
      width="420px"
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
      {pluginConfig.appMode && (
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
  );
};
