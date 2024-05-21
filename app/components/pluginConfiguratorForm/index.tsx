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
import type { ShopPluginConfiguratorData } from "~/types/databaseInterfaces";
import { Switch } from "../switch";

type PluginConfiguratorFormProps = {
  clientDataOk: LoaderResponseI["clientDataOk"];
  pluginConfiguratorData: LoaderResponseI["pluginConfiguratorData"];
};

export const PluginConfiguratorForm = ({
  clientDataOk,
  pluginConfiguratorData,
}: PluginConfiguratorFormProps) => {
  const submit = useSubmit();
  const [savingConfig, setSavingConfig] = useState(false);
  const [pluginConfig, setPluginConfig] = useState<ShopPluginConfiguratorData>({
    shop: pluginConfiguratorData.shop ?? "",
    appMode: pluginConfiguratorData.appMode ?? false,
    minOrderValue: pluginConfiguratorData.minOrderValue ?? 100,
    terms: pluginConfiguratorData.terms ?? "",
    zeroPercent: pluginConfiguratorData.zeroPercent ?? "",
    interestRate: pluginConfiguratorData.interestRate ?? "",
    promotionalInterestRate:
      pluginConfiguratorData.promotionalInterestRate ?? 0,
  });

  const handleOnChange = (value: string, id: string) => {
    setPluginConfig((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = () => {
    console.log("handle save called pluginConfig", { ...pluginConfig });
    setSavingConfig(true);
    const data = {
      pluginConfig,
      _action: "configuratorForm",
    };
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
      {/* <ui-title-bar title="Einstellungen"> </ui-title-bar> */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <h2 style={{ fontWeight: "bold", fontSize: "18px" }}>Configurator</h2>
        <Switch
          name="appMode"
          handleOnChange={handleAppMode}
          checkboxValue={pluginConfig.appMode}
          disabled={!clientDataOk}
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
              id="shop"
              label="Shop"
              autoComplete="off"
              value={pluginConfig.shop}
              onChange={handleOnChange}
              requiredIndicator
            />
            <TextField
              id="minOrderValue"
              label="Minimum Order Value"
              type="number"
              autoComplete="off"
              value={pluginConfig.minOrderValue.toString()}
              onChange={handleOnChange}
              requiredIndicator
            />
            <TextField
              id="terms"
              label="Terms"
              autoComplete="off"
              value={pluginConfig.terms}
              onChange={handleOnChange}
              requiredIndicator
            />
            <TextField
              id="zeroPercent"
              label="Zero Percent Financing"
              autoComplete="off"
              value={pluginConfig.zeroPercent}
              onChange={handleOnChange}
              requiredIndicator
            />
            <TextField
              id="interestRate"
              label="Interest Rate"
              autoComplete="off"
              value={pluginConfig.interestRate}
              onChange={handleOnChange}
              requiredIndicator
            />
            <TextField
              id="promotionalInterestRate"
              label="Promotional Interest Rate"
              type="number"
              autoComplete="off"
              value={pluginConfig.promotionalInterestRate.toString()}
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
