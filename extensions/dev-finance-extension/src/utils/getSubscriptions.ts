import { backendUrl } from "./getConsorsLink";

export const getSubscriptions = async (
  shop: string,
  page?: string,
  size?: string,
) => {
  try {
    const parameters = new URLSearchParams({
      shop,
      page: page ?? "0",
      size: size ?? "25",
    });
    const requestUrl = `${backendUrl()}/api/getSubscriptions?${parameters}`;

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
