import type { Metadata } from "next";
import { Archivo } from "next/font/google";
import { AuthStatus } from "@/components/AuthStatus";
import { AuthProvider } from "@/lib/auth-context";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "600", "800"],
});

export const metadata: Metadata = {
  title: "English App",
  description: "Learn English collocations and phrasal verbs by topic.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${archivo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-bg text-ink">
        <AuthProvider>
          <AuthStatus />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
