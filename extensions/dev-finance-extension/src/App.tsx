import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Loading from "./components/loading";
import { useGetCartData } from "./hooks/useGetCartData";
import { useGetPluginConfData } from "./hooks/useGetPluginConfData";
// import { mockCartItems } from "./mockData/mockData";
import FinanceRequest from "./pages/financeRequest";

function App() {
  const cartData = useGetCartData();
  // const cartData = mockCartItems;
  const pluginConfData = useGetPluginConfData();

  console.log("first pluginConfData", pluginConfData);
  console.log("first cartData", cartData);

  // TODO: ADD returnToCheckout value from consors to the plugin extension for testing and also for the order details page
  return (
    <Router>
      <Routes>
        <>
          {cartData && pluginConfData ? (
            <Route
              path="/pages/consors-efi"
              element={
                <FinanceRequest
                  cartData={cartData}
                  pluginConfData={pluginConfData}
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
