import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SectionCartItems } from "../components/sectionCartItems";
import { ShoppingCart, ShoppingCartItem } from "../types/cartTypes";

import { ClientForm } from "../components/clientFormSection";
import { Modal } from "../components/modal";
import { useDebounce } from "../hooks/useDebouncedCallback";
import { PluginConfigI } from "../hooks/useGetPluginConfData";
import { useShippingCost } from "../hooks/useShippingCost";
import { DraftOrderResponse } from "../types/shopifyResponses";
import { LineItem, createEfiDraftOrder } from "../utils/createEfiDraftOrder";
import { getConsorsLink } from "../utils/getConsorsLink";
import { getSubscriptions } from "../utils/getSubscriptions";
import {
  clearCartData,
  deleteCartItem,
  updateCartData,
} from "../utils/shopifyAjaxApi";

type FinanceRequestProps = {
  cartData: ShoppingCart;
  pluginConfData: PluginConfigI;
  shopDomain: string;
};

const customerData =
  document.getElementById("cf-customer")?.textContent?.split(",") ?? [];

const initialClientFormData = {
  salutation: "HERR",
  firstName: customerData[1] ?? "",
  lastName: customerData[2] ?? "",
  // street: customerData[3]?.replace(/\d+/g, "") ?? "",
  housenumber: customerData[3]?.replace(/\D/g, "") ?? "",
  // zipCode: customerData[4] ?? "",
  // city: customerData[5] ?? "",
  mobile: customerData[6] ?? "",
  email: customerData[7] ?? "",
};

const FinanceRequest = ({
  cartData,
  pluginConfData,
  shopDomain,
}: FinanceRequestProps) => {
  const navigate = useNavigate();
  const [clientFormData, setClientFormData] = useState(initialClientFormData);
  const [street, setStreet] = useState(
    customerData[3]?.replace(/\d+/g, "") ?? "",
  );
  const [zipCode, setZipCode] = useState(customerData[4] ?? "");
  const [city, setCity] = useState(customerData[5] ?? "");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFinanceSubmitted, setIsFinanceSubmitted] = useState(false);
  const shippingPrice = useShippingCost({
    cartData,
    shippingAddress: {
      city,
      street,
      zipCode,
    },
    shopDomain,
  });

  const [cartItems, setCartItems] = useState<ShoppingCart>(cartData);

  const debouncedSetField = useDebounce((name: string, value: string) => {
    setClientFormData((prev) => ({ ...prev, [name]: value }));
  }, 500);
  const isSendenBtnEnable = () => {
    const allFieldsFilled = Object.values({
      ...clientFormData,
    }).every((field) => field.trim() !== "");
    return allFieldsFilled;
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "street") {
      setStreet(value);
    } else if (name === "zipCode") {
      setZipCode(value);
    } else if (name === "city") {
      setCity(value);
    }

    if (["street", "zipCode", "city"].includes(name)) {
      debouncedSetField(name, value);
    } else {
      setClientFormData({ ...clientFormData, [name]: value });
    }
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setClientFormData({ ...clientFormData, [name]: value });
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
      const draftOrderResponse: DraftOrderResponse = await createEfiDraftOrder(
        {
          ...clientFormData,
          city,
          street,
          zipCode,
        },
        lineItems,
        shopDomain,
        customerData[0],
        shippingPrice,
      );
      const { consorsOrderId } = draftOrderResponse;

      //todo: Fix foward link
      const consorsParams = getConsorsLink(
        { ...clientFormData, city, street, zipCode },
        cartData.total_price + Number(shippingPrice) * 100,
        consorsOrderId,
        pluginConfData,
        shopDomain,
      );

      window.location.href = `https://finanzieren.consorsfinanz.de/web/ecommerce/gewuenschte-rate?${consorsParams}`;
    } catch (error) {
      console.error(error);
    } finally {
      setIsModalOpen(false);
      await clearCartData();
      setIsFinanceSubmitted(false);
    }
  };
  const consorsParams = getConsorsLink(
    { ...clientFormData, city, street, zipCode },
    cartData.total_price + Number(shippingPrice) * 100,
    "consorsOrderId",
    pluginConfData,
    shopDomain,
  );
  console.log("https://finanzieren..", consorsParams.toString());

  const handleFakeClick = async () => {
    await getSubscriptions(shopDomain, "101", "25");
  };

  return (
    <>
      <div className="max-w-[1280px] mx-auto px-[16px] pb-[20px]">
        <SectionCartItems
          cartData={cartItems}
          handleUpdateItemQuantity={handleUpdateItemQuantity}
          handleDeleteCartItem={handleDeleteCartItem}
          shippingPrice={shippingPrice}
        />
        <div className="mt-[20px]">
          <ClientForm
            clientFormData={{ ...clientFormData, city, street, zipCode }}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
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
              disabled={!isSendenBtnEnable()}
              data-modal-target="static-modal"
              id="modal-button"
              data-modal-toggle="static-modal"
              className="text-white font-bold bg-[#2cb484] rounded-md p-[12px] w-[250px] hover:bg-[#5bb394] disabled:bg-gray-300 disabled:pointer-events-none"
            >
              Senden
            </button>
            <button onClick={handleFakeClick}>FAKE</button>
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
