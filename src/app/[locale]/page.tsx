import type { I18nParamProps } from "@/../@types/i18next";
import initTranslations from "../i18n";
import TranslationsProvider from "@/providers/translation-provider";
import TypewriterClient from "../../components/typewriter-client/typewriter-client";

const i18nNamespaces = ["home"];

export default async function Home({ params }: Readonly<I18nParamProps>) {
  const { locale } = await params;
  const { resources, t } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
          <TypewriterClient 
            strings={[t("welcomeEnter"), t("weddingEnter")]}
          />
        </main>
      </div>
    </TranslationsProvider>
  );
}
