import { createHmac } from "crypto";

function calculateHmacSha512(message: string, key: string) {
  return createHmac("sha512", Buffer.from(key)).update(message).digest("hex");
}

export function checkNotifyHash(url: string, hashKey: string) {
  const urlObj = new URL(url);
  const providedHash = urlObj.searchParams.get("hash");

  if (!providedHash) {
    console.error("No Consors notify hash found in URL: ", url);
    return false;
  }

  const urlWithoutHash = urlObj.toString();

  const calculatedHash = calculateHmacSha512(urlWithoutHash, hashKey);
  const validNotify =
    calculatedHash.toLowerCase() === providedHash.toLowerCase();

  if (!validNotify) {
    console.error("Consors notify hash is incorrect for URL: ", url);
  }

  return validNotify;
}
