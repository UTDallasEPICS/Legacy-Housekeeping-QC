// export { default } from "next-auth/middleware";
import { withAuth } from "next-auth/middleware";

import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    if (
      req.nextUrl.pathname.startsWith("/admin") &&
      req.nextauth.token === null
    )
      return NextResponse.redirect(
        new URL("/auths/signin?message=You must sign in to continue.", req.url)
      );
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
