import { PayOS } from "@payos/node";

// Reads PAYOS_CLIENT_ID / PAYOS_API_KEY / PAYOS_CHECKSUM_KEY from env
// automatically (the SDK's own default behavior) — see docs/subscription-interim-system.md
// for the flow this powers (create-payment-link + webhook).
let client: PayOS | null = null;

export function getPayOS(): PayOS {
  if (!client) client = new PayOS();
  return client;
}
