import { i18nRouter } from "next-i18n-router";
import { NextRequest, NextResponse } from "next/server";
import i18nConfig from "../i18nConfig";

export async function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.includes("save-the-date")) {
    return NextResponse.redirect(new URL("/save-the-date", request.url));
  }
  return i18nRouter(request, i18nConfig);
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
