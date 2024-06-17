import { backendUrl } from "./getConsorsLink";

export const getTestRoute = async (orderId: string) => {
  try {
    const parameters = new URLSearchParams({ orderId });
    const requestUrl = `${backendUrl()}/api/testRoute?${parameters}`;

    const response = await fetch(requestUrl, { method: "GET" });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const updateSubscriptionDeliveryStatus = await response.json();

    return updateSubscriptionDeliveryStatus;
  } catch (error) {
    console.error("Error fetching AppConfig:", error);
  }
};
