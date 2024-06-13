/** Listener for dynamically setting the correct variantId */
var firstTimeUrl = document.URL;
var variantId = document.getElementById("cf-variant-id").textContent;
var cfSection = document.getElementById("cf-product-section");
const productId = document.getElementById("cf-product-id").textContent;

document.addEventListener("change", async function () {
  var currentPageUrl = document.URL;
  var url = new URL(currentPageUrl);
  var isVariantUrl = url.searchParams.get("variant");
  currentPageUrl = isVariantUrl ? currentPageUrl : isVariantUrl;
  if (currentPageUrl && firstTimeUrl != currentPageUrl) {
    firstTimeUrl = currentPageUrl;
    variantId = isVariantUrl;
    const foundVariant = await _getCurrentVariant();
    console.log("foundVariant", foundVariant);
    if (!foundVariant.available) {
      cfSection.classList.add("HiddenInfo");
    } else {
      cfSection.classList.remove("HiddenInfo");
    }
  }
});

async function getProductById(id) {
  const handle = (
    await fetch(
      `/search/suggest.json?q=id:${id}&resources[type]=product&limit=1`,
    )
      .then((response) => response.json())
      .then((response) => response.resources.results.products.shift())
  ).handle;

  return await fetch(`/products/${handle}.js`).then((response) =>
    response.json(),
  );
}

async function _getCurrentVariant() {
  const product = await getProductById(productId);

  const foundVariant = product.variants.find(
    (variant) => variant.id == variantId,
  );

  return foundVariant;
}

