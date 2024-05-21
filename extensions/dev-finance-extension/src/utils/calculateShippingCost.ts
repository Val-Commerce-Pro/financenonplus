import { backendUrl } from "./getConsorsLink";

export interface LineItem {
  variantId: string;
  quantity: number;
}

export type ShippingAddress = {
  address1: string;
  city: string;
  zip: string;
  countryCode: string;
}

export const calculateShippingCost = async (
  shippingAddress: ShippingAddress,
  lineItems: LineItem[],
) => {
  try {
    // const shopDomain = document.getElementById("shopDomain")?.textContent;
    const shop = "financenonplus.myshopify.com";
    const body = JSON.stringify({
      shop,
      shippingAddress,
      lineItems,
    });
    const response = await fetch(`${backendUrl()}/api/calculateShipping`, {
      method: "POST",
      body,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching AppConfig:", error);
  }
};
