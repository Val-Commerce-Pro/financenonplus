// import { getShopPluginConfig } from "~/models/shopPluginConfig.server";
// import type {
//   FulfillmentOrderRequest,
//   RefundOrderRequest,
//   StornoOrderRequest,
// } from "./types";

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
  private async getNewJWT(): Promise<string | undefined> {
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
      return this.getNewJWT().then((jwt) => {
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

  //   async stornoOrder({
  //     applicationReferenceNumber,
  //     countryCode,
  //     orderAmount = 0.0,
  //     timeStamp,
  //     notifyURL,
  //   }: StornoOrderRequest) {
  //     const consorsUrl = `${this.baseURL}/psp-web/rest/${this.authData.vendorId}/cancel/credit/${applicationReferenceNumber}?version=${this.CONSORS_API_VERSION}`;

  //     try {
  //       const consorsAuthToken = await this.jwt();
  //       const res = await fetch(consorsUrl, {
  //         method: "DELETE",
  //         headers: {
  //           "Content-Type": "application/json",
  //           "X-Request-Id": "1",
  //           "X-Conversation-Id": "111",
  //           "X-CountryCode": countryCode,
  //           "X-TimeStamp": timeStamp,
  //           "X-Token": `Bearer ${consorsAuthToken}`,
  //           "X-api-key": this.authData.apiKey,
  //         },
  //         body: JSON.stringify({
  //           orderAmount,
  //           notifyURL,
  //         }),
  //       });
  //       return res;
  //     } catch (error) {
  //       console.log("Error sending cancellation data to Consors");
  //     }
  //   }

  async updateSubscriptionDeliveryStatus(transactionId: string) {
    const clientId = this.authData.vendorId;
    const consorsUrl = `${this.BASE_URL}/ratanet-api/cfg/deliverystatus/${clientId}/${transactionId}/partnerdata?version=${this.CONSORS_API_VERSION}`;

    const consorsAuthToken = await this.jwt();

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

  //   async refundOrder({
  //     applicationReferenceNumber,
  //     billingInfo,
  //     countryCode,
  //     customerId,
  //     orderAmount,
  //     timeStamp,
  //     notifyURL,
  //   }: RefundOrderRequest) {
  //     const consorsUrl = `${this.baseURL}/psp-web/rest/${this.authData.vendorId}/update/credit/${applicationReferenceNumber}?version=${this.CONSORS_API_VERSION}`;

  //     const consorsAuthToken = await this.jwt();
  //     const res = await fetch(consorsUrl, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "X-Request-Id": "1",
  //         "X-Conversation-Id": "111",
  //         "X-CountryCode": countryCode,
  //         "X-TimeStamp": timeStamp,
  //         "X-Token": `Bearer ${consorsAuthToken}`,
  //         "X-api-key": this.authData.apiKey,
  //       },
  //       body: JSON.stringify({
  //         customerId,
  //         orderAmount,
  //         notifyURL,
  //         billingInfo,
  //       }),
  //     });
  //     return res;
  //   }
}

const consorsClientCache: { [shop: string]: ConsorsAPI | undefined } = {};

type GetConsorsClientI = {
  shop: string;
  apiKey: string;
  passwort: string;
  username: string;
  vendorId: string;
};

export async function getConsorsClient(config: GetConsorsClientI) {
  const chachedClient = consorsClientCache[config.shop];
  // const config = await getShopPluginConfig(shop);
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
