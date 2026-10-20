import { NextResponse, type NextRequest } from "next/server";

const ADMIN_COOKIE = "amsilab_admin";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(ADMIN_COOKIE)?.value;

  if (pathname.startsWith("/admin/export")) {
    return NextResponse.next();
  }

  if (pathname === "/admin/login") {
    if (!token) {
      return NextResponse.next();
    }

    const dashboard = request.nextUrl.clone();
    dashboard.pathname = "/admin";
    dashboard.search = "";

    return NextResponse.redirect(dashboard);
  }

  if (token) {
    return NextResponse.next();
  }

  const login = request.nextUrl.clone();
  login.pathname = "/admin/login";
  login.search = "";

  return NextResponse.redirect(login);
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
