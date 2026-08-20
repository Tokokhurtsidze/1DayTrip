'use client';

import { TRANSLATIONS } from '@/shared/const/translations.const';
import { useLocale } from '@/shared/hooks/use-locale';

export function useTranslations() {
  const { locale, setLocale } = useLocale();
  return { locale, setLocale, t: TRANSLATIONS[locale] };
}
