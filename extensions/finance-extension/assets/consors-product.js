async function addProductToCart() {
  const productId = document.getElementById("cf-product-id").textContent;
  const secureUrl = document.getElementById("cf-secure-url").textContent;

  let formData = {
    items: [
      {
        id: Number(productId),
        quantity: 1,
      },
    ],
  };
  const fetchUrl = `${secureUrl}/cart/add.js`;

  const response = await fetch(fetchUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error(`HTTP error: Status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

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
  const addProductAndRedirect = document.getElementById(
    "addProductAndRedirect",
  );
  const calculatorInitiator = document.getElementById(
    "additional-calculator-text",
  );
  if (!pluginConfData.pluginConfigurator.appMode) {
    calculatorInitiator.classList.add("HiddenInfo");
  }

  // Init calculator
  jQuery(function ($) {
    var productPrice =
      document.getElementById("cf-product-price").textContent / 100;

    let minMonth = parseInt(
      pluginConfData.pluginConfigurator.terms.split(",")[0],
    );
    let maxMonth = parseInt(
      pluginConfData.pluginConfigurator.terms.split(",")[1],
    );
    let stepMonth = parseInt(
      pluginConfData.pluginConfigurator.terms.split(",")[2],
    );
    let firstInterestRate = parseFloat(
      pluginConfData.pluginConfigurator.interestRate.split(",")[0],
    );
    let secondInterestRate = parseFloat(
      pluginConfData.pluginConfigurator.interestRate.split(",")[1],
    );
    let thirdInterestRate = parseFloat(
      pluginConfData.pluginConfigurator.interestRate.split(",")[2],
    );
    let zeroMonth = pluginConfData.pluginConfigurator.campaignDuration;

    // switch (pluginConfData.pluginConfigurator.campaign) {
    //   case 1:
    //     break;
    //   case 2:
    //     //default case
    //     break;
    //   case 3:
    //     minMonth = maxMonth = zeroMonth;
    //     stepMonth = 0;
    //     firstInterestRate = secondInterestRate = thirdInterestRate = 0;
    //     break;
    // }

    $("#calculator").calculator({
      minMonth: minMonth,
      maxMonth: maxMonth,
      stepMonth: stepMonth,
      zeroMonth: 24 + 1, // Increment so that passed month is inclusive
      firstInterestRate: firstInterestRate,
      secondInterestRate: secondInterestRate,
      thirdInterestRate: thirdInterestRate,
      productPrice: 1300, //test data because real store values are too small
    });
  });

  addProductAndRedirect.addEventListener("click", async (e) => {
    await addProductToCart();
  });
});
