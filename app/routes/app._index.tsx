import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useSubmit } from "@remix-run/react";
import { Button, Card, Page, Text, TextField } from "@shopify/polaris";
import type { ChangeEvent } from "react";
import { useState } from "react";
import { authenticate } from "~/shopify.server";
import type { ShopPluginConfigData } from "~/types/databaseInterfaces";
import { Switch } from "./components/switch";
// import { createDraftOrder } from "./shopify/graphql/createDraftOrder";

export const action: ActionFunction = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const formData = await request.json();
  console.log("session, formData", session, formData);
  // const formData = await request.formData();
  // const { _action, ...values } = Object.fromEntries(formData);
  // console.log("action function called with this data ", formData);
  // const draftorder = await createDraftOrder("financenonplus.myshopify.com");
  // console.log("session, draftOrder, values", session, draftorder, values);
  return null;
};

export const loader: LoaderFunction = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  console.log("session", session);
};

export default function Index() {
  const submit = useSubmit();
  const [pluginConfig, setPluginConfig] = useState<ShopPluginConfigData>({
    username: "",
    vendorId: "",
    apiKey: "",
    appMode: false,
    clientId: "",
    hash: "",
    passwort: "",
    shop: "",
  });

  const handleSave = () => {
    console.log("pluginConfig", pluginConfig);
    submit(JSON.stringify(pluginConfig), {
      method: "POST",
    });
  };

  const handleAppMode = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    const updatedPluginData = { ...pluginConfig, [name]: value };
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
        <Text as="h2" variant="headingMd">
          Consors EFI
          <Switch
            name={"appMode"}
            label="App Mode:"
            handleOnChange={handleAppMode}
            checkboxValue={pluginConfig.appMode}
          />
        </Text>
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
