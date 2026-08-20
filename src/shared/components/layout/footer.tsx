'use client';

import { Compass } from 'lucide-react';
import Link from 'next/link';

import { APP_NAME } from '@/shared/const/app.const';
import { useTranslations } from '@/shared/hooks/use-translations';

export const Footer = () => {
  const { t } = useTranslations();

  return (
    <footer className="border-t border-white/10 bg-background/70 px-6 py-8 backdrop-blur-xl sm:px-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex size-6 items-center justify-center rounded-full bg-primary/15 text-primary">
            <Compass className="size-3.5" />
          </span>
          <span className="font-heading text-sm font-semibold tracking-tight text-foreground">
            {APP_NAME}
          </span>
        </div>

        <p className="text-center text-xs text-muted-foreground sm:text-left">{t.footer}</p>

        <Link
          href="/tours"
          className="text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          {t.nav.tours}
        </Link>
      </div>
    </footer>
  );
};
