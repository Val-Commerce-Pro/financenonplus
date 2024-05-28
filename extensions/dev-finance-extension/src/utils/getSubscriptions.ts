import { backendUrl } from "./getConsorsLink";

export const getSubscriptions = async (shop: string) => {
  try {
    const parameters = new URLSearchParams({ shop });
    const requestUrl = `${backendUrl()}/api/getPluginConfData?${parameters}`;

    const response = await fetch(requestUrl, { method: "GET" });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const subscriptonsResponse = await response.json();
    console.log("subscriptonsResponse", subscriptonsResponse);

    return subscriptonsResponse;
  } catch (error) {
    console.error("Error fetching AppConfig:", error);
  }
};
