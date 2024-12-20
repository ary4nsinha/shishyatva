import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard",
  "/resume",
  "/account",
  "/projects",
]);

export default clerkMiddleware((auth, req) => {
  const { userId } = auth();
  const path = req.nextUrl.pathname;

  // If user is logged in and tries to access the home page, redirect to /app/calculator
  if (userId && path === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Protect /app routes
  if (isProtectedRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
