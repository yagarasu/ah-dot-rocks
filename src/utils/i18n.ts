export function getByLocale(locale: string, translations: Record<string, string>, defaultLocale: string) {
  return translations[locale] ??  translations[defaultLocale] ?? "";
}

export function getLabelByLocale(locale: string, key: string, translations: Record<string, Record<string, string>>, defaultLocale: string) {
  const currentLocaleMap = translations[locale] ?? translations[defaultLocale] ?? {};
  const label = currentLocaleMap[key] ?? "";
  return label;
}

export function getLocaleRoute(locale: string, path: string) {
  const parsedPath = path.charAt(0) !== '/' ? '/' + path : path;
  return `/${locale}${parsedPath}`;
}

export function getLocaleFromOtherLocale(path: string, locale: string) {
  return path.replace(/^\/[a-zA-Z-]+/, `/${locale}`);
}
