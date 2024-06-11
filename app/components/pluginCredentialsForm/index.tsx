import { useSubmit } from "@remix-run/react";
import { Badge, BlockStack, Box, Button, TextField } from "@shopify/polaris";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";
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

  const handleOnChange = (value: string, id: string) => {
    if (id === "vendorId") {
      setCredentilasConfig((prev) => ({
        ...prev,
        [id]: value,
        clientId: value,
      }));
      return;
    }
    setCredentilasConfig((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = () => {
    const isFormFilled = Object.entries(credentilasConfig).every(
      ([key, value]) => key === "hash" || !!value,
    );

    if (!isFormFilled) {
      setFormError(true);
      return;
    }
    setFormError(false);

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
  };

  const handleAppMode = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, checked } = e.target;

    if (!checked) {
      setFormError(false);
      setCredentilasConfig((prev) => ({ ...prev, appMode: false }));

      const data = {
        shop: credentilasConfig.shop,
        appMode: false,
        _action: "credentialsAppMode",
      };
      submit(data, {
        method: "POST",
      });
      return;
    }
    const updatedPluginData = { ...credentilasConfig, [name]: checked };
    setCredentilasConfig(updatedPluginData);
  };

  useEffect(() => {
    console.log(
      "useEffect plugin credetials appMode",
      credentilasConfig.appMode,
    );

    if (!credentilasConfig.appMode) return;

    console.log("passou do if");
  }, [submit, credentilasConfig.shop, credentilasConfig.appMode]);

  return (
    <Box
      background="bg-fill"
      padding={{ md: "600" }}
      width="420px"
      borderRadius="300"
      minWidth="100%"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <h2 style={{ fontWeight: "bold", fontSize: "18px" }}>
          Händler-Anmeldedaten
        </h2>
        <Switch
          name="appMode"
          handleOnChange={handleAppMode}
          checkboxValue={credentilasConfig.appMode}
        />
      </div>
      {credentilasConfig.appMode && (
        <>
          <BlockStack gap={"300"}>
            <TextField
              id="vendorId"
              label="Händlernummer"
              autoComplete="off"
              value={credentilasConfig.vendorId}
              onChange={handleOnChange}
            />
            <TextField
              id="username"
              label="Benutzername"
              autoComplete="off"
              value={credentilasConfig.username}
              onChange={handleOnChange}
            />
            <TextField
              id="passwort"
              label="Passwort"
              autoComplete="off"
              value={credentilasConfig.passwort}
              onChange={handleOnChange}
            />
            <TextField
              id="apiKey"
              label="Api Key"
              autoComplete="off"
              value={credentilasConfig.apiKey}
              onChange={handleOnChange}
            />
            <TextField
              id="hash"
              label="Hash-Key (sofern vorhanden)"
              autoComplete="off"
              value={credentilasConfig.hash}
              onChange={handleOnChange}
            />
          </BlockStack>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "16px",
            }}
          >
            {clientDataOk === undefined ? (
              <div></div>
            ) : formError ? (
              <div>
                <Badge size="medium" tone="attention">
                  Alle Felder sind erforderlich
                </Badge>
              </div>
            ) : clientDataOk ? (
              <Badge size="medium" tone="success">
                Erfolgreich gespeichert
              </Badge>
            ) : (
              <Badge size="medium" tone="critical">
                Konfigurationsfehler
              </Badge>
            )}
            <Button
              onClick={handleSave}
              tone="success"
              variant="primary"
              size="medium"
            >
              Speichern
            </Button>
          </div>
        </>
      )}
    </Box>
  );
};
