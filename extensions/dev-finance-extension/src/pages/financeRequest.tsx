import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageTitle } from "../components/pagetitle";
import { SectionCartItems } from "../components/sectionCartItems";
import { ShoppingCart, ShoppingCartItem } from "../types/cartTypes";
import { PluginConfigI } from "../types/pluginConfig";

import { ClientForm } from "../components/clientFormSection";
import { Modal } from "../components/modal";
import { ClientFormDataI } from "../types/clientForm";
import { LineItem, createEfiDraftOrder } from "../utils/createEfiDraftOrder";
import { getConsorsLink } from "../utils/getConsorsLink";
import { deleteCartItem, updateCartData } from "../utils/shopifyAjaxApi";

type DraftOrderResponse = {
  draftOrderCreate: {
    draftOrder: {
      id: string;
      name: string;
    };
  };
};

type FinanceRequestProps = {
  cartData: ShoppingCart;
  pluginConfData: PluginConfigI;
};

const initialClientFormData: ClientFormDataI = {
  salutation: "HERR",
  firstName: "",
  lastName: "",
  street: "",
  housenumber: "",
  zipCode: "",
  city: "",
  mobile: "",
  dataOfBirth: "",
  email: "",
};

const FinanceRequest = ({ cartData, pluginConfData }: FinanceRequestProps) => {
  const navigate = useNavigate();
  const [clientFormData, setClientFormData] = useState(initialClientFormData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [cartItems, setCartItems] = useState<ShoppingCart>(cartData);

  const handleClientFormChange = (newData: ClientFormDataI) => {
    setClientFormData(newData);
  };
  const handleModalState = (newModalState: boolean) => {
    setIsModalOpen(newModalState);
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

    const consorsParams = getConsorsLink(
      clientFormData,
      cartData.total_price,
      draftOrderData?.draftOrderCreate.draftOrder.name ?? "random key",
      pluginConfData,
    );
    console.log(
      "consorsLink",
      JSON.stringify(
        `https://finanzieren.consorsfinanz.de/web/ecommerce/gewuenschte-rate?${consorsParams}`,
      ),
    );
    navigate(
      `https://finanzieren.consorsfinanz.de/web/ecommerce/gewuenschte-rate?${consorsParams}`,
    );
  };

  return (
    <>
      <div className="max-w-[1280px] mx-auto p-[16px]">
        <PageTitle title="Albis Leasing" />
        <SectionCartItems
          cartData={cartItems}
          handleUpdateItemQuantity={handleUpdateItemQuantity}
          handleDeleteCartItem={handleDeleteCartItem}
        />
        <div className="mt-[20px]">
          <ClientForm
            clientFormData={clientFormData}
            handleClientFormChange={handleClientFormChange}
            handleModalState={handleModalState}
          />
        </div>
        {isModalOpen && (
          <Modal
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleFowardClientToConsors}
            // isLoading={isLoading}
            // responseApp={createAlbisApp}
          />
        )}
      </div>
    </>
  );
};

export default FinanceRequest;
