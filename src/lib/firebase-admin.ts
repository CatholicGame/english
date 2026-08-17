import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

// Central data store — the entitlement (subscription) source of truth lives
// here instead of in each user's personal Google Drive, so a payment webhook
// (no user session, no Drive access token) can still write it. See
// docs/subscription-interim-system.md for why this exists.
//
// Requires three env vars (Firebase Console → Project settings → Service
// accounts → Generate new private key):
//   FIREBASE_PROJECT_ID
//   FIREBASE_CLIENT_EMAIL
//   FIREBASE_PRIVATE_KEY   (paste as-is; \n escapes are unescaped below since
//                           .env files can't hold real newlines)

let app: App;

function getFirebaseApp(): App {
  if (app) return app;
  const existing = getApps();
  if (existing.length > 0) {
    app = existing[0];
    return app;
  }

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!projectId || !clientEmail || !privateKey) {
    throw new Error("Firebase service account env vars are not set (FIREBASE_PROJECT_ID/FIREBASE_CLIENT_EMAIL/FIREBASE_PRIVATE_KEY)");
  }

  app = initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
  return app;
}

let firestore: Firestore | null = null;

export function getDb(): Firestore {
  if (!firestore) firestore = getFirestore(getFirebaseApp());
  return firestore;
}
