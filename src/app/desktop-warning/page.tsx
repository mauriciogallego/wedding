import { AppProvider } from "@/providers/app-context";
import TranslationsProvider from "@/providers/translation-provider";
import { I18nParamProps } from "@/../@types/i18next";
import initTranslations from "../i18n";
import { DesktopWarningContent } from "@/components/desktop-warning/desktop-warning-content";

const i18nNamespaces = ["error"];

export default async function DesktopWarning({
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
      <AppProvider>
        <main>
          <DesktopWarningContent />
        </main>
      </AppProvider>
    </TranslationsProvider>
  );
}
