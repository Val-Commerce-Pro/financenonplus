import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loading from "./components/loading";
import { useGetCartData } from "./hooks/useGetCartData";
import { useGetPluginConfData } from "./hooks/useGetPluginConfData";
// import { mockCartItems } from "./mockData/mockData";
import FinanceRequest from "./pages/financeRequest";

function App() {
  const shop = document.getElementById("shopDomain")?.textContent;
  const cartData = useGetCartData();
  const pluginConfData = useGetPluginConfData({ shop: shop ?? "" });

  return (
    <Router>
      <Routes>
        <>
          {shop &&
          cartData &&
          cartData.items.length &&
          pluginConfData?.pluginCredentials.appMode ? (
            <Route
              path="/pages/consors-efi"
              element={
                <FinanceRequest
                  cartData={cartData}
                  pluginConfData={pluginConfData}
                  shopDomain={shop}
                />
              }
            />
          ) : (
            <Route path="/pages/consors-efi" element={<Loading />} />
          )}
        </>
      </Routes>
    </Router>
  );
}

export default App;
