import { useEffect, useState } from "react";

import { z } from "zod";
import { backendUrl } from "../utils/getConsorsLink";

const credentialsSchema = z.object({
  vendorId: z.string(),
  appMode: z.boolean(),
  shop: z.string(),
});

const configuratorSchema = z.object({
  shop: z.string().nullable(),
  appMode: z.boolean(),
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

type UseGetPluginConfDataProps = {
  shop: string;
};

export const useGetPluginConfData = ({ shop }: UseGetPluginConfDataProps) => {
  const [pluginConfData, setPluginConfData] = useState<PluginConfigI>();

  useEffect(() => {
    if (!shop) return;
    const getPluginConfData = async () => {
      try {
        const parameters = new URLSearchParams({ shop });
        const requestUrl = `${backendUrl()}/api/getPluginConfData?${parameters}`;

        const response = await fetch(requestUrl, { method: "GET" });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        const formattedData = pluginConfigSchema.parse(data);
        console.log("useGetPluginConfData parsed", formattedData);
        setPluginConfData(formattedData);
        return formattedData;
      } catch (error) {
        console.error("Error fetching AppConfig:", error);
      }
    };
    getPluginConfData();
  }, []);

  return pluginConfData;
};