async function addProductToCart() {
  const secureUrl = document.getElementById("cf-secure-url").textContent;

  let formData = {
    items: [
      {
        id: Number(variantId),
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
  window.location.replace(`${secureUrl}/pages/consors-efi`);
  return data;
}

async function getPluginConfData() {
  const shop = document.getElementById("cf-shop-domain")?.textContent;
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
  const extensionSection = document.getElementById("cf-product-section");
  const productPrice = (await _getCurrentVariant()).price;
  const addProductAndRedirect = document.getElementById(
    "addProductAndRedirect",
  );

  const { pluginConfigurator } = pluginConfData;
  const {
    // shop,
    appMode,
    period,
    // campaign,
    interestRate,
    campaignDuration,
    minPeriod,
    stepPeriod,
  } = pluginConfigurator;

  if (!appMode) {
    extensionSection.classList.add("HiddenInfo");
  }

  const [firstPeriod, normalPeriod, maxPeriod] = period.split(",");
  const [firstInterestRate, secondInterestRate, thirdInterestRate] =
    interestRate.split(",");

  const calcDefaultData = {
    period_min: Number(minPeriod),
    period: [Number(firstPeriod), Number(normalPeriod), Number(maxPeriod)],
    period_step: Number(stepPeriod),
    period_zero_interest: Number(campaignDuration),
    rate: [
      Number(firstInterestRate),
      Number(secondInterestRate),
      Number(thirdInterestRate),
    ],
    product_amount: Number(productPrice) / 100,
    selected_index: 1,
  };

  var finance_calculator = (function (value) {
    if (window.finance_calculator) {
      window.finance_calculator.update(value);

      return window.finance_calculator;
    }

    var fc = {};

    fc.properties = {};

    var valid_properties = [
      "product_amount",
      "period_min",
      "period_step",
      "period_zero_interest",
      "period",
      "rate",
      "selected_index",
      "legal_text",
    ];
    var period_rate_data = [];
    var default_legal_text = [];

    fc._launch_value = value;

    fc.update = function (value) {
      if (!this.active) {
        this._launch_value = value;

        return;
      }

      var i = valid_properties.length;

      while (i--) {
        var item = valid_properties[i];

        if (value[item]) {
          if (item == "legal_text") {
            var legal_container = document.querySelector(
              ".calculator .legal-text",
            );

            legal_container && (legal_container.innerHTML = value[item]);
          } else if (!isNaN(value[item]) || Array.isArray(value[item])) {
            if (Array.isArray(value[item])) {
              var a = value[item],
                len = a.length;

              while (len--) {
                a[len] = sanitize_num(a[len]);
              }

              this.properties[item] = a;
            } else {
              this.properties[item] = sanitize_num(value[item]);
            }
          }
        } else {
          //FALLBACK:

          if (item == "legal_text" && default_legal_text) {
            var legal_container = document.querySelector(
              ".calculator .legal-text",
            );

            legal_container && (legal_container.innerHTML = default_legal_text);
          }
        }
      }

      this.apply_properties();

      delete this.properties.product_amount;
    };

    fc.apply_properties = function () {
      var output = this._container;

      if (this.properties.product_amount) {
        output.querySelector(".finance-amount-value input").value =
          this.properties.product_amount;
      } else {
        this.properties.product_amount = sanitize_num(
          output.querySelector(".finance-amount-value input").value,
        );
      }

      this.generate_rate_list();

      output.classList.add("show");
    };

    // private
    function _calcMonthlyRates(
      amount,
      minMonth,
      maxMonth,
      stepMonth,
      zeroMonth,
      rate,
      period,
    ) {
      var index = 0,
        interest = rate[index],
        l = interest / 100 + 1,
        k = 1 / 12,
        j = Math.pow(l, k),
        o =
          Math.floor((Math.pow(1 + interest / 100, k) - 1) * 12 * 100 * 100) /
          100,
        n = 0,
        g = 0;

      var output = [];

      if (
        !isNaN(interest) &&
        interest == interest &&
        amount &&
        !isNaN(amount) &&
        amount > 0
      ) {
        for (var i = minMonth; i <= maxMonth; i += stepMonth) {
          if (i <= zeroMonth) {
            interest = 0;
          } else {
            while (period[index] < i) {
              index++;

              if (isNaN(period[index])) {
                index--;
                break;
              }
            }

            interest = rate[index];
          }

          l = interest / 100 + 1;
          j = Math.pow(l, k);
          o =
            Math.floor((Math.pow(1 + interest / 100, k) - 1) * 12 * 100 * 100) /
            100;

          if (!interest) {
            g = Math.floor((amount / i) * 100) / 100;
            n = amount;
          } else {
            var h = Math.pow(j, i);
            g = Math.floor(((amount * h) / (h - 1)) * (j - 1) * 100) / 100;
            n =
              (Math.floor(((amount * h) / (h - 1)) * (j - 1) * 100) / 100) * i;
          }

          if (parseFloat(g) >= 9) {
            output.push({
              months: i,
              amount: amount,
              monthlyInstallment: g,
              interestRate: o,
              effInterestRate: interest,
              total: n,
              interestValue: n - amount,
            });
          }
        }
      }

      return output;
    }

    fc.generate_rate_list = function () {
      period_rate_data = [];

      var p = this.properties;

      if (p.period && p.period.length) {
        period_rate_data = _calcMonthlyRates(
          p.product_amount,
          p.period_min,
          p.period[p.period.length - 1],
          p.period_step,
          p.period_zero_interest,
          p.rate,
          p.period,
        );
      }

      this.selected_index = isNaN(p.selected_index)
        ? period_rate_data.length - 1
        : Math.min(p.selected_index, p.period.length - 1);
      this.update_selection();
    };

    fc.init = function () {
      return function () {
        this.active = true;

        this._container = document.querySelector("#calculator");

        var button = this._container.querySelector(".prev-month");
        button._direction = -1;
        button.addEventListener("click", this.make_arrow_click());

        button = this._container.querySelector(".next-month");
        button._direction = 1;
        button.addEventListener("click", this.make_arrow_click());

        button = this._container.querySelector("input.btn-change-value");
        button.addEventListener(
          "click",
          function (e) {
            e.preventDefault();
            this.apply_properties();
          }.bind(this),
        );

        this._launch_value && this.update(this._launch_value);

        delete this._launch_value;
      }.bind(this);
    };

    fc.update_selection = function () {
      var selection_container =
          this._container.querySelector(".duration-value"),
        a,
        i;

      // TOGGLE BUTTONS ON/OFF
      a = selection_container.querySelector(".next-month");

      if (
        !period_rate_data.length ||
        this.selected_index == period_rate_data.length - 1
      ) {
        a.setAttribute("disabled", "1");
      } else {
        a.removeAttribute("disabled");
      }

      a = selection_container.querySelector(".prev-month");

      if (!period_rate_data.length || !this.selected_index) {
        a.setAttribute("disabled", "1");
      } else {
        a.removeAttribute("disabled");
      }

      // EMPTY ALL
      a = selection_container.querySelectorAll(".month");

      a.forEach(function (e) {
        e.classList.remove("selected");
        e.innerHTML = "";
      });

      // SLIDE THROUGH VALUES AND FILL
      if (period_rate_data.length) {
        var start = Math.max(
            0,
            this.selected_index -
              (this.selected_index == period_rate_data.length - 1 ? 2 : 1),
          ),
          end = Math.min(
            period_rate_data.length - 1,
            this.selected_index + (this.selected_index ? 1 : 2),
          );

        i = 1 + end - start;

        while (i--) {
          a[i].innerHTML = period_rate_data[end].months;
          end == this.selected_index && a[i].classList.add("selected");
          end--;
        }
      }

      var current_data = period_rate_data[this.selected_index] || {};

      a = this._container.querySelector(
        ".financial-box .monthly-rate .monthly-rate-value",
      );
      a && (a.innerHTML = formatNumberOutput(current_data.monthlyInstallment));

      a = this._container.querySelector(
        ".financial-box .interest-rate .months",
      );
      a && (a.innerHTML = formatNumberOutput(current_data.months));

      a = this._container.querySelector(
        ".financial-box .interest-rate .interest-rate-value",
      );
      a &&
        (a.innerHTML = formatNumberOutput(
          current_data.interestRate,
          2,
          "",
          " %",
          Math.floor,
        ));

      a = this._container.querySelector(
        ".financial-box .interest-value .interest-value-value",
      );
      a &&
        (a.innerHTML = formatNumberOutput(
          current_data.interestValue,
          2,
          "",
          " €",
        ));

      a = this._container.querySelector(
        ".financial-box .eff-interest-rate .eff-interest-rate-value",
      );
      a &&
        (a.innerHTML = formatNumberOutput(
          current_data.effInterestRate,
          2,
          "",
          " %",
          Math.floor,
        ));

      a = this._container.querySelector(".financial-box .amount .amount-value");
      a && (a.innerHTML = formatNumberOutput(current_data.amount, 2, "", " €"));

      a = this._container.querySelector(".financial-box .total .total-value");
      a && (a.innerHTML = formatNumberOutput(current_data.total, 2, "", " €"));

      update_legal(this, current_data);
    };

    fc.make_arrow_click = function () {
      return function (e) {
        var dir = e.currentTarget._direction;

        this.selected_index = Math.max(
          0,
          Math.min(period_rate_data.length, this.selected_index + dir),
        );

        this.update_selection();
      }.bind(this);
    };

    function update_legal(target, data) {
      var a = target._container.querySelector(".campaign-interest-rate");
      a &&
        (a.innerHTML = formatNumberOutput(
          data.interestRate,
          2,
          "",
          " %",
          Math.floor,
        ));

      a = target._container.querySelector(".campaign-duration");
      a && (a.innerHTML = formatNumberOutput(data.months, 0));
    }

    // TOOLS
    function sanitize_num(n) {
      if (!n) {
        n = 0;
      } else {
        n = String(n).replaceAll(",", ".");
      }

      n = parseFloat(n);

      return n != n ? 0 : n;
    }

    function formatNumberOutput(number, digits, prefix, postfix, roundFn) {
      isNaN(number) && (number = 0);

      if (typeof digits === "undefined" || digits === null) {
        digits = 2;
      }
      if (typeof prefix === "undefined" || prefix === null) {
        prefix = "";
      }
      if (typeof postfix === "undefined" || postfix === null) {
        postfix = "";
      }

      number = precisionRound(number, digits, roundFn);
      number = number.toLocaleString("de-DE", {
        useGrouping: false,
        minimumFractionDigits: digits,
      });

      return "" + prefix + number + postfix;
    }

    function precisionRound(number, precision, fn) {
      if (typeof fn !== "function") {
        fn = Math.round;
      }
      var factor = Math.pow(10, precision);
      return fn(number * factor) / factor;
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fc.init());
    } else {
      fc.init()();
    }

    return fc;
  })({
    rate: calcDefaultData.rate,
    period: calcDefaultData.period,
    period_zero_interest: calcDefaultData.period_zero_interest,
    period_step: calcDefaultData.period_step,
    period_min: calcDefaultData.period_min,
    product_amount: calcDefaultData.product_amount,
    legal_text: `<div id="legal-text">
<h2><sup>1</sup>Gesetzlicher Hinweistext</h2>
<div class="legal-text"><div class="show-on-more-month" style="display: none;">
Finanzierung über einen bonitätsabhängigen Ratenkredit. Kaufpreis 
entspricht dem Nettodarlehensbetrag; Angaben zugleich repräsentatives 
Beispiel i. S. d. § 17 Abs. 4 PAngV. </div><div class="legal-1 show-on-less-month"> Finanzierung Ihres Einkaufs (Ratenplan-Verfügung) über den Kreditrahmen mit Mastercard<sup>®</sup>,
den Sie wiederholt in Anspruch nehmen können. Nettodarlehensbetrag 
bonitätsabhängig bis 15.000 €. 18,90 % effektiver Jahreszinssatz. 
Vertragslaufzeit auf unbestimmte Zeit.</div><div class="show-on-less-month"><strong><u>Ratenplan-Verfügung:</u></strong> Gebundener Sollzinssatz von <span class="campaign-interest-rate">0,00 %</span> (jährlich) gilt nur für die ersten <span class="campaign-duration">18</span>
Monate ab Vertragsschluss (Zinsbindungsdauer); Sie müssen monatliche 
Teilzahlungen in der von Ihnen gewählten Höhe leisten. Führen Sie Ihre 
Ratenplan-Verfügung nicht innerhalb der Zinsbindungsdauer zurück, gelten
die Konditionen für Folgeverfügungen.</div><div class="show-on-less-month"><strong><u>Folgeverfügungen:</u></strong>
Für andere und künftige Verfügungen (Folgeverfügungen) beträgt der 
veränderliche Sollzinssatz (jährlich) 17,43 % (falls Sie bereits einen 
Kreditrahmen bei uns haben, kann der tatsächliche veränderliche 
Sollzinssatz abweichen). Für Folgeverfügungen müssen Sie monatliche 
Teilzahlungen in der von Ihnen gewählten Höhe, mind. aber 2,5% der 
jeweils höchsten, auf volle 100 € gerundeten Sollsaldos der 
Folgeverfügungen (mind. 9 €) leisten. Zahlungen für Folgeverfügungen 
werden erst auf verzinste Folgeverfügungen angerechnet, bei 
unterschiedlichen Zinssätzen zuerst auf die höher verzinsten.</div><div class="show-on-less-month">Angaben
zugleich repräsentatives Beispiel gem. § 17 Abs. 4 PAngV. Gültig für 
Kunden ab 18 Jahren mit Wohnsitz in Deutschland, gültigem 
Personalausweis oder Reisepass (Nicht-EU-Bürger i.V.m. gültigem 
Aufenthaltstitel), gültiger EC-Karte auf eigenen Namen und 
Mindestnettoeinkommen von 450 € (ohne Kindergeld). Selbständige: 
Finanzierung nur für private Zwecke, mind. 24 Monate Selbständigkeit. 
Ggfs. wird ein aktueller Gehalts-/Einkommensnachweis benötigt. 
Vermittlung erfolgt ausschließlich für den Kreditgeber BNP Paribas S.A. 
Niederlassung Deutschland, Rüdesheimer Straße 1, 80686 München. 
Widerrufsrecht: Der Darlehensnehmer kann seine Vertragserklärung 
innerhalb von 14 Tagen ohne Angabe von Gründen widerrufen. Zur Wahrung 
der Widerrufsfrist genügt die rechtzeitige Absendung des Widerrufs, wenn
die Erklärung auf einem dauerhaften Datenträger (z.B. Brief, Telefax, 
E-Mail) erfolgt. Der Widerruf ist zu richten an: BNP Paribas S.A. 
Niederlassung Deutschland, Wuhanstraße 5, 47051 Duisburg (Fax: 02 03/34 
69 54-09; Tel.: 02 03/34 69 54-02; E- Mail: widerruf@consorsfinanz.de).</div></div></div>`,
  });

  addProductAndRedirect.addEventListener("click", async (e) => {
    await addProductToCart();
  });
});
