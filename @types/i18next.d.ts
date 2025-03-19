import "i18next";

import type home from "@/app/locales/en/home.json";

export interface I18nNamespaces {
  home: typeof home;
}

type localeTypes = "en" | "es";

interface I18nParamProps {
  params: Promise<{
    locale: localeTypes;
  }>;
}

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "home";
    resources: I18nNamespaces;
  }
}
