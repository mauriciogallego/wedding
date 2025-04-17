import type { I18nParamProps } from "@/../@types/i18next";
import initTranslations from "../../i18n";
import TranslationsProvider from "@/providers/translation-provider";
import { SaveTheDateContent } from "@/components/save-the-date/save-the-date-content";

const i18nNamespaces = ["home"];

export default async function SaveTheDate({
  params,
}: Readonly<I18nParamProps>) {
  const { locale } = await params;
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen">
        <main className="flex flex-col gap-[32px] row-start-2 items-center">
          <SaveTheDateContent />
        </main>
      </div>
    </TranslationsProvider>
  );
}
