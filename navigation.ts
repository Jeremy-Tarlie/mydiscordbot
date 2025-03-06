import {
  createLocalizedPathnamesNavigation,
  Pathnames
} from "next-intl/navigation";
import i18nextConfig from "@/next-i18n.config";

export const { locales, localePrefix } = i18nextConfig;

export const pathnames = {
  "/": "/",
  "/command": "/command",
  "/command_finish": "/command_finish",
  "/privacy-policy": "/privacy-policy",
 
} satisfies Pathnames<typeof locales>;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createLocalizedPathnamesNavigation({
    locales,
    localePrefix: localePrefix as any,
    pathnames
  });
