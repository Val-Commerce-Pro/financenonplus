import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SectionCartItems } from "../components/sectionCartItems";
import { ShoppingCart, ShoppingCartItem } from "../types/cartTypes";

import { ClientForm } from "../components/clientFormSection";
import { Modal } from "../components/modal";
import { PluginConfigI } from "../hooks/useGetPluginConfData";
import { useShippingCost } from "../hooks/useShippingCost";
import { DraftOrderResponse } from "../types/shopifyResponses";
import { LineItem, createEfiDraftOrder } from "../utils/createEfiDraftOrder";
import { getConsorsLink } from "../utils/getConsorsLink";

import { TiArrowBackOutline } from "react-icons/ti";

import { Tooltip } from "../components/tooltip";
// import { getSubscriptions } from "../utils/getSubscriptions";
// import { getTestRoute } from "../utils/getTestRoute";
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
  housenumber: customerData[3]?.replace(/\D/g, "") ?? "",
  mobile: customerData[6] ?? "",
  email: customerData[7] ?? "",
  street: customerData[3]?.replace(/\d+/g, "") ?? "",
  zipCode: customerData[4] ?? "",
  city: customerData[5] ?? "",
};

const FinanceRequest = ({
  cartData,
  pluginConfData,
  shopDomain,
}: FinanceRequestProps) => {
  const navigate = useNavigate();
  const [clientFormData, setClientFormData] = useState(initialClientFormData);
  console.log("clientFormData", clientFormData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFinanceSubmitted, setIsFinanceSubmitted] = useState(false);

  const [cartItems, setCartItems] = useState<ShoppingCart>(cartData);

  const shippingPrice = useShippingCost({
    cartData,
    shippingAddress: {
      street: clientFormData.street,
      zipCode: clientFormData.zipCode,
      city: clientFormData.city,
    },
    shopDomain,
  });

  const isSendenBtnEnable = () => {
    console.log("isSendenBtnEnable render");
    const regexIsValidMail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    const isValidMail = regexIsValidMail.test(clientFormData.email);
    if (!isValidMail) return false;

    const isMinOrderValue =
      cartItems.total_price / 100 >=
      Number(pluginConfData.pluginConfigurator.minOrderValue);
    if (!isMinOrderValue) return false;

    const allFieldsFilledData = {
      ...clientFormData,
      shippingPrice,
    };
    console.log("allFieldsFilledData", allFieldsFilledData);
    const allFieldsFilled = Object.values(allFieldsFilledData).every(
      (field) => field.trim() !== "",
    );
    return allFieldsFilled && isMinOrderValue && isValidMail;
  };

  const isSendenBtnDisabled = isSendenBtnEnable();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setClientFormData({ ...clientFormData, [name]: value });
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

      const lineItems: LineItem[] = cartItems.items.map((item) => ({
        variantId: `gid://shopify/ProductVariant/${item.id}`,
        quantity: item.quantity,
      }));
      const draftOrderResponse: DraftOrderResponse = await createEfiDraftOrder(
        clientFormData,
        lineItems,
        shopDomain,
        customerData[0],
        shippingPrice,
      );
      const { consorsOrderId } = draftOrderResponse;

      const consorsParams = getConsorsLink(
        clientFormData,
        cartItems.total_price + Number(shippingPrice) * 100,
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

  // const handleGetSubscriptions = async () => {
  //   await getSubscriptions(shopDomain, "110", "25");
  // };
  // const handleGetTestRoute = async () => {
  //   await getTestRoute("D129");
  // };

  return (
    <div className="w-full">
      <div className="max-w-[1120px] mx-auto px-[16px] pb-[20px]">
        <div className="text-[36px] font-semibold mt-[16px] mb-[36px]">
          Consors Finanz
        </div>
        <SectionCartItems
          cartData={cartItems}
          handleUpdateItemQuantity={handleUpdateItemQuantity}
          handleDeleteCartItem={handleDeleteCartItem}
          shippingPrice={shippingPrice}
        />
        <div className="mt-[20px]">
          <ClientForm
            clientFormData={clientFormData}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
          />
        </div>
        <div className="mt-[20px]">
          <div className="flex items-center justify-between relative">
            <button
              onClick={() => navigate(-1)}
              type="button"
              data-modal-target="static-modal"
              id="modal-button"
              data-modal-toggle="static-modal"
              className="text-white font-bold bg-orange-400 rounded-md p-[12px] hover:bg-orange-500 disabled:bg-gray-300 disabled:pointer-events-none"
            >
              <div className="flex items-center justify-center ">
                <TiArrowBackOutline className="inline-block" size={24} />
                Zurück
              </div>
            </button>
            <span className="group absolute right-0">
              <button
                onClick={() => setIsModalOpen(true)}
                type="button"
                disabled={!isSendenBtnDisabled}
                data-modal-target="static-modal"
                id="modal-button"
                data-modal-toggle="static-modal"
                className="text-white font-bold bg-[#2cb484] rounded-md p-[12px] hover:bg-[#52a489] disabled:bg-gray-300 disabled:pointer-events-none"
              >
                Jetzt kaufen
              </button>
              {!isSendenBtnDisabled ? (
                <Tooltip
                  text={`Füllen Sie alle Felder aus, achten Sie auf eine korrekte Email und beachten Sie den Mindestbestellwert von ${pluginConfData.pluginConfigurator.minOrderValue}€.`}
                />
              ) : (
                <></>
              )}
            </span>
            {/* <div id="testButtons" className="hidden">
              <button className="border-2" onClick={handleGetSubscriptions}>
                Orders status overview
              </button>
              <button className="border-2" onClick={handleGetTestRoute}>
                Change order Id
              </button>
            </div> */}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleFowardClientToConsors}
          isLoading={isFinanceSubmitted}
        />
      )}
    </div>
  );
};

export default FinanceRequest;
