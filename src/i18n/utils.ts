import { ui, defaultLang, type SupportedLanguage, languages } from './ui';
export type { SupportedLanguage };

export function getLangFromUrl(url: URL): SupportedLanguage {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as SupportedLanguage;
  return defaultLang;
}

export function getDirFromLang(lang: SupportedLanguage): 'rtl' | 'ltr' {
  return lang === 'ar' ? 'rtl' : 'ltr';
}

export function useTranslations(lang: SupportedLanguage) {
  return function t(key: keyof typeof ui[typeof defaultLang]): string {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function useTranslatedPath(lang: SupportedLanguage) {
  return function translatePath(path: string, l: SupportedLanguage = lang): string {
    const cleanPath = path.replace(/^\/(ar|en)/, '');
    const normalized = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
    if (l === defaultLang) {
      return normalized === '/' ? '/' : normalized.replace(/\/$/, '') + '/';
    }
    return `/en${normalized === '/' ? '/' : normalized.replace(/\/$/, '') + '/'}`;
  };
}
