import type { Metadata } from "next";
import { Archivo, Nunito, Lora } from "next/font/google";
import { AppHeader } from "@/components/AppHeader";
import { GlobalDictionaryLookup } from "@/components/GlobalDictionaryLookup";
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
            {children}
            <GlobalDictionaryLookup />
          </AuthProvider>
        </GlobalScoreProvider>
      </body>
    </html>
  );
}
