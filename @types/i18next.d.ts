import "i18next";

import type home from "@/app/locales/en/home.json";
import type error from "@/app/locales/en/error.json";

export interface I18nNamespaces {
  home: typeof home;
  error: typeof error;
}

type localeTypes = "en" | "es";

export interface I18nParamProps {
  params: Promise<{
    locale: localeTypes;
  }>;
}

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "home" | "error";
    resources: I18nNamespaces;
  }
}
