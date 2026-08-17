import { initAnalytics, trackEvent } from "@/lib/firebase-client";

initAnalytics();

// App Router client-side navigations don't trigger a full page load, so GA's
// automatic page_view never fires for them — log it ourselves on each
// route transition instead.
export function onRouterTransitionStart(url: string): void {
  trackEvent("page_view", { page_path: url });
}
