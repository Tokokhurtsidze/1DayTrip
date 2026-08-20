'use client';

import { useLocale } from '@/shared/hooks/use-locale';
import { cn } from '@/shared/lib/utils';

type LocaleToggleProps = {
  className?: string;
};

export const LocaleToggle = ({ className }: LocaleToggleProps) => {
  const { locale, setLocale } = useLocale();

  return (
    <button
      type="button"
      onClick={() => setLocale(locale === 'en' ? 'ka' : 'en')}
      aria-label="Switch language"
      className={cn(
        'rounded-full border border-border px-2 py-1 font-mono text-xs uppercase text-muted-foreground transition-colors hover:text-foreground',
        className
      )}
    >
      {locale === 'en' ? 'ka' : 'en'}
    </button>
  );
};
