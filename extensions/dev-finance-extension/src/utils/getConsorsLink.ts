import { ClientFormDataI } from "../types/clientForm";
import { PluginConfigI } from "../types/pluginConfig";

export function backendUrl() {
  return "https://financenonplus.cpro-server.de";
}

function consorsNotifyUrl() {
  return `${backendUrl()}/notify/efiNonPlus`;
}

function returnToCustomCheckoutUrl() {
  // const shopDomain = document.getElementById("shopDomain")?.textContent;
  const shopDomain = "financenonplus.myshopify.com";
  return `https://${shopDomain}/pages/consors-efi`;
}

export const getConsorsLink = (
  clientData: ClientFormDataI,
  orderAmount: number,
  draftOrderName: string,
  appSettings: PluginConfigI,
): URLSearchParams => {
  const { city, email, firstName, housenumber, lastName, street, zipCode } =
    clientData;
  const { vendorId } = appSettings;

  const consorsLink = new URLSearchParams({
    vendorid: vendorId,
    order_id: draftOrderName,
    order_amount: orderAmount.toFixed(),
    firstName,
    lastName,
    email,
    zip: zipCode,
    city,
    street,
    housenumber,
    country: "DE",
    shopbrandname: "test shop",
    cancelURL: returnToCustomCheckoutUrl(),
    failureURL: returnToCustomCheckoutUrl(),
    returntocheckoutURL: returnToCustomCheckoutUrl(),
    successURL: returnToCustomCheckoutUrl(),
    notifyURL: consorsNotifyUrl(),
  });

  return consorsLink;
};
