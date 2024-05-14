import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData, useSubmit } from "@remix-run/react";
import { Button, Card, Page, Text, TextField } from "@shopify/polaris";
import type { ChangeEvent } from "react";
import { useState } from "react";
import { getShopPluginConfig } from "~/models/shopPluginConfig.server";
import { authenticate } from "~/shopify.server";
import type { ShopPluginConfigData } from "~/types/databaseInterfaces";
import { Switch } from "./components/switch";
import { formatData } from "./utils/formatData";
// import { createDraftOrder } from "./shopify/graphql/createDraftOrder";

export const action: ActionFunction = async ({ request }) => {
  console.log("ACtion function rendered");
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();
  const { ...values } = Object.fromEntries(formData);
  console.log("session, formData, values", session, formData, values);

  const dataActionForm = formatData(values, true) as ShopPluginConfigData;
  console.log("format data", dataActionForm);
  // const formData = await request.formData();
  // const { _action, ...values } = Object.fromEntries(formData);
  // console.log("action function called with this data ", formData);
  // const draftorder = await createDraftOrder("financenonplus.myshopify.com");
  // console.log("session, draftOrder, values", session, draftorder, values);
  return null;
};

export const loader: LoaderFunction = async ({
  request,
}): Promise<ShopPluginConfigData> => {
  console.log("Loader function rendered");
  const { session } = await authenticate.admin(request);
  const pluginConfData = await getShopPluginConfig(session.shop);
  console.log("pluginConfData", pluginConfData);

  if (pluginConfData) return pluginConfData;

  return {
    username: "",
    vendorId: "",
    apiKey: "",
    appMode: false,
    clientId: "",
    hash: "",
    passwort: "",
    shop: session.shop,
  };
};

export default function Index() {
  const submit = useSubmit();
  const loaderData = useLoaderData<ShopPluginConfigData>();
  const [pluginConfig, setPluginConfig] = useState<ShopPluginConfigData>({
    username: loaderData.username ?? "",
    vendorId: loaderData.vendorId ?? "",
    apiKey: loaderData.apiKey ?? "",
    appMode: loaderData.appMode ?? false,
    clientId: loaderData.clientId ?? "",
    hash: loaderData.hash ?? "",
    passwort: loaderData.passwort ?? "",
    shop: loaderData.shop ?? "",
  });

  const handleSave = () => {
    console.log("handle save called pluginConfig", { ...pluginConfig });
    submit(
      { ...pluginConfig },
      {
        method: "POST",
      },
    );
  };

  const handleAppMode = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    console.log("handleAppMode value and Id", value, name);
    const updatedPluginData = { ...pluginConfig, [name]: value };
    console.log("updatedPluginData", updatedPluginData);
    setPluginConfig(updatedPluginData);
  };

  const handleOnChange = (value: string, id: string) => {
    console.log("OncHange value and Id", value, id);
    setPluginConfig((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <Page>
      <ui-title-bar title="Einstellungen"> </ui-title-bar>
      {/* <HorizontalGrid gap="4" columns={3}> */}
      <Card>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <Text as="h2" variant="headingMd">
            Consors EFI
            <Switch
              name="appMode"
              label="App Mode:"
              handleOnChange={handleAppMode}
              checkboxValue={pluginConfig.appMode}
            />
          </Text>
        </div>
        <TextField
          id="username"
          label="username"
          autoComplete="off"
          value={pluginConfig.username}
          onChange={handleOnChange}
          // onBlur={() => handleSave()}
          // error={errors.title}
        />
        <TextField
          id="vendorId"
          label="vendorId"
          autoComplete="off"
          value={pluginConfig.vendorId}
          onChange={handleOnChange}
          // onBlur={() => handleSave()}
          //error={errors.title}
        />

        <TextField
          id="passwort"
          label="Passwort"
          autoComplete="off"
          value={pluginConfig.passwort}
          onChange={handleOnChange}
          // onBlur={() => handleSave()}
          //error={errors.title}
        />
        <TextField
          id="apiKey"
          label="ApiKey"
          autoComplete="off"
          value={pluginConfig.apiKey}
          onChange={handleOnChange}
          // onBlur={() => handleSave()}
          //error={errors.title}
        />
        <TextField
          id="hash"
          label="Hash"
          autoComplete="off"
          value={pluginConfig.hash}
          onChange={handleOnChange}
          // onBlur={() => handleSave()}
          //error={errors.title}
        />
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
        {/* <ChoiceList
            title="App Mode"
            name="appMode"
            allowMultiple={false}
            selected={["live"]}
            choices={[
              // {value: "demo", label: "Demo Mode"},
              { value: "live", label: "Live Betrieb" },
              { value: "off", label: "Abgeschaltet" },
            ]}
            onChange={(value) => {
              // console.log(`onChange event with value: ${value}`);
              // TODO: can value be of another length then 1 ?
              if (value.length === 1) {
                setModeDropDown(value[0]);
              }
            }}
          /> */}
      </Card>
      {/* </HorizontalGrid> */}
    </Page>
  );
}
