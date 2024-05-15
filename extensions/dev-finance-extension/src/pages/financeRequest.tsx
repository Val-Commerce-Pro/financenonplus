import { useState } from "react";
import { PageTitle } from "../components/pagetitle";
import { SectionCartItems } from "../components/sectionCartItems";
import { ShoppingCart, ShoppingCartItem } from "../types/cartTypes";
import { PluginConfigI } from "../types/pluginConfig";

import { Modal } from "../components/modal";
import { ClientForm } from "../components/sectionCompanyManager";
import { ClientFormDataI } from "../types/extensionPage";
import { deleteCartItem, updateCartData } from "../utils/shopifyAjaxApi";

type FinanceRequestProps = {
  cartData: ShoppingCart;
  pluginConfData: PluginConfigI;
};

const initialClientFormData: ClientFormDataI = {
  anrede: "1",
  vorname: "",
  nachname: "",
  strasseGF: "",
  plzGF: "",
  ortGF: "",
  telGF: "",
  geburtsdatum: "",
  email: "",
};

const FinanceRequest = ({ cartData, pluginConfData }: FinanceRequestProps) => {
  const [clientFormData, setClientFormData] = useState(initialClientFormData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log("Extension is running, this is the current data");
  console.log("cartData, pluginConfData", cartData, pluginConfData);

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
            // onSubmit={handleFormSubmit}
            // isLoading={isLoading}
            // responseApp={createAlbisApp}
          />
        )}
      </div>
    </>
  );
};

export default FinanceRequest;
