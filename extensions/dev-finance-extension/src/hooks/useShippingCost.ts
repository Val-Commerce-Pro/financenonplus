import { useCallback, useEffect, useState } from "react";
import { ShoppingCart } from "../types/cartTypes";
import { ClientFormDataI } from "../types/clientForm";
import { DraftOrderCalculate } from "../types/shopifyResponses";
import { backendUrl } from "../utils/getConsorsLink";

export interface LineItem {
  variantId: string;
  quantity: number;
}

export type ShippingAddress = {
  address1: string;
  city: string;
  zip: string;
  countryCode: string;
};

type UseShippingCostProps = {
  clientFormData?: Pick<ClientFormDataI, "city" | "street" | "zipCode">;
  cartData?: ShoppingCart;
};

export const useShippingCost = ({
  clientFormData,
  cartData,
}: UseShippingCostProps): string => {
  console.log("useShippingCost render");
  console.log("clientFormData, cartData", clientFormData, cartData);
  const [shippingPrice, setShippingPrice] = useState("");

  const handleShippingCost = useCallback(async () => {
    if (!clientFormData || !cartData) return "";
    const { city, street, zipCode } = clientFormData;
    const lineItems: LineItem[] = cartData.items.map((item) => ({
      variantId: `gid://shopify/ProductVariant/${item.id}`,
      quantity: item.quantity,
    }));
    const shippingAddress = {
      address1: street,
      city,
      zip: zipCode,
      countryCode: "DE",
    };
    // const shop = document.getElementById("shopDomain")?.textContent;
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
    const data: DraftOrderCalculate = await response.json();

    const { amount } =
      data.data.draftOrderCalculate.calculatedDraftOrder
        .availableShippingRates[0].price;

    console.log("amount", amount);
    setShippingPrice(amount);
  }, [clientFormData, cartData]);

  useEffect(() => {
    if (
      clientFormData?.city &&
      clientFormData?.street &&
      clientFormData?.zipCode
    ) {
      console.log("handle Shipping Cost has been called");
      handleShippingCost();
    }
  }, [clientFormData, handleShippingCost]);

  return shippingPrice;
};
