import { getShopPluginConfig } from "~/models/credentialsPlugin.server";
import type { UpdateSubscriptionDeliveryStatus } from "./types/apiTypes";

interface ApiAuthData {
  apiKey: string;
  username: string;
  password: string;
  vendorId: string;
}

function parseJwt(token: string) {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
}

function jwtExpiresAt(jwt: string): number {
  const payload = parseJwt(jwt);
  if (payload.exp != payload.data.exp) {
    console.warn("JWT with two different values for .exp and .data.exp", jwt);
  }
  return payload.exp * 1000; // jtw.ext uses seconds, javascript uses milliseconds for timestamps
}

const jwtMinimalAcceptableLiveTime = 2 * 60 * 1000; // 2min
export class ConsorsAPI {
  private jwtData?: {
    jwt: string;
    jwtValideUntil: number;
  };
  private BASE_URL = "https://api.consorsfinanz.de";
  private CONSORS_API_VERSION = "6.7";

  constructor(public authData: ApiAuthData) {
    this.jwtData = undefined;
  }
  private async authenticateVendor(): Promise<string | undefined> {
    const response = await fetch(
      `${this.BASE_URL}/common-services/cfg/token/${this.authData.vendorId}`,
      {
        method: "POST",
        headers: {
          "x-api-key": this.authData.apiKey,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: this.authData.username,
          password: this.authData.password,
        }),
      },
    );
    if (response.ok) {
      return response
        .json()
        .then((body) => body["token"].substring("Bearer ".length));
    } else {
      console.error("jwt not OK response", response);
      return undefined;
    }
  }

  async jwt(): Promise<string | undefined> {
    if (
      this.jwtData === undefined ||
      this.jwtData.jwtValideUntil - jwtMinimalAcceptableLiveTime < Date.now()
    ) {
      return this.authenticateVendor().then((jwt) => {
        if (jwt === undefined) {
          this.jwtData = undefined;
          return undefined;
        } else {
          this.jwtData = {
            jwt,
            jwtValideUntil: jwtExpiresAt(jwt),
          };
          return jwt;
        }
      });
    } else {
      return this.jwtData.jwt;
    }
  }

  async getClientIdByVendorId() {
    const consorsUrl = `${this.BASE_URL}/common-services/cfg/token/clientid/${this.authData.vendorId}`;

    const res = await fetch(consorsUrl, {
      method: "GET",
      headers: {
        "x-api-key": this.authData.apiKey,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    console.log("getClientIdByVendorId res", res);
    if (!res.ok) {
      return `Error fetching client ID response: ${res.statusText}`;
    }
    const clientIdData = await res.json();
    return clientIdData;
  }

  async getSubscriptions(page: string, size: string) {
    const clientId = this.authData.vendorId;

    const consorsUrl = `https://api.consorsfinanz.de/ratanet-api/cfg/subscription/${clientId}/subscriptions?page=${page}&size=${size}&version=${this.CONSORS_API_VERSION}`;

    const consorsAuthToken = await this.jwt();
    const res = await fetch(consorsUrl, {
      method: "GET",
      headers: {
        "x-api-key": this.authData.apiKey,
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${consorsAuthToken}`,
      },
    });
    return res;
  }

  async cancelSubscription(transactionId: string) {
    const clientId = this.authData.vendorId;
    const consorsUrl = `https://api.consorsfinanz.de/ratanet-api/cfg/subscription/${clientId}/${transactionId}/partnerdata?version=${this.CONSORS_API_VERSION}`;

    const consorsAuthToken = await this.jwt();
    const res = await fetch(consorsUrl, {
      method: "DELETE",
      headers: {
        "x-api-key": this.authData.apiKey,
        "Content-Type": "application/json",
        Authorization: `Bearer ${consorsAuthToken}`,
      },
    });
    return res;
  }

  async updateSubscriptionWithPartnerData(
    updateOrderIdData: UpdateSubscriptionDeliveryStatus,
  ) {
    const { orderId, transactionId } = updateOrderIdData;
    const clientId = this.authData.vendorId;
    const consorsUrl = `${this.BASE_URL}/ratanet-api/cfg/subscription/${clientId}/transaction/partnerdata?version=${this.CONSORS_API_VERSION}`;

    const consorsAuthToken = await this.jwt();

    const res = await fetch(consorsUrl, {
      method: "PUT",
      headers: {
        "x-api-key": this.authData.apiKey,
        "Content-Type": "application/json",
        Authorization: `Bearer ${consorsAuthToken}`,
      },
      body: JSON.stringify({
        subscriptionIdentifierExternal: orderId,
        transactionId,
      }),
    });
    console.log("updateSubscriptionWithPartnerData response ", res);
    if (!res.ok) {
      console.log(`HTTP error! Status: ${res.status}`);
      return;
    }
    const newConsorsOrderData = await res?.json();
    console.log("newConsorsOrderData", newConsorsOrderData);

    return res;
  }

  async updateSubscriptionDeliveryStatus(transactionId: string) {
    const clientId = this.authData.vendorId;
    const consorsUrl = `https://api.consorsfinanz.de/ratanet-api/cfg/subscription/deliverystatus/${clientId}/${transactionId}/partnerdata?version=${this.CONSORS_API_VERSION}`;

    const consorsAuthToken = await this.jwt();

    console.log("updateSubscriptionDeliveryStatus consorsUrl", consorsUrl);

    const res = await fetch(consorsUrl, {
      method: "PUT",
      headers: {
        "x-api-key": this.authData.apiKey,
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${consorsAuthToken}`,
      },
    });
    return res;
  }
}

const consorsClientCache: { [shop: string]: ConsorsAPI | undefined } = {};

export async function getConsorsClient(shop: string) {
  const chachedClient = consorsClientCache[shop];
  const config = await getShopPluginConfig(shop);
  if (config == undefined) {
    return undefined;
  }
  if (chachedClient !== undefined) {
    if (
      chachedClient.authData.apiKey === config.apiKey &&
      chachedClient.authData.password === config.passwort &&
      chachedClient.authData.username === config.username &&
      chachedClient.authData.vendorId === config.vendorId
    ) {
      return chachedClient;
    }
  }
  const newClient = new ConsorsAPI({
    apiKey: config.apiKey,
    username: config.username,
    password: config.passwort,
    vendorId: config.vendorId,
  });

  consorsClientCache[config.shop] = newClient;
  return newClient;
}
