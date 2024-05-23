import { ClientFormDataI } from "../types/clientForm";
import { backendUrl } from "./getConsorsLink";

export interface LineItem {
  variantId: string;
  quantity: number;
}

export const createEfiDraftOrder = async (
  clientData: ClientFormDataI,
  lineItems: LineItem[],
  customerid?: string,
  shippingPrice?: string,
) => {
  try {
    // const shopDomain = document.getElementById("shopDomain")?.textContent;
    const shop = "financenonplus.myshopify.com";
    const shippingPriceData = Number(shippingPrice)
      ? Number(shippingPrice)
      : 0.0;
    const body = JSON.stringify({
      shop,
      draftOrderData: {
        ...clientData,
        customerid,
        shippingPrice: shippingPriceData,
      },
      lineItems,
    });
    const response = await fetch(`${backendUrl()}/api/createDraftOrder`, {
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
