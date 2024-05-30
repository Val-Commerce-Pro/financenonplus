import { useSubmit } from "@remix-run/react";
import {
  Badge,
  BlockStack,
  Box,
  Button,
  Icon,
  Select,
  TextField,
  Tooltip,
} from "@shopify/polaris";
import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";

import { InfoIcon } from "@shopify/polaris-icons";
import type { LoaderResponseI } from "~/routes/app._index";
import type { ShopPluginConfiguratorData } from "~/types/databaseInterfaces";
import { Switch } from "../switch";

type PluginConfiguratorFormProps = {
  clientDataOk: LoaderResponseI["clientDataOk"];
  configuratorDataOk: LoaderResponseI["configuratorDataOk"];
  pluginConfiguratorData: LoaderResponseI["pluginConfiguratorData"];
};
type AktionszinsOptionsI = {
  label: string;
  value: string;
}[];

export const PluginConfiguratorForm = ({
  clientDataOk,
  pluginConfiguratorData,
  configuratorDataOk,
}: PluginConfiguratorFormProps) => {
  const submit = useSubmit();
  const [formError, setFormError] = useState(false);
  const [configuratorFormData, setConfiguratorFormData] =
    useState<ShopPluginConfiguratorData>({
      shop: pluginConfiguratorData.shop,
      appMode: pluginConfiguratorData.appMode,
      minOrderValue: pluginConfiguratorData.minOrderValue,
      terms: pluginConfiguratorData.terms,
      campaign: pluginConfiguratorData.campaign,
      interestRate: pluginConfiguratorData.interestRate,
      campaignDuration: pluginConfiguratorData.campaignDuration,
    });

  const aktionszinsOptions: AktionszinsOptionsI = [
    { label: "0", value: "0" },
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
  ];

  const checkFormFilled = () => {
    return Object.values(configuratorFormData).every((value) => value);
  };

  const handleOnChange = (value: string, id: string) => {
    setFormError(false);
    setConfiguratorFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = () => {
    const isFormFilled = checkFormFilled();

    if (!isFormFilled) {
      setFormError(true);
      return;
    }
    const data = {
      ...configuratorFormData,
      _action: "configuratorForm",
    };
    submit(data, {
      method: "POST",
    });
  };

  const handleAppMode = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, checked } = e.target;
    const updatedPluginData = { ...configuratorFormData, [name]: checked };
    setConfiguratorFormData(updatedPluginData);
  };

  useEffect(() => {
    if (!configuratorDataOk) {
      const data = {
        shop: pluginConfiguratorData.shop,
        appMode: false,
        _action: "configuratorForm",
      };
      submit(data, {
        method: "POST",
      });
    }
  }, [configuratorDataOk, submit, pluginConfiguratorData.shop]);

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
        <h2 style={{ fontWeight: "bold", fontSize: "18px" }}>Configurator</h2>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "10px",
            border: "1px soild rgba(0, 0, 0, 0.9)",
          }}
        >
          <Tooltip
            content={
              "This modulo can only be activated with the correct credentials in place."
            }
            borderRadius="100"
          >
            <Icon source={InfoIcon} tone="base" />
          </Tooltip>
          <Switch
            name="appMode"
            handleOnChange={handleAppMode}
            checkboxValue={configuratorFormData.appMode}
            disabled={!clientDataOk}
          />
        </div>
        <img
          src="https://cdn.shopify.com/s/files/1/0758/3137/8199/files/ConsorsFinanzLogo.png?v=1701077799"
          alt="consors banner"
          style={{ maxHeight: "80px", maxWidth: "160px" }}
        />
      </div>
      {configuratorFormData.appMode && (
        <>
          <BlockStack gap={"300"}>
            <TextField
              id="minOrderValue"
              label="Mindestbestellwert"
              type="number"
              autoComplete="off"
              value={configuratorFormData.minOrderValue.toString()}
              onChange={handleOnChange}
              requiredIndicator
            />
            <TextField
              id="terms"
              label="Laufzeiten"
              autoComplete="off"
              value={configuratorFormData.terms}
              onChange={handleOnChange}
              requiredIndicator
            />
            <TextField
              id="interestRate"
              label="Zinssätze"
              autoComplete="off"
              value={configuratorFormData.interestRate}
              onChange={handleOnChange}
              requiredIndicator
            />
            <Select
              id="campaign"
              label="Aktionszins"
              options={aktionszinsOptions}
              onChange={handleOnChange}
              value={configuratorFormData.campaign}
              requiredIndicator
            />
            <TextField
              id="campaignDuration"
              label="Monate mit Nullprozentfinanzierung"
              type="number"
              autoComplete="off"
              value={configuratorFormData.campaignDuration}
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
            {configuratorDataOk === undefined && <div></div>}
            {configuratorDataOk ? (
              <Badge size="medium" tone="success">
                Successfully saved
              </Badge>
            ) : (
              <Badge size="medium" tone="attention">
                Configurator Error
              </Badge>
            )}
            <Button onClick={handleSave}>Save</Button>
          </div>
        </>
      )}
    </Box>
  );
};
