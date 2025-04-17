import type { I18nParamProps } from "@/../@types/i18next";
import initTranslations from "../../i18n";
import TranslationsProvider from "@/providers/translation-provider";
import { SaveTheDateContent } from "./components/save-the-date-content";
import getSheetData from "./google-sheets.action";

const i18nNamespaces = ["home"];

export default async function SaveTheDate({
  params,
}: Readonly<I18nParamProps>) {
  const { locale } = await params;
  const { resources } = await initTranslations(locale, i18nNamespaces);
  const { data } = await getSheetData();

  return (
    <TranslationsProvider
      namespaces={i18nNamespaces}
      locale={locale}
      resources={resources}
    >
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen">
        <SaveTheDateContent data={data} />
      </div>
    </TranslationsProvider>
  );
}
