// 所有的语言项
export const languageLocales = {};

export enum LANGUAGE {
  ALL = 'all',
  ZH = 'zh',
  EN = 'en',
}
export type LanguageCode = string;

export interface LanguageType {
  all?: string;
  zh: string;
  en: string;
};

export type Language = LanguageCode | LanguageType;

export const languageTransform = (lang: Language, language: string = LANGUAGE.ALL) => {
  return typeof lang === 'string'
    ? ((languageLocales as any)[lang] ?? lang)
    : language === LANGUAGE.ALL
      ? [lang.en, lang.zh].join(' || ')
      : (lang as any)[language];
};
