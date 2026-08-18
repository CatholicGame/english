// Thin PayPal REST API client for the international checkout option — PayOS
// stays the domestic VND option (see docs/subscription-interim-system.md).
// Plain fetch on the Orders v2 API: OAuth2 client-credentials for a token,
// create an order (hosted approval page), then capture it once the buyer
// approves. Env vars:
//   PAYPAL_CLIENT_ID / PAYPAL_SECRET  — REST API app creds (PayPal Developer → Apps & Credentials)
//   PAYPAL_ENV                        — "sandbox" | "live" (picks the base URL)
// Secrets never leave the server — the browser only ever talks to /api/paypal/*.

const PAYPAL_BASE =
  process.env.PAYPAL_ENV === "sandbox"
    ? "https://api-m.sandbox.paypal.com"
    : "https://api-m.paypal.com";

let tokenCache: { token: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  const now = Date.now();
  if (tokenCache && tokenCache.expiresAt > now) return tokenCache.token;
  if (!process.env.PAYPAL_CLIENT_ID || !process.env.PAYPAL_SECRET) {
    throw new Error("Missing PAYPAL_CLIENT_ID/PAYPAL_SECRET env vars");
  }
  const res = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_SECRET}`,
      ).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`PayPal OAuth token failed: ${res.status} ${text}`);
  }
  const json = await res.json();
  // Cache until shortly before expiry so a burst of requests shares one token.
  tokenCache = { token: json.access_token, expiresAt: now + (json.expires_in - 60) * 1000 };
  return json.access_token;
}

export interface PayPalOrder {
  /** PayPal's own order id — echoed back as `token` on the approval redirect
   * and required by the capture call; doubles as the Firestore doc id. */
  paypalOrderId: string;
  /** Hosted PayPal approval URL the browser should be redirected to. */
  approveUrl: string;
}

export async function createPayPalOrder(
  amountUsd: number,
  returnUrl: string,
  cancelUrl: string,
): Promise<PayPalOrder> {
  const token = await getAccessToken();
  const res = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [{ amount: { currency_code: "USD", value: amountUsd.toFixed(2) } }],
      payment_source: {
        paypal: { experience_context: { return_url: returnUrl, cancel_url: cancelUrl } },
      },
    }),
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`PayPal create order failed: ${res.status} ${text}`);
  }
  const json = await res.json();
  // PayPal historically returned the approval link with rel "approve", but the
  // current sandbox/live responses use "payer-action" — accept both so a
  // redirect never fails on the link shape.
  const approve = json.links?.find(
    (l: { rel: string; href: string }) => l.rel === "approve" || l.rel === "payer-action",
  );
  if (!approve?.href) throw new Error("PayPal create order: no approve link returned");
  return { paypalOrderId: json.id, approveUrl: approve.href };
}

/** Captures an approved order — the step that actually moves the money. Returns
 * false for anything that isn't a fresh completion (already captured, cancelled,
 * expired, ...) so the caller can treat repeated attempts as no-ops. */
export async function capturePayPalOrder(paypalOrderId: string): Promise<boolean> {
  const token = await getAccessToken();
  const res = await fetch(`${PAYPAL_BASE}/v2/checkout/orders/${paypalOrderId}/capture`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("PayPal capture failed", res.status, text);
    return false;
  }
  const json = await res.json();
  return json.status === "COMPLETED";
}

/** Verifies a PayPal webhook delivery via PayPal's own
 * verify-webhook-signature API (the transmission headers + webhook_id check we
 * can't do locally). Requires PAYPAL_WEBHOOK_ID — issued when the webhook URL
 * is registered in the PayPal dashboard; sandbox and live have separate ids. */
export async function verifyPayPalWebhookSignature(
  headers: Headers,
  event: unknown,
): Promise<boolean> {
  const webhookId = process.env.PAYPAL_WEBHOOK_ID;
  if (!webhookId) return false;
  const transmissionId = headers.get("paypal-transmission-id");
  const transmissionTime = headers.get("paypal-transmission-time");
  const certUrl = headers.get("paypal-cert-url");
  const authAlgo = headers.get("paypal-auth-algo");
  const transmissionSig = headers.get("paypal-transmission-sig");
  if (!transmissionId || !transmissionTime || !certUrl || !authAlgo || !transmissionSig) {
    return false;
  }

  const token = await getAccessToken();
  const res = await fetch(`${PAYPAL_BASE}/v1/notifications/verify-webhook-signature`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      transmission_id: transmissionId,
      transmission_time: transmissionTime,
      cert_url: certUrl,
      auth_algo: authAlgo,
      transmission_sig: transmissionSig,
      webhook_id: webhookId,
      webhook_event: event,
    }),
    cache: "no-store",
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    console.error("PayPal verify-webhook-signature failed", res.status, text);
    return false;
  }
  const json = await res.json();
  return json.verification_status === "SUCCESS";
}
