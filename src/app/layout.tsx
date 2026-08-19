import type { Metadata, Viewport } from "next";
import { Archivo, Nunito, Lora } from "next/font/google";
import { AppHeader } from "@/components/AppHeader";
import { GlobalDictionaryLookup } from "@/components/GlobalDictionaryLookup";
import { DriveQuotaWarning } from "@/components/DriveQuotaWarning";
import { OnboardingGuide } from "@/components/OnboardingGuide";
import { AuthProvider } from "@/lib/auth-context";
import { GlobalScoreProvider } from "@/lib/global-score-context";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "800"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "800"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Vocabulary Builder Pro",
  description: "Learn English collocations and phrasal verbs by topic.",
};

// viewportFit: "cover" lets the page's viewport extend into the
// notch/gesture-nav safe areas instead of the OS reserving that space outside
// it — required for env(safe-area-inset-*) to report anything but 0. Matters
// most in the app's own fullscreen mode (AppHeader's Fullscreen API toggle),
// where a pinned bottom action bar (see ActionBarScreen) can otherwise end up
// rendered underneath Android's on-screen gesture bar.
export const viewport: Viewport = {
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${archivo.variable} ${nunito.variable} ${lora.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-bg text-ink">
        <GlobalScoreProvider>
          <AuthProvider>
            <AppHeader />
            <DriveQuotaWarning />
            {children}
            <GlobalDictionaryLookup />
            <OnboardingGuide />
          </AuthProvider>
        </GlobalScoreProvider>
      </body>
    </html>
  );
}
