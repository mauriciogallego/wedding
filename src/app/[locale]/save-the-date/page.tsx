import type { I18nParamProps } from "@/../@types/i18next";
import initTranslations from "../../i18n";
import TranslationsProvider from "@/providers/translation-provider";
import { SaveTheDateContent } from "./components/save-the-date-content";

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
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <SaveTheDateContent />
      </div>
    </TranslationsProvider>
  );
}
