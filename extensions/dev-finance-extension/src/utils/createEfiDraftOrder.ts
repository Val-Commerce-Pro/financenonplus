import { ClientFormDataI } from "../types/clientForm";
import { backendUrl } from "./getConsorsLink";

export interface LineItem {
  variantId: string;
  quantity: number;
}

export const createEfiDraftOrder = async (
  clientData: ClientFormDataI,
  lineItems: LineItem[],
  shopDomain: string,
  customerid?: string,
  shippingPrice?: string,
) => {
  try {
    console.log("shippingPrice", shippingPrice);
    const shippingPriceData = Number(shippingPrice) ? Number(shippingPrice) : 0;
    const body = JSON.stringify({
      shop: shopDomain,
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
