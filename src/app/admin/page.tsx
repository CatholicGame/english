import { notFound } from "next/navigation";
import { readSession } from "@/lib/google-oauth";
import { resolveAdminRole } from "@/lib/admin";
import { listSubAdmins } from "@/lib/admin-db";
import { listSubscriptions } from "@/lib/subscription-db";
import { listReviewsForAdmin } from "@/lib/reviews-db";
import { AdminDashboard } from "./AdminDashboard";

export default async function AdminPage() {
  const session = await readSession();
  const role = await resolveAdminRole(session?.user.email);
  if (!role) notFound();

  const subscriptions = await listSubscriptions();
  subscriptions.sort((a, b) => b.updatedAt - a.updatedAt);

  const subAdmins = role === "super" ? await listSubAdmins() : [];
  const reviews = await listReviewsForAdmin();

  return <AdminDashboard subscriptions={subscriptions} role={role} subAdmins={subAdmins} reviews={reviews} />;
}
