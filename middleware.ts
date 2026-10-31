import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: { signIn: "/admin" },
});

export const config = {
  matcher: [
    "/admin/dashboard/:path*",
    "/admin/profile/:path*",
    "/admin/projects/:path*",
    "/admin/skills/:path*",
    "/admin/experience/:path*",
    "/admin/education/:path*",
    "/admin/services/:path*",
    "/admin/achievements/:path*",
    "/admin/messages/:path*",
    "/admin/settings/:path*",
  ],
};
