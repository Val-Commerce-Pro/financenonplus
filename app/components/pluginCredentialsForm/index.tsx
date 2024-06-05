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
  const [formError, setFormError] = useState(false);
  const [credentilasConfig, setCredentilasConfig] =
    useState<ShopPluginCredentialsData>({
      username: pluginCredentialsData.username,
      vendorId: pluginCredentialsData.vendorId,
      apiKey: pluginCredentialsData.apiKey,
      appMode: pluginCredentialsData.appMode,
      clientId: pluginCredentialsData.vendorId,
      hash: pluginCredentialsData.hash,
      passwort: pluginCredentialsData.passwort,
      shop: pluginCredentialsData.shop,
    });

  console.log("credentilasConfig", credentilasConfig);
  const handleOnChange = (value: string, id: string) => {
    setFormError(false);
    setCredentilasConfig((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = () => {
    const isFormFilled = Object.values(credentilasConfig).every(
      (value) => value,
    );

    console.log("handleSave, isFormFilled", isFormFilled);
    if (!isFormFilled) {
      setFormError(true);
      return;
    }
    setSavingConfig(true);

    const actionData: ShopPluginCredentialsData = {
      ...credentilasConfig,
      clientId: credentilasConfig.vendorId,
    };
    const data = {
      ...actionData,
      _action: "credentialsForm",
    };
    submit(data, {
      method: "POST",
    });
    setSavingConfig(false);
  };

  const handleAppMode = (e: ChangeEvent<HTMLInputElement>): void => {
    setFormError(false);
    const { name, checked } = e.target;
    const updatedPluginData = { ...credentilasConfig, [name]: checked };
    setCredentilasConfig(updatedPluginData);
  };
  //TODO, change the color to green like the finance app
  return (
    <Box
      background="bg-fill"
      padding={{ md: "600" }}
      width="420px"
      borderRadius="300"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <h2 style={{ fontWeight: "bold", fontSize: "18px" }}>Credentials</h2>
        <Switch
          name="appMode"
          handleOnChange={handleAppMode}
          checkboxValue={credentilasConfig.appMode}
        />
        <img
          src="https://cdn.shopify.com/s/files/1/0758/3137/8199/files/ConsorsFinanzLogo.png?v=1701077799"
          alt="consors banner"
          style={{ maxHeight: "80px", maxWidth: "160px" }}
        />
      </div>
      {credentilasConfig.appMode && (
        <>
          <BlockStack gap={"300"}>
            <TextField
              id="vendorId"
              label="VendorID"
              autoComplete="off"
              value={credentilasConfig.vendorId}
              onChange={handleOnChange}
              requiredIndicator
            />
            <TextField
              id="username"
              label="Username"
              autoComplete="off"
              value={credentilasConfig.username}
              onChange={handleOnChange}
              requiredIndicator
            />
            <TextField
              id="passwort"
              label="Password"
              autoComplete="off"
              value={credentilasConfig.passwort}
              onChange={handleOnChange}
              requiredIndicator
            />
            <TextField
              id="apiKey"
              label="Api Key"
              autoComplete="off"
              value={credentilasConfig.apiKey}
              onChange={handleOnChange}
              requiredIndicator
            />
            <TextField
              id="hash"
              label="Notification Hash Key"
              autoComplete="off"
              value={credentilasConfig.hash}
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
            {formError && (
              <div>
                <Badge size="medium" tone="critical">
                  All fields are required
                </Badge>
              </div>
            )}
            {clientDataOk === undefined ? (
              <div></div>
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
              <Button onClick={handleSave} tone="success" variant="primary">
                Save
              </Button>
            )}
          </div>
        </>
      )}
    </Box>
  );
};
