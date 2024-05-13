import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
  return json(
    {
      works: "it works",
    },
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
};
