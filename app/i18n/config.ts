// Next.js i18n config — centralised so middleware, layouts, and helpers stay in sync.

export const i18n = {
  defaultLocale: "ru",
  locales: ["ru", "en"],
} as const;

export type Locale = (typeof i18n.locales)[number];

export function isLocale(value: string): value is Locale {
  return (i18n.locales as readonly string[]).includes(value);
}
