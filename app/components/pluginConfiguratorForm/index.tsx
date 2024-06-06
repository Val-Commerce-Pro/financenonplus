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
  const isClientAllowedToUseAkitions = false;
  const [formError, setFormError] = useState(false);
  const submit = useSubmit();
  const [configuratorFormData, setConfiguratorFormData] =
    useState<ShopPluginConfiguratorData>({
      shop: pluginConfiguratorData.shop,
      appMode: pluginConfiguratorData.appMode,
      minOrderValue: pluginConfiguratorData.minOrderValue,
      period: pluginConfiguratorData.period,
      minPeriod: pluginConfiguratorData.minPeriod,
      stepPeriod: pluginConfiguratorData.stepPeriod,
      campaign: pluginConfiguratorData.campaign,
      interestRate: pluginConfiguratorData.interestRate,
      campaignDuration: pluginConfiguratorData.campaignDuration,
    });

  const checkFormFilled = () => {
    return Object.values(configuratorFormData).every((value) => value);
  };

  const aktionszinsOptions: AktionszinsOptionsI = [
    { label: "0", value: "0" },
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
  ];

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
    console.log("useEffect plugin Configurator", clientDataOk);
    if (!clientDataOk) {
      console.log("passou do if");
      setConfiguratorFormData((prev) => ({ ...prev, appMode: false }));
      const data = {
        shop: pluginConfiguratorData.shop,
        appMode: false,
        _action: "configuratorForm",
      };
      submit(data, {
        method: "POST",
      });
    }
  }, [clientDataOk, submit, pluginConfiguratorData.shop]);

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
            checkboxValue={true}
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
            />
            <TextField
              id="minPeriod"
              label="Mindestlaufzeit"
              autoComplete="off"
              value={configuratorFormData.minPeriod}
              onChange={handleOnChange}
            />
            <TextField
              id="terms"
              label="Schrittgröße (in Monaten)"
              autoComplete="off"
              value={configuratorFormData.stepPeriod}
              onChange={handleOnChange}
            />
            <TextField
              id="terms"
              label={
                <div style={{ display: "flex", flexDirection: "row" }}>
                  Laufzeiten
                  <Tooltip
                    content={
                      "Anzahl sollte gleich der Anzahl an Laufzeiten sein. Für z.B. 3 Laufzeiten sollten 3 Zinssätze vorhanden sein."
                    }
                    borderRadius="100"
                  >
                    <Icon source={InfoIcon} tone="base" />
                  </Tooltip>
                </div>
              }
              autoComplete="off"
              value={configuratorFormData.period}
              onChange={handleOnChange}
              helpText="z.B. 12,60,72"
            />
            <TextField
              id="interestRate"
              label={"Zinssätze"}
              autoComplete="off"
              value={configuratorFormData.interestRate}
              onChange={handleOnChange}
              helpText="z.B. 9.0,9.3,9.6"
            />
            <Select
              id="campaign"
              label="Aktionszins"
              options={aktionszinsOptions}
              onChange={handleOnChange}
              value={configuratorFormData.campaign}
            />

            {isClientAllowedToUseAkitions && (
              <>
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
              </>
            )}
          </BlockStack>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            {configuratorDataOk === undefined ? (
              <div></div>
            ) : formError ? (
              <Badge size="medium" tone="attention">
                Alle Felder sind erforderlich
              </Badge>
            ) : configuratorDataOk ? (
              <Badge size="medium" tone="success">
                Erfolgreich gespeichert
              </Badge>
            ) : (
              <Badge size="medium" tone="critical">
                Konfigurationsfehler
              </Badge>
            )}
            <Button onClick={handleSave}>Speichern</Button>
          </div>
        </>
      )}
    </Box>
  );
};
