import type { ActionFunction } from "@remix-run/node";
import { useSubmit } from "@remix-run/react";
import { BlockStack, Layout, Page, TextField } from "@shopify/polaris";
import { useState } from "react";
import { authenticate } from "~/shopify.server";
import { createDraftOrder } from "./shopify/graphql/createDraftOrder";

export const action: ActionFunction = async ({ request }) => {
  const { session } = await authenticate.admin(request);
  const formData = await request.formData();
  const { _action, ...values } = Object.fromEntries(formData);
  console.log("action function called with this data ", formData);
  const draftorder = await createDraftOrder("financenonplus.myshopify.com");
  console.log("session, draftOrder, values", session, draftorder, values);
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
      <ui-title-bar title="Remix app template"></ui-title-bar>
      <BlockStack gap="500">
        <button variant={"primary"} onClick={handleFakeClick}>
          Save into the DB
        </button>
        <button variant={"primary"} onClick={handleFakeClick}>
          Create draftOrder
        </button>
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
