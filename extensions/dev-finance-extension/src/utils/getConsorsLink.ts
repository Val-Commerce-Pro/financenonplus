import { PluginConfigI } from "../hooks/useGetPluginConfData";
// import { ClientFormDataI } from "../types/clientForm";

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
  // clientData: ClientFormDataI,
  orderAmount: number,
  draftOrderName: string,
  pluginCredentials: PluginConfigI["pluginCredentials"],
): URLSearchParams => {
  // const shop = document.getElementById("shopDomain")?.textContent;
  const shop = "financenonplus.myshopify.com";
  // const { city, email, firstName, housenumber, lastName, street, zipCode } =
  //   clientData;
  const { vendorId } = pluginCredentials;
  console.log(
    "consorsLink Parms",
    pluginCredentials.vendorId,
    draftOrderName.replace("#", ""),
    (orderAmount / 100).toFixed(2).replace(".", ","),
  );

  const consorsLink = new URLSearchParams({
    vendorid: vendorId,
    order_id: draftOrderName.replace("#", ""),
    order_amount: (orderAmount / 100).toFixed(2).replace(".", ","),
    // firstName,
    // lastName,
    // email,
    // zip: zipCode,
    // city,
    // street,
    // housenumber,
    // country: "DE",
    shopbrandname: shop,
    // cancelURL: returnToCustomCheckoutUrl(),
    // failureURL: returnToCustomCheckoutUrl(),
    returntocheckoutURL: returnToCustomCheckoutUrl(),
    // successURL: returnToCustomCheckoutUrl(),
    notifyURL: consorsNotifyUrl(),
  });

  return consorsLink;
};
