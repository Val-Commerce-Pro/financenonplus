import type {
  ShopPluginConfiguratorData,
  ShopPluginCredentialsData,
} from "~/types/databaseInterfaces";

export type GetLoaderResponse = {
  pluginCredentialsData?: ShopPluginCredentialsData | null;
  pluginConfiguratorData?: ShopPluginConfiguratorData | null;
  clientDataOk?: boolean;
  configuratorDataOk?: boolean | null;
  shop: string;
};

export const getLoaderResponse = ({
  pluginCredentialsData,
  pluginConfiguratorData,
  clientDataOk,
  shop,
}: GetLoaderResponse) => {
  const defaultLoaderResponse = {
    pluginCredentialsData: {
      username: pluginCredentialsData?.username ?? "",
      vendorId: pluginCredentialsData?.vendorId ?? "",
      apiKey: pluginCredentialsData?.apiKey ?? "",
      appMode: pluginCredentialsData?.appMode ?? false,
      clientId: pluginCredentialsData?.vendorId ?? "",
      hash: pluginCredentialsData?.hash ?? "",
      passwort: pluginCredentialsData?.passwort ?? "",
      shop: pluginCredentialsData?.shop ?? shop,
    },
    pluginConfiguratorData: {
      shop: pluginConfiguratorData?.shop ?? shop,
      appMode: pluginConfiguratorData?.appMode ?? false,
      minOrderValue: pluginConfiguratorData?.minOrderValue ?? "100",
      minPeriod: pluginConfiguratorData?.minPeriod ?? "6",
      stepPeriod: pluginConfiguratorData?.stepPeriod ?? "6",
      period: pluginConfiguratorData?.period ?? "12,72",
      interestRate: pluginConfiguratorData?.interestRate ?? "3.3,6.6,9.9",
      campaign: pluginConfiguratorData?.campaign ?? "0",
      campaignDuration: pluginConfiguratorData?.campaignDuration ?? "0",
    },
    clientDataOk,
    configuratorDataOk: pluginConfiguratorData
      ? !!pluginConfiguratorData
      : undefined,
  };

  return defaultLoaderResponse;
};
