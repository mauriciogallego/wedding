import { i18nRouter } from "next-i18n-router";
import { NextRequest, NextResponse } from "next/server";
import i18nConfig from "../i18nConfig";

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.includes("save-the-date")) {
    const userAgent = request.headers.get("user-agent") || "";
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent
      );

    if (!isMobile && process.env.NODE_ENV !== "development") {
      return NextResponse.redirect(new URL("/desktop-warning", request.url));
    }
    return i18nRouter(request, i18nConfig);
  }

  if (request.nextUrl.pathname.includes("desktop-warning")) {
    return i18nRouter(request, i18nConfig);
  }

  return NextResponse.redirect(new URL("/save-the-date", request.url));
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
