import { getCookieMap } from 'functions/getCookieMap';
import * as React from 'react';
import { IntlProvider, useIntl } from 'react-intl';
import { Wrapper } from 'types';

import { getLang } from './lang/getLang';

const IntlContext = React.createContext({ setLocale: (locale: string) => {} });

// note defaultValue of localeState depends on the target audience. IntlProviderProps.defaultLocale depends on the defaultMessage language
export const IntlWrapper: Wrapper = (props) => {
  const [locale, setLocale] = React.useState('zh-TW');
  const messages = React.useMemo(() => getLang(locale), [locale]);
  const contextValue = React.useMemo(() => ({ setLocale: (locale: string) => setLocale(locale) }), []);
  React.useEffect(() => {
    const cookieMap = getCookieMap();
    const locale = cookieMap.get('locale');
    if (locale) {
      setLocale(locale);
    }
  }, []);

  return (
    <IntlContext.Provider value={contextValue}>
      <IntlProvider locale={locale} messages={messages} defaultLocale="en-US">
        {props.children}
      </IntlProvider>
    </IntlContext.Provider>
  );
};

export const useIntlContext = () => {
  const intl = useIntl();
  const intlContext = React.useContext(IntlContext);
  return { intl, ...intlContext };
};
