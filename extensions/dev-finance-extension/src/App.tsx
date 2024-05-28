import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loading from "./components/loading";
import { useGetCartData } from "./hooks/useGetCartData";
import { useGetPluginConfData } from "./hooks/useGetPluginConfData";
// import { mockCartItems } from "./mockData/mockData";
import FinanceRequest from "./pages/financeRequest";

function App() {
  const shop = document.getElementById("shopDomain")?.textContent;
  // const domainShop = "financenonplus.myshopify.com";
  const cartData = useGetCartData();
  // const cartData = mockCartItems;
  const pluginConfData = useGetPluginConfData({ shop: shop ?? "" });

  console.log("first pluginConfData", pluginConfData);
  console.log("first cartData", cartData);

  return (
    <Router>
      <Routes>
        <>
          {shop && cartData && pluginConfData ? (
            <Route
              path="/pages/consors-efi"
              element={
                <FinanceRequest
                  cartData={cartData}
                  pluginConfData={pluginConfData}
                  domainShop={shop}
                />
              }
            />
          ) : (
            <Route path="/pages/albis-leasing" element={<Loading />} />
          )}
        </>
      </Routes>
    </Router>
  );
}

export default App;
