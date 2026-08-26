import { notFound } from "next/navigation";
import { readSession } from "@/lib/google-oauth";
import { resolveAdminRole } from "@/lib/admin";
import { listSubAdmins } from "@/lib/admin-db";
import { listSubscriptions, listPaidOrders } from "@/lib/subscription-db";
import { listReviewsForAdmin } from "@/lib/reviews-db";
import { listTokenUsage } from "@/lib/token-usage-db";
import { AdminDashboard } from "./AdminDashboard";

export default async function AdminPage() {
  const session = await readSession();
  const role = await resolveAdminRole(session?.user.email);
  if (!role) notFound();

  const allSubscriptions = await listSubscriptions();
  const subscriptions = allSubscriptions.filter((s) => !s.email.startsWith("guest:"));
  const guests = allSubscriptions.filter((s) => s.email.startsWith("guest:"));
  subscriptions.sort((a, b) => b.updatedAt - a.updatedAt);
  guests.sort((a, b) => b.trialStartedAt - a.trialStartedAt);

  const subAdmins = role === "super" ? await listSubAdmins() : [];
  const reviews = await listReviewsForAdmin();
  const orders = await listPaidOrders();
  const tokenUsage = await listTokenUsage();

  return (
    <AdminDashboard
      subscriptions={subscriptions}
      guests={guests}
      role={role}
      subAdmins={subAdmins}
      reviews={reviews}
      orders={orders}
      tokenUsage={tokenUsage}
    />
  );
}
