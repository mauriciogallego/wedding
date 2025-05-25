import TranslationsProvider from "@/providers/translation-provider";
import { AppProvider } from "@/providers/app-context";
import { dir } from "i18next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { localeTypes } from "../../../@types/i18next";
import initTranslations from "../i18n";
import "../globals.css";
import { Analytics } from "@vercel/analytics/react";
import MixpanelInit from "@/components/MixpanelInit";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gallego Mallea family",
};

const i18nNamespaces = ["common"];

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{
    locale: localeTypes;
  }>;
}) {
  const { locale } = await params;
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <html lang={locale} dir={dir("ltr")} translate="no">
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0, viewport-fit=cover"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProvider>{children}</AppProvider>
        <TranslationsProvider
          namespaces={i18nNamespaces}
          locale={locale}
          resources={resources}
        />
        <Analytics />
        <MixpanelInit />
      </body>
    </html>
  );
}
