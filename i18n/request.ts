import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

const locales = ['fr', 'en'];

export default getRequestConfig(async ({requestLocale}) => {
  // next-intl v4: requestLocale is a Promise that must be awaited
  let locale = await requestLocale;

  // Fallback to default locale if undefined
  if (!locale) locale = 'fr';

  // Validate the locale
  if (!locales.includes(locale)) notFound();

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});

