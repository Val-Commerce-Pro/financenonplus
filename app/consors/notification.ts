import { createHmac } from "crypto";

// function calculateHmacSha512(message: string, key: string) {
//   return createHmac("sha512", Buffer.from(key)).update(message).digest("hex");
// }

// export function checkNotifyHash(url: string, hashKey: string) {
//   console.log("checkNotifyHash url, hashKey", url, hashKey);
//   const urlObj = new URL(url);
//   const providedHash = urlObj.searchParams.get("hash");

//   if (!providedHash) {
//     console.error("No Consors notify hash found in URL: ", url);
//     return false;
//   }

//   // Remove the hash parameter from the URL
//   urlObj.searchParams.delete("hash");
//   const urlWithoutHash = urlObj.toString();
//   console.log("URL without hash:", urlWithoutHash);

//   // Concatenate URL without hash and the hashKey
//   const message = urlWithoutHash + hashKey;
//   console.log("Message to be hashed:", message);

//   // Calculate the HMAC-SHA-512 hash
//   const calculatedHash = calculateHmacSha512(message, hashKey);
//   console.log("Calculated hash:", calculatedHash);

//   // Compare the calculated hash with the provided hash
//   const validNotify =
//     calculatedHash.toLowerCase() === providedHash.toLowerCase();

//   if (!validNotify) {
//     console.error("Consors notify hash is incorrect for URL: ", url);
//   }

//   return validNotify;
// }

function calculateHmacSha512(message: string, key: string) {
  return createHmac("sha512", Buffer.from(key)).update(message).digest("hex");
}

const hashKey = "12345678910" as const;

export function checkNotifyHash(url: string) {
  const parts = url.split("&hash=", 2);
  if (parts.length != 2) {
    //hash not contained in url
    console.error("1 if - no consors notify hash found in url: ", url);
    return false;
  }
  const [urlWithoutHash, providedHash] = parts;
  const calculatedHash = calculateHmacSha512(urlWithoutHash, hashKey);
  console.log("in" + urlWithoutHash + "        " + calculatedHash)
  const valideNotify =
    calculatedHash.toLowerCase() === providedHash.toLowerCase();

  if (!valideNotify) {
    console.error("1 2if - consors notify hash is incorrect for url: ", url);
  }

  return valideNotify;
}
