import { createHmac } from "crypto";

function calculateHmacSha512(message: string, key: string) {
  return createHmac("sha512", Buffer.from(key)).update(message).digest("hex");
}

export function checkNotifyHash2(url: string, hashKey: string) {
  console.log("checkNotifyHash url, hashKey", url, hashKey);
  const urlObj = new URL(url);
  const providedHash = urlObj.searchParams.get("hash");

  if (!providedHash) {
    console.error("2 1 if - No Consors notify hash found in URL: ", url);
    return false;
  }

  // Remove the hash parameter from the URL
  urlObj.searchParams.delete("hash");
  const urlWithoutHash = urlObj.toString();
  console.log("URL without hash:", urlWithoutHash);

  // Concatenate URL without hash and the hashKey
  const message = urlWithoutHash + hashKey;
  console.log("Message to be hashed:", message);

  // Calculate the HMAC-SHA-512 hash
  const calculatedHash = calculateHmacSha512(message, hashKey);
  console.log("Calculated hash:", calculatedHash);

  // Compare the calculated hash with the provided hash
  const validNotify =
    calculatedHash.toLowerCase() === providedHash.toLowerCase();

  if (!validNotify) {
    console.error("2 2 if - Consors notify hash is incorrect for URL: ", url);
  }

  console.log("validNotify", validNotify);

  return validNotify;
}
