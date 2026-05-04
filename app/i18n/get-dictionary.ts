import "server-only";
import type { Locale } from "./config";
import ru from "./dictionaries/ru.json";
import en from "./dictionaries/en.json";

// Static imports keep types narrow (Dictionary inferred from ru.json)
// while still letting Next.js tree-shake unused locales server-side.
const dictionaries = { ru, en } as const;

export type Dictionary = typeof ru;

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale];
