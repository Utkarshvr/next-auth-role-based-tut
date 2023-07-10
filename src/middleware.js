import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // withAuth modifies your `Request` with the user's token
  function middleware(request) {
    const pathname = request.nextUrl.pathname;
    const token = request.nextauth.token;

    // Only admin can access the admin page
    if (pathname.startsWith("/extra") && token?.role !== "admin")
      // The extra route will still display in the URL bar, but actually we will be on the denied page
      return NextResponse.rewrite(new URL("/denied", request.url));

    // Either admin or manager can access the admin page
    if (
      pathname.startsWith("/client") &&
      token?.role !== "admin" &&
      token?.role !== "manager"
    )
      return NextResponse.rewrite(new URL("/denied", request.url));
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = { matcher: ["/extra", "/client", "/dashboard"] };
