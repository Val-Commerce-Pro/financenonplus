const observer = new MutationObserver((list) => {
  const evt = new CustomEvent("dom-changed", { detail: list });
  document.body.dispatchEvent(evt);
});
observer.observe(document.body, {
  attributes: true,
  childList: true,
});

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
  const secureUrl = document.getElementById("cf-secure-url").textContent;
  const addProductAndRedirect = document.getElementById(
    "addProductAndRedirect",
  );
  const calculatorInitiator = document.getElementById(
    "additional-calculator-text",
  );
  if (!pluginConfData.pluginConfigurator.appMode) {
    calculatorInitiator.classList.add("HiddenInfo");
  }

  const { pluginConfigurator } = pluginConfData;
  const {
    shop,
    minOrderValue,
    terms,
    campaign,
    interestRate,
    campaignDuration,
  } = pluginConfigurator;
  console.log("pluginConfigurator", pluginConfigurator);

  const productPrice = document.getElementById("cf-product-price").textContent;

  const cartPrice = document.getElementById("cf-cart-price").textContent;

  if ((parseInt(cartPrice) + parseInt(productPrice)) / 100 < minOrderValue) {
    document.getElementById("cf-product-section").classList.add("HiddenInfo");
  }

  document.body.addEventListener("dom-changed", async (e) => {
    const cartPrice = await fetch(secureUrl + "/cart.js")
      .then((response) => {
        return response.json();
      })
      .catch((error) => console.error("Error fetching cart data:", error));

    if (
      parseInt(cartPrice.total_price) + parseInt(productPrice) / 100 <
      minOrderValue
    ) {
      document.getElementById("cf-product-section").classList.add("HiddenInfo");
    } else {
      document
        .getElementById("cf-product-section")
        .classList.remove("HiddenInfo");
    }
  });

  // Init calculator
  // eslint-disable-next-line no-undef
  jQuery(function ($) {
    var productPrice =
      document.getElementById("cf-product-price").textContent / 100;

    const [minMonth, maxMonth, stepMonth] = terms.split(",");
    const [firstInterestRate, secondInterestRate, thirdInterestRate] =
      interestRate.split(",");
    // let zeroMonth = parseInt(campaignDuration);

    // switch (pluginConfData.pluginConfigurator.campaign) {
    //   case 0:
    //     zeroMonth = 0;
    //     break;
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

    const calcDefaultData = {
      minMonth: Number(minMonth),
      maxMonth: Number(maxMonth),
      stepMonth: Number(stepMonth),
      zeroMonth: Number(campaignDuration),
      firstInterestRate: Number(firstInterestRate),
      secondInterestRate: Number(secondInterestRate),
      thirdInterestRate: Number(thirdInterestRate),
      productPrice: Number(productPrice),
    };
    if (campaign !== "0") {
      calcDefaultData.campaign = Number(campaign);
    }

    console.log("Calc default data", calcDefaultData);

    $("#calculator").calculator(calcDefaultData);
  });

  addProductAndRedirect.addEventListener("click", async (e) => {
    await addProductToCart();
  });
});
