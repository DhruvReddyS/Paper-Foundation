import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: { signIn: "/admin/login" },
});

// Explicit admin route list — /admin/login is intentionally omitted so it stays public.
export const config = {
  matcher: [
    "/admin",
    "/admin/articles/:path*",
    "/admin/myths/:path*",
    "/admin/resources/:path*",
    "/admin/inquiries/:path*",
    "/admin/subscribers/:path*",
  ],
};
