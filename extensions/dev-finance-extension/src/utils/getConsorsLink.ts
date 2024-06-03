import { PluginConfigI } from "../hooks/useGetPluginConfData";
import { ClientFormDataI } from "../types/clientForm";

export function backendUrl() {
  return "https://financenonplus.cpro-server.de";
}

function consorsNotifyUrl() {
  return `${backendUrl()}/notify/efiNonPlus`;
}

function returnToCustomCheckoutUrl(shopDomain: string) {
  return `https://${shopDomain}/pages/consors-efi`;
}

export const getConsorsLink = (
  clientData: ClientFormDataI,
  orderAmount: number,
  consorsOrderId: string,
  pluginConfigData: PluginConfigI,
  shop: string,
): URLSearchParams => {
  const {
    city,
    email,
    firstName,
    housenumber,
    lastName,
    street,
    zipCode,
    mobile,
    salutation,
  } = clientData;
  const { pluginCredentials, pluginConfigurator } = pluginConfigData;
  const { campaign, campaignDuration } = pluginConfigurator;

  const defaultUrlParams = {
    vendorid: pluginCredentials.vendorId,
    // vendorid: "1",
    order_id: consorsOrderId,
    order_amount: (orderAmount / 100).toFixed(2).replace(".", ","),
    salutation,
    firstname: firstName,
    lastname: lastName,
    mobile,
    email,
    zip: zipCode,
    city,
    street,
    housenumber,
    // country: "DE",
    shopbrandname: shop,
    // cancelURL: returnToCustomCheckoutUrl(),
    // failureURL: returnToCustomCheckoutUrl(),
    // returntocheckoutURL: returnToCustomCheckoutUrl(),
    successURL: returnToCustomCheckoutUrl(shop),
    notifyURL: consorsNotifyUrl(),
  };

  const consorsParams =
    campaign && campaignDuration && campaign !== "0"
      ? new URLSearchParams({
          ...defaultUrlParams,
          campaign,
          campaignduration: campaignDuration,
        })
      : new URLSearchParams({
          ...defaultUrlParams,
        });

  console.log("https://finanzieren..", consorsParams.toString());

  return consorsParams;
};
