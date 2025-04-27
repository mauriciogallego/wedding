import type { I18nParamProps } from "@/../@types/i18next";
import initTranslations from "../../i18n";
import TranslationsProvider from "@/providers/translation-provider";
import { SaveTheDateContent } from "@/components/save-the-date/save-the-date-content";
import getSheetData from "@/services/google-sheets.action";
import { AppProvider } from "@/providers/app-context";

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
      <AppProvider>
        <main>
          <SaveTheDateContent initialData={data} />
        </main>
      </AppProvider>
    </TranslationsProvider>
  );
}
