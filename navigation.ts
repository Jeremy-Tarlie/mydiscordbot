import {
  createLocalizedPathnamesNavigation,
  Pathnames
} from "next-intl/navigation";
import { locales } from "@/i18n";

export const localePrefix = 'always' as const;

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
