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
  shippingAddress: Pick<ClientFormDataI, "city" | "street" | "zipCode">;
  cartData?: ShoppingCart;
  shopDomain: string;
};

export const useShippingCost = ({
  shippingAddress,
  cartData,
  shopDomain,
}: UseShippingCostProps): string => {
  const [shippingCostData, setShippingCostData] = useState({
    city: "",
    street: "",
    zipCode: "",
  });
  const [shippingPrice, setShippingPrice] = useState("");

  const handleShippingCost = useCallback(async () => {
    if (
      !shippingAddress.city ||
      !shippingAddress.zipCode ||
      !shippingAddress.street ||
      !cartData
    )
      return "";
    const lineItems: LineItem[] = cartData.items.map((item) => ({
      variantId: `gid://shopify/ProductVariant/${item.id}`,
      quantity: item.quantity,
    }));
    //TODO find the country code somewhere
    const body = JSON.stringify({
      shop: shopDomain,
      shippingAddress: {
        ...shippingAddress,
        countryCode: "DE",
      },
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

    setShippingPrice(amount);
  }, [shippingAddress, cartData]);

  useEffect(() => {
    if (
      shippingAddress.city !== shippingCostData.city ||
      shippingAddress.street !== shippingCostData.street ||
      shippingAddress.zipCode !== shippingCostData.zipCode
    ) {
      setShippingCostData({
        city: shippingAddress.city,
        street: shippingAddress.street,
        zipCode: shippingAddress.zipCode,
      });
      handleShippingCost();
    }
  }, [shippingAddress, handleShippingCost]);

  return shippingPrice;
};
