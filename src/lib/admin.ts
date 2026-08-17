import { getSubAdmin } from "./admin-db";

// Gates access to /admin and /api/admin/* — see docs/subscription-interim-system.md
// "Không có admin dashboard" gap. src/proxy.ts only checks that *some* session
// cookie exists, not who it is, so every admin route must resolve the role
// itself.
//
// Two tiers:
// - "super": from ADMIN_EMAILS (env, redeploy to change) — full access,
//   including adding/removing viewer sub-admins. Kept env-only (not
//   Firestore-editable) so a super admin can never accidentally lock
//   themselves out via a bad Firestore write.
// - "viewer": added at runtime by a super admin, stored in Firestore
//   (src/lib/admin-db.ts) — read-only dashboard access, no extend/lock/manage.

export type AdminRole = "super" | "viewer" | null;

const SUPER_ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export function isSuperAdminEmail(email?: string | null): boolean {
  return !!email && SUPER_ADMIN_EMAILS.includes(email.trim().toLowerCase());
}

export async function resolveAdminRole(email?: string | null): Promise<AdminRole> {
  if (isSuperAdminEmail(email)) return "super";
  if (!email) return null;
  const record = await getSubAdmin(email);
  return record ? "viewer" : null;
}
