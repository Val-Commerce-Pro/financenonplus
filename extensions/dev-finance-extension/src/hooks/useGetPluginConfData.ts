import { useEffect, useState } from "react";

import { z } from "zod";
import { PluginConfigI } from "../types/pluginConfig";

const pluginConfigSchema = z.object({
  shop: z.string(),
  username: z.string(),
  vendorId: z.string(),
  clientId: z.string(),
  apiKey: z.string(),
  passwort: z.string(),
  hash: z.string(),
  appMode: z.boolean(),
});

export const useGetPluginConfData = () => {
  const [pluginConfData, setPluginConfData] = useState<PluginConfigI>();

  useEffect(() => {
    // const shop = document.getElementById("shopDomain")?.textContent;
    const shop = "financenonplus.myshopify.com";
    if (!shop) return;
    const getPluginConfData = async () => {
      try {
        const parameters = new URLSearchParams({ shop });
        const requestUrl = `https://financenonplus.cpro-server.de/api/getPluginConfData?${parameters}`;

        const response = await fetch(requestUrl, { method: "GET" });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const formattedData = pluginConfigSchema.parse(data);
        setPluginConfData(formattedData);
        return data;
      } catch (error) {
        console.error("Error fetching AppConfig:", error);
      }
    };
    getPluginConfData();
  }, []);

  return pluginConfData;
};
