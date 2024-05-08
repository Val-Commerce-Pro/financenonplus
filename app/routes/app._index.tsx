import { BlockStack, Layout, Page, TextField } from "@shopify/polaris";
import { useState } from "react";
import { createDraftOrder } from "./shopify/graphql/createDraftOrder";

export default function Index() {
  const [pluginConfig, setPluginConfig] = useState({
    laufzeitenTextfield: "",
  });

  const handleSave = () => {
    console.log();
  };
  const handleFakeClick = async () => {
    const draftorder = createDraftOrder("financenonplus.myshopify.com");
    console.log("draftOrder: " + draftorder);
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
