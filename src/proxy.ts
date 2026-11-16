import { NextResponse, type NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const english = /^\/en(?:\/|$)/.test(url.pathname);
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-site-locale", english ? "en" : "it");
  if (english) {
    url.pathname = url.pathname.replace(/^\/en/, "") || "/";
    return NextResponse.rewrite(url, { request: { headers: requestHeaders } });
  }
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = { matcher: ["/((?!api|_next|.*\\..*).*)"] };
