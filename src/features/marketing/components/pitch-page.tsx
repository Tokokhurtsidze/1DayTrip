'use client';

import { ArrowRight, Lock, Mail, MapPin, type LucideIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { PitchSlideNav } from '@/features/marketing/components/pitch-slide-nav';
import { Header } from '@/shared/components/layout/header';
import { Button } from '@/shared/components/ui/button';
import {
  PITCH_CLOSING_IMAGE,
  PITCH_HERO_IMAGE,
  PITCH_MOSAIC_IMAGES,
  PITCH_SECTION_IDS,
  PITCH_SOLUTION_IMAGE,
  PITCH_TRUST_ICONS,
  type PitchTrustIcon,
} from '@/shared/const/pitch.const';
import { useTranslations } from '@/shared/hooks/use-translations';

const TRUST_ICON_MAP: Record<PitchTrustIcon, LucideIcon> = {
  lock: Lock,
  'map-pin': MapPin,
  mail: Mail,
};

export const PitchPage = () => {
  const { t } = useTranslations();

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background text-foreground">
      <Header />
      <PitchSlideNav sectionIds={PITCH_SECTION_IDS} />

      <main className="no-scrollbar flex-1 snap-y snap-mandatory overflow-y-scroll scroll-smooth">
        {/* === HERO === */}
        <section id="hero" className="relative flex min-h-full snap-start flex-col justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image src={PITCH_HERO_IMAGE} alt="" fill priority className="object-cover opacity-40" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/40" />
          </div>
          <div className="glass-glow -left-24 top-16 size-96" aria-hidden="true" />

          <div className="relative mx-auto w-full max-w-5xl px-6 py-16 sm:px-10">
            <div className="animate-rise glass-panel inline-flex items-center gap-2 rounded-full px-3 py-1">
              <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {t.pitch.badge}
              </span>
            </div>
            <h1 className="animate-rise animate-rise-1 mt-6 max-w-3xl text-4xl font-bold leading-none sm:text-6xl">
              {t.pitch.heroTitle} <span className="text-shimmer">{t.pitch.heroAccent}</span>
            </h1>
            <p className="animate-rise animate-rise-2 mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t.pitch.heroSubtitle}
            </p>
          </div>
        </section>

        {/* === PROBLEM === */}
        <section id="problem" className="flex min-h-full snap-start flex-col justify-center">
          <div className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {t.pitch.problemKicker}
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">{t.pitch.problemTitle}</h2>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {t.pitch.painPoints.map((point, index) => (
                <div key={point} className="glass-panel rounded-md p-6">
                  <span className="font-mono text-sm text-primary/70">0{index + 1}</span>
                  <p className="mt-4 text-base leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === SOLUTION === */}
        <section id="solution" className="relative flex min-h-full snap-start flex-col justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image src={PITCH_SOLUTION_IMAGE} alt="" fill className="object-cover opacity-25" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
          </div>
          <div className="relative mx-auto w-full max-w-5xl px-6 py-16 sm:px-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {t.pitch.solutionKicker}
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-bold sm:text-4xl">
              {t.pitch.solutionTitle} <span className="text-primary">{t.pitch.solutionAccent}</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t.pitch.solutionText}
            </p>
          </div>
        </section>

        {/* === HOW IT WORKS === */}
        <section id="how" className="flex min-h-full snap-start flex-col justify-center">
          <div className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {t.pitch.howKicker}
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{t.pitch.howTitle}</h2>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {t.pitch.steps.map((step, index) => (
                <div key={step.title} className="glass-panel glass-panel-interactive rounded-md p-6">
                  <span className="font-heading text-3xl font-bold text-primary">0{index + 1}</span>
                  <h3 className="mt-4 text-lg font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === TRUST === */}
        <section id="trust" className="grain-overlay relative flex min-h-full snap-start flex-col justify-center">
          <div className="relative z-10 mx-auto w-full max-w-5xl px-6 py-16 sm:px-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {t.pitch.trustKicker}
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{t.pitch.trustTitle}</h2>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {t.pitch.trustPoints.map((point, index) => {
                const Icon = TRUST_ICON_MAP[PITCH_TRUST_ICONS[index]];
                return (
                  <div key={point.title} className="glass-panel glass-panel-interactive rounded-md p-6">
                    <span className="inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Icon className="size-5" />
                    </span>
                    <h3 className="mt-4 text-lg font-bold">{point.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{point.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* === BILINGUAL === */}
        <section id="bilingual" className="flex min-h-full snap-start flex-col justify-center">
          <div className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {t.pitch.bilingualKicker}
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              {t.pitch.bilingualTitle} <span className="text-primary">{t.pitch.bilingualAccent}</span>
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="glass-panel rounded-md p-6">
                <span className="font-mono text-xs uppercase tracking-widest text-primary">{t.pitch.enLabel}</span>
                <p className="mt-4 font-heading text-xl leading-snug">{t.pitch.enQuote}</p>
                <p className="mt-3 text-sm text-muted-foreground">{t.pitch.enCaption}</p>
              </div>
              <div className="glass-panel rounded-md p-6">
                <span className="font-mono text-xs uppercase tracking-widest text-primary">{t.pitch.kaLabel}</span>
                <p className="mt-4 font-heading text-xl leading-snug">{t.pitch.kaQuote}</p>
                <p className="mt-3 text-sm text-muted-foreground">{t.pitch.kaCaption}</p>
              </div>
            </div>
          </div>
        </section>

        {/* === THE EXPERIENCE === */}
        <section id="experience" className="flex min-h-full snap-start flex-col justify-center">
          <div className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {t.pitch.experienceKicker}
            </p>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{t.pitch.experienceTitle}</h2>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {PITCH_MOSAIC_IMAGES.map((src, index) => {
                const label = t.pitch.mosaicLabels[index];
                return (
                  <div key={src} className="relative aspect-square overflow-hidden rounded-md">
                    <Image src={src} alt={label} fill className="object-cover" sizes="(min-width: 640px) 25vw, 50vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 font-mono text-xs uppercase tracking-widest text-white">
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* === CLOSING === */}
        <section id="closing" className="relative flex min-h-full snap-start flex-col justify-center overflow-hidden">
          <div className="absolute inset-0">
            <Image src={PITCH_CLOSING_IMAGE} alt="" fill className="object-cover opacity-30" sizes="100vw" />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background" />
          </div>
          <div className="glass-glow bottom-0 right-0 size-96 translate-x-1/4 translate-y-1/4" aria-hidden="true" />

          <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-6 py-16 text-center sm:px-10">
            <h2 className="text-4xl font-bold leading-tight sm:text-5xl">
              {t.pitch.closingTitle} <span className="text-primary">{t.pitch.closingAccent}</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t.pitch.closingSubtitle}
            </p>
            <Button size="lg" asChild className="mt-8 font-semibold">
              <Link href="/tours">
                {t.pitch.closingCta}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};
