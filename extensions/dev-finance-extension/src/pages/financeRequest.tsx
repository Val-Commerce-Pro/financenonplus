import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SectionCartItems } from "../components/sectionCartItems";
import { ShoppingCart, ShoppingCartItem } from "../types/cartTypes";

import { ClientForm } from "../components/clientFormSection";
import { Modal } from "../components/modal";
import { PluginConfigI } from "../hooks/useGetPluginConfData";
import { useShippingCost } from "../hooks/useShippingCost";
import { ClientFormDataI } from "../types/clientForm";
import { DraftOrderResponse } from "../types/shopifyResponses";
import { LineItem, createEfiDraftOrder } from "../utils/createEfiDraftOrder";
import { getConsorsLink } from "../utils/getConsorsLink";
import { deleteCartItem, updateCartData } from "../utils/shopifyAjaxApi";

type FinanceRequestProps = {
  cartData: ShoppingCart;
  pluginConfData: PluginConfigI;
};

const customerData =
  document.getElementById("cf-customer")?.textContent?.split(",") ?? [];

const initialClientFormData: ClientFormDataI = {
  salutation: "HERR",
  firstName: customerData[1] ?? "",
  lastName: customerData[2] ?? "",
  street: customerData[3]?.replace(/\d+/g, "") ?? "",
  housenumber: customerData[3]?.replace(/\D/g, "") ?? "",
  zipCode: customerData[4] ?? "",
  city: customerData[5] ?? "",
  mobile: customerData[6] ?? "",
  dataOfBirth: "",
  email: customerData[7] ?? "",
};

const FinanceRequest = ({ cartData, pluginConfData }: FinanceRequestProps) => {
  const location = useLocation();
  console.log("location current URL", location);
  const navigate = useNavigate();
  const [clientFormData, setClientFormData] = useState(initialClientFormData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFinanceSubmitted, setIsFinanceSubmitted] = useState(false);
  const shippingPrice = useShippingCost({
    cartData,
    shippingAddress: {
      city: clientFormData.city,
      street: clientFormData.street,
      zipCode: clientFormData.zipCode,
    },
  });

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

      const lineItems: LineItem[] = cartData.items.map((item) => ({
        variantId: `gid://shopify/ProductVariant/${item.id}`,
        quantity: item.quantity,
      }));
      const draftOrderResponse = await createEfiDraftOrder(
        clientFormData,
        lineItems,
        customerData[0],
        shippingPrice,
      );
      const { data: draftOrderData }: { data?: DraftOrderResponse } =
        draftOrderResponse;
      console.log("draftOrderData", draftOrderData);

      // if (!draftOrderData?.draftOrderCreate.draftOrder.name) return;

      //todo: Fix foward link
      const consorsParams = getConsorsLink(
        // clientFormData,
        cartData.total_price,
        draftOrderData?.draftOrderCreate.draftOrder.name ?? "test",
        pluginConfData.pluginCredentials,
      );

      console.log(
        "link",
        `https://finanzieren.consorsfinanz.de/web/ecommerce/gewuenschte-rate?${consorsParams}`,
      );

      window.location.href = `https://finanzieren.consorsfinanz.de/web/ecommerce/gewuenschte-rate?${consorsParams}`;
    } catch (error) {
      console.error(error);
    } finally {
      setIsModalOpen(false);
      setIsFinanceSubmitted(false);
    }
  };

  //TODO, Implement a debounce function to prevent multiple request of the shipping price.
  return (
    <>
      <div className="max-w-[1280px] mx-auto px-[16px] pb-[20px]">
        {/* <PageTitle title="Albis Leasing" /> */}
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
              className="text-white font-bold bg-[#2cb484] rounded-md p-[12px] w-[250px] hover:bg-[#5bb394] disabled:bg-gray-300 disabled:pointer-events-none"
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
