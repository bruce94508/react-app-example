import { match } from '@formatjs/intl-localematcher';
import { isValidKey } from 'types';

import en from './en.json';
import zh from './zh.json';

const langs = {
  en,
  zh,
};

export const getLang = (locale: string = 'zh-TW') => {
  const matchLocale = match([locale], Object.keys(langs), 'zh-TW');
  return isValidKey(matchLocale, langs) ? langs[matchLocale] : langs.zh;
};
