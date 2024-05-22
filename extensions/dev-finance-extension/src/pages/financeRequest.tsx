import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageTitle } from "../components/pagetitle";
import { SectionCartItems } from "../components/sectionCartItems";
import { ShoppingCart, ShoppingCartItem } from "../types/cartTypes";
import { PluginConfigI } from "../types/pluginConfig";

import { ClientForm } from "../components/clientFormSection";
import { Modal } from "../components/modal";
import { ClientFormDataI } from "../types/clientForm";
import {
  DraftOrderCalculate,
  DraftOrderResponse,
} from "../types/shopifyResponses";
import { calculateShippingCost } from "../utils/calculateShippingCost";
import { LineItem, createEfiDraftOrder } from "../utils/createEfiDraftOrder";
import { getConsorsLink } from "../utils/getConsorsLink";
import { deleteCartItem, updateCartData } from "../utils/shopifyAjaxApi";

type FinanceRequestProps = {
  cartData: ShoppingCart;
  pluginConfData: PluginConfigI;
};

const initialClientFormData: ClientFormDataI = {
  salutation: "HERR",
  firstName: document.getElementById("cf-customer-fn")?.textContent ?? "",
  lastName: document.getElementById("cf-customer-ln")?.textContent ?? "",
  street:
    document
      .getElementById("cf-customer-street")
      ?.textContent?.replace(/\d+/g, "") ?? "",
  housenumber:
    document
      .getElementById("cf-customer-street")
      ?.textContent?.replace(/\D/g, "") ?? "",
  zipCode: document.getElementById("cf-customer-zip")?.textContent ?? "",
  city: document.getElementById("cf-customer-city")?.textContent ?? "",
  mobile: document.getElementById("cf-customer-phone")?.textContent ?? "",
  dataOfBirth: "",
  email: document.getElementById("cf-customer-mail")?.textContent ?? "",
};

const FinanceRequest = ({ cartData, pluginConfData }: FinanceRequestProps) => {
  const navigate = useNavigate();
  const [clientFormData, setClientFormData] = useState(initialClientFormData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFinanceSubmitted, setIsFinanceSubmitted] = useState(false);
  const [shippingPrice, setShippingPrice] = useState("");

  const [cartItems, setCartItems] = useState<ShoppingCart>(cartData);

  const handleClientFormChange = (newData: ClientFormDataI) => {
    setClientFormData(newData);
  };

  const handleUpdateItemQuantity = async (
    item: ShoppingCartItem,
    type?: "plus",
  ) => {
    const productQuantity = {
      [item.id]: type ? item.quantity + 1 : item.quantity - 1,
    };
    const updatedCartData = await updateCartData(productQuantity);
    setCartItems(updatedCartData);
  };

  const handleDeleteCartItem = async (item: ShoppingCartItem) => {
    const productQuantity = {
      [item.id]: 0,
    };
    const updatedCartData = await deleteCartItem(productQuantity);
    setCartItems(updatedCartData);
  };

  const handleFowardClientToConsors = async () => {
    try {
      setIsFinanceSubmitted(true);
      console.log("clientFormData", clientFormData);
      console.log("cartItems", cartItems);
      console.log("pluginConfData", pluginConfData);

      const lineItems: LineItem[] = cartData.items.map((item) => ({
        variantId: `gid://shopify/ProductVariant/${item.id}`,
        quantity: item.quantity,
      }));
      const draftOrderResponse = await createEfiDraftOrder(
        clientFormData,
        lineItems,
      );
      const { data: draftOrderData }: { data?: DraftOrderResponse } =
        draftOrderResponse;
      console.log("draftOrderData", draftOrderData);

      // if (!draftOrderData?.draftOrderCreate.draftOrder.name) return;

      //todo: Fix foward link
      const consorsParams = getConsorsLink(
        clientFormData,
        cartData.total_price,
        draftOrderData?.draftOrderCreate.draftOrder.name ?? "test",
        pluginConfData,
      );
      console.log(
        "consorsLink",
        JSON.stringify(
          `https://finanzieren.consorsfinanz.de/web/ecommerce/gewuenschte-rate?${consorsParams}`,
        ),
      );
      window.location.href = `https://finanzieren.consorsfinanz.de/web/ecommerce/gewuenschte-rate?${consorsParams}`;
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFinanceSubmitted(false);
    }
  };
  useEffect(() => {
    if (
      clientFormData.city &&
      clientFormData.street &&
      clientFormData.zipCode
    ) {
      handleShippingCost();
    }
  }, [clientFormData]);

  async function handleShippingCost() {
    const { city, street, zipCode } = clientFormData;
    const lineItems: LineItem[] = cartData.items.map((item) => ({
      variantId: `gid://shopify/ProductVariant/${item.id}`,
      quantity: item.quantity,
    }));
    const currentShippingCost: DraftOrderCalculate =
      await calculateShippingCost(
        { address1: street, city, zip: zipCode, countryCode: "DE" },
        lineItems,
      );
    console.log("currentShippingCost", currentShippingCost);
    const { amount } =
      currentShippingCost.data.draftOrderCalculate.calculatedDraftOrder
        .availableShippingRates[0].price;
    console.log("amount", amount);
    setShippingPrice(amount);
  }

  return (
    <>
      <div className="max-w-[1280px] mx-auto p-[16px]">
        <PageTitle title="Albis Leasing" />
        <SectionCartItems
          cartData={cartItems}
          handleUpdateItemQuantity={handleUpdateItemQuantity}
          handleDeleteCartItem={handleDeleteCartItem}
          shippingPrice={shippingPrice}
        />
        <div className="mt-[20px]">
          <ClientForm
            clientFormData={clientFormData}
            handleClientFormChange={handleClientFormChange}
          />
        </div>
        <div className="mt-[20px]">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              type="button"
              data-modal-target="static-modal"
              id="modal-button"
              data-modal-toggle="static-modal"
              className="text-white font-bold bg-orange-400 rounded-md p-[12px] w-[250px] hover:bg-orange-300 disabled:bg-gray-300 disabled:pointer-events-none"
            >
              Zurück
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              type="button"
              data-modal-target="static-modal"
              id="modal-button"
              data-modal-toggle="static-modal"
              className="text-white font-bold bg-orange-400 rounded-md p-[12px] w-[250px] hover:bg-orange-300 disabled:bg-gray-300 disabled:pointer-events-none"
            >
              Senden
            </button>
          </div>
        </div>

        {isModalOpen && (
          <Modal
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleFowardClientToConsors}
            isLoading={isFinanceSubmitted}
            // responseApp={createAlbisApp}
          />
        )}
      </div>
    </>
  );
};

export default FinanceRequest;
