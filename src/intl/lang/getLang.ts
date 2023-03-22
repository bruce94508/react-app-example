import { match } from '@formatjs/intl-localematcher';
import { isValidKey } from 'types';

const langs = {
  zh: {},
  en: {},
};

export const getLang = (locale: string = 'zh-TW') => {
  const matchLocale = match([locale], Object.keys(langs), 'zh-TW');
  return isValidKey(matchLocale, langs) ? langs[matchLocale] : langs.zh;
};
