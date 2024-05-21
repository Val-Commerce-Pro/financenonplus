import type {
  ShopPluginConfiguratorData,
  ShopPluginCredentialsData,
} from "~/types/databaseInterfaces";

export type getLoaderResponse = {
  pluginCredentialsData?: ShopPluginCredentialsData | null;
  pluginConfiguratorData?: ShopPluginConfiguratorData | null;
  clientDataOk?: boolean | null;
  shop: string
};

export const getLoaderResponse = ({
  pluginCredentialsData,
  pluginConfiguratorData,
  clientDataOk,
  shop
}: getLoaderResponse) => {
  const defaultLoaderResponse = {
    pluginCredentialsData: {
      username: pluginCredentialsData?.username ?? "",
      vendorId: pluginCredentialsData?.vendorId ?? "",
      apiKey: pluginCredentialsData?.apiKey ?? "",
      appMode: pluginConfiguratorData?.appMode ?? false,
      clientId: pluginCredentialsData?.vendorId ?? "",
      hash: pluginCredentialsData?.hash ?? "",
      passwort: pluginCredentialsData?.passwort ?? "",
      shop: pluginCredentialsData?.shop ?? shop,
    },
    pluginConfiguratorData: {
      shop: pluginConfiguratorData?.shop ?? shop,
      appMode: pluginConfiguratorData?.appMode ?? false,
      minOrderValue: pluginConfiguratorData?.minOrderValue ?? 100,
      terms: pluginConfiguratorData?.terms ?? "",
      zeroPercent: pluginConfiguratorData?.zeroPercent ?? "",
      interestRate: pluginConfiguratorData?.interestRate ?? "",
      promotionalInterestRate:
        pluginConfiguratorData?.promotionalInterestRate ?? 0,
    },
    clientDataOk: clientDataOk ?? undefined,
  };

  return defaultLoaderResponse;
};
