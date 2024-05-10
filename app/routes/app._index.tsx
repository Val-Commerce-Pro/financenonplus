import type { ActionFunction } from "@remix-run/node";
import { useSubmit } from "@remix-run/react";
import { BlockStack, Layout, Page, TextField } from "@shopify/polaris";
import { useState } from "react";
import { createDraftOrder } from "./shopify/graphql/createDraftOrder";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  console.log("action function called with this data ", formData);
  const draftorder = createDraftOrder("financenonplus.myshopify.com");
  console.log("draftOrder: " + draftorder);
  return null;
};

export default function Index() {
  const submit = useSubmit();
  const [pluginConfig, setPluginConfig] = useState({
    laufzeitenTextfield: "",
  });

  const handleSave = () => {
    console.log("pluginConfig: " + pluginConfig);
  };
  const handleFakeClick = async () => {
    const data = {
      pluginConfig,
      _action: "pluginConfig",
    };
    submit(data, { method: "POST" });
  };

  return (
    <Page>
      <ui-title-bar title="Remix app template">
        <button variant={"primary"} onClick={handleFakeClick}>
          Create fake Config
        </button>
        <button variant={"primary"} onClick={handleFakeClick}>
          Create draftOrder
        </button>
      </ui-title-bar>
      <BlockStack gap="500">
        <Layout>
          <TextField
            id="laufzeiten"
            label="Laufzeiten"
            autoComplete="off"
            value={pluginConfig.laufzeitenTextfield}
            onChange={(value) =>
              setPluginConfig((prev) => ({
                ...prev,
                laufzeitenTextfield: value,
              }))
            }
            onBlur={() => handleSave()}
          />
        </Layout>
      </BlockStack>
    </Page>
  );
}
