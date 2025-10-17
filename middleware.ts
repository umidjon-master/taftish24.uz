import createIntlMiddleware from "next-intl/middleware";

export default createIntlMiddleware({
  locales: ["ru", "uz"],
  defaultLocale: "uz",
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*|api|public|admin-login|ru/admin-login|uz/admin-login).*)",
  ],
};
