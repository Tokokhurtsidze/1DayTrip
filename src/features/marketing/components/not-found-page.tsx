'use client';

import { ArrowRight, Compass } from 'lucide-react';
import Link from 'next/link';

import { Footer } from '@/shared/components/layout/footer';
import { Button } from '@/shared/components/ui/button';
import { APP_NAME } from '@/shared/const/app.const';
import { useTranslations } from '@/shared/hooks/use-translations';

export const NotFoundPage = () => {
  const { t } = useTranslations();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <div className="px-6 py-5 sm:px-10">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <span className="inline-flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Compass className="size-4" />
          </span>
          <span className="font-heading text-sm font-semibold tracking-tight">{APP_NAME}</span>
        </Link>
      </div>

      <main className="relative flex flex-1 items-center justify-center overflow-hidden px-6">
        <div className="glass-glow left-1/2 top-1/2 size-96 -translate-x-1/2 -translate-y-1/2" aria-hidden="true" />

        <div className="glass-panel animate-rise relative z-10 flex max-w-md flex-col items-center gap-4 rounded-lg p-10 text-center">
          <span className="font-mono text-sm text-primary/70">404</span>
          <Compass className="size-10 text-primary" strokeWidth={1.5} />
          <h1 className="font-heading text-2xl font-bold sm:text-3xl">{t.notFound.title}</h1>
          <p className="text-sm leading-relaxed text-muted-foreground">{t.notFound.subtitle}</p>
          <Button asChild className="mt-2 font-semibold">
            <Link href="/tours">
              {t.notFound.cta}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};
