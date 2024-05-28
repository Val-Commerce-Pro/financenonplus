const observer = new MutationObserver((list) => {
  const evt = new CustomEvent("dom-changed", { detail: list });
  document.body.dispatchEvent(evt);
});
observer.observe(document.body, {
  attributes: true,
  childList: true,
});

async function getPluginConfData() {
  // const shop = document.getElementById("shopDomain")?.textContent;
  const shop = "financenonplus.myshopify.com";
  try {
    const parameters = new URLSearchParams({ shop });
    const requestUrl = `https://financenonplus.cpro-server.de/api/getPluginConfData?${parameters}`;

    const response = await fetch(requestUrl, { method: "GET" });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching AppConfig:", error);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const pluginConfData = await getPluginConfData();
  // const secureUrl = document.getElementById("cf-secure-url").textContent;

  const initialCartPrice = document.getElementById("cf-cart-price").textContent;

  if (
    parseInt(initialCartPrice) / 100 <
    pluginConfData.pluginConfigurator.minOrderValue
  ) {
    document.getElementById("ah-cart-redirect").style.display = "none";
  }

  document.body.addEventListener("dom-changed", async (e) => {
    const cartPrice = await fetch("cart.js")
      .then((response) => {
        return response.json();
      })
      .catch((error) => console.error("Error fetching cart data:", error)); //document.getElementById("cf-cart-price").textContent;

    if (
      parseInt(cartPrice.total_price) / 100 <
      pluginConfData.pluginConfigurator.minOrderValue
    ) {
      document.getElementById("ah-cart-redirect").style.display = "none";
    } else {
      document.getElementById("ah-cart-redirect").style.display = "flex";
    }
  });
});
