import { i18nRouter } from "next-i18n-router";
import { NextRequest, NextResponse } from "next/server";
import i18nConfig from "../i18nConfig";

export async function middleware(request: NextRequest) {
  // Only handle save-the-date routes
  if (request.nextUrl.pathname.includes("save-the-date")) {
    const userAgent = request.headers.get("user-agent") || "";
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent
      );

    if (!isMobile) {
      return NextResponse.redirect(new URL("/desktop-warning", request.url));
    }
  }

  return i18nRouter(request, i18nConfig);
}

export const config = {
  matcher: [
    // Only match save-the-date routes
    "/save-the-date/:path*",
  ],
};
