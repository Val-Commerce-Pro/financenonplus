import { useEffect, useState } from "react";

import { z } from "zod";

const credentialsSchema = z.object({
  vendorId: z.string(),
  appMode: z.boolean(),
  shop: z.string(),
});

const configuratorSchema = z.object({
  appMode: z.boolean(),
  shop: z.string().nullable(),
  minOrderValue: z.string().nullable(),
  terms: z.string().nullable(),
  campaign: z.string().nullable(),
  interestRate: z.string().nullable(),
  campaignDuration: z.string().nullable(),
});

const pluginConfigSchema = z.object({
  pluginCredentials: credentialsSchema,
  pluginConfigurator: configuratorSchema,
});

export type PluginConfigI = z.infer<typeof pluginConfigSchema>;

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
        console.log("data plugin", data);
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
