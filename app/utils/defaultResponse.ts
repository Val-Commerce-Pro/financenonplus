import type {
  ShopPluginConfiguratorData,
  ShopPluginCredentialsData,
} from "~/types/databaseInterfaces";

export type GetLoaderResponse = {
  pluginCredentialsData?: ShopPluginCredentialsData | null;
  pluginConfiguratorData?: ShopPluginConfiguratorData | null;
  clientDataOk?: boolean | null;
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
      terms: pluginConfiguratorData?.terms ?? "12,36,6",
      campaign: pluginConfiguratorData?.campaign ?? "0",
      interestRate: pluginConfiguratorData?.interestRate ?? "9.0,9.3,9.5",
      campaignDuration: pluginConfiguratorData?.campaignDuration ?? "0",
    },
    clientDataOk: clientDataOk ?? undefined,
    configuratorDataOk: pluginConfiguratorData
      ? !!pluginConfiguratorData
      : undefined,
  };

  return defaultLoaderResponse;
};
