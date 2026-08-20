'use client';

import { useCallback, useEffect, useState } from 'react';

import { DEFAULT_LOCALE, Locale } from '@/shared/const/locale.const';

const STORAGE_KEY = 'locale';
const LOCALE_EVENT = 'locale-change';

export function useLocale() {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored && stored !== DEFAULT_LOCALE) {
      // The stored locale is unknown at server-render time, so the initial state
      // must match the server's default here and sync to the real value post-hydration.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocaleState(stored);
    }

    function handleLocaleChange(event: Event) {
      setLocaleState((event as CustomEvent<Locale>).detail);
    }
    window.addEventListener(LOCALE_EVENT, handleLocaleChange);
    return () => window.removeEventListener(LOCALE_EVENT, handleLocaleChange);
  }, []);

  const setLocale = useCallback((next: Locale) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    window.dispatchEvent(new CustomEvent<Locale>(LOCALE_EVENT, { detail: next }));
  }, []);

  return { locale, setLocale };
}
