'use client';

import { ArrowRight, Boxes, Layers, Shield, Star, type LucideIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Footer } from '@/shared/components/layout/footer';
import { Header } from '@/shared/components/layout/header';
import { Button } from '@/shared/components/ui/button';
import { useTranslations } from '@/shared/hooks/use-translations';

const FEATURE_ICON_MAP: Record<'layers' | 'shield' | 'boxes', LucideIcon> = {
  layers: Layers,
  shield: Shield,
  boxes: Boxes,
};

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1696706902184-376291720485?auto=format&fit=crop&w=2400&q=80';

export const MarketingContent = () => {
  const { t } = useTranslations();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />

      <main className="flex-1">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={HERO_IMAGE}
              alt=""
              fill
              priority
              className="object-cover opacity-40"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-transparent" />
          </div>

          <div className="glass-glow -left-24 top-16 size-96" aria-hidden="true" />
          <div className="glass-glow -right-24 top-52 size-80" aria-hidden="true" />

          <div className="relative mx-auto w-full max-w-5xl px-6 pb-20 pt-24 sm:px-10 sm:pb-28 sm:pt-36">
            <div className="animate-rise glass-panel inline-flex items-center gap-2 rounded-full px-3 py-1">
              <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {t.home.badge}
              </span>
            </div>

            <h1 className="animate-rise animate-rise-1 mt-6 max-w-3xl text-4xl font-bold leading-none sm:text-6xl">
              {t.home.titleLead} <span className="text-shimmer">{t.home.titleAccent}</span>
            </h1>

            <p className="animate-rise animate-rise-2 mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {t.home.subtitle}
            </p>

            <div className="animate-rise animate-rise-3 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button size="lg" asChild className="font-semibold">
                <Link href="/tours">
                  {t.home.ctaPrimary}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/sign-in">{t.home.ctaSecondary}</Link>
              </Button>
            </div>

            <dl className="animate-rise animate-rise-4 mt-14 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {t.home.stats.map(({ value, label }, index) => (
                <div key={label} className="glass-panel rounded-lg px-5 py-4">
                  <dt className="flex items-baseline gap-2">
                    <span className="font-mono text-xs text-primary/70">
                      0{index + 1}
                    </span>
                    <span className="font-heading text-xl font-bold tracking-tight">{value}</span>
                  </dt>
                  <dd className="mt-1 text-sm text-muted-foreground">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section
          aria-label="Why book with us"
          className="grain-overlay relative mx-auto w-full max-w-5xl px-6 pb-24 pt-4 sm:px-10"
        >
          <p className="relative z-10 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {t.home.whyHeading}
          </p>

          <div className="relative z-10 mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {t.home.features.map((feature) => {
              const Icon = FEATURE_ICON_MAP[feature.icon];

              return (
                <div
                  key={feature.title}
                  className="glass-panel glass-panel-interactive rounded-md p-6"
                >
                  <span className="relative inline-flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <span className="glass-glow size-10 opacity-60" aria-hidden="true" />
                    <Icon className="relative size-5" />
                  </span>
                  <p className="mt-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {feature.label}
                  </p>
                  <h3 className="mt-2 text-lg font-bold">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 1: Popular Destinations */}
        <section className="relative mx-auto w-full max-w-5xl px-6 pb-24 pt-12 sm:px-10">
          <div className="flex flex-col items-center text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">{t.home.destinations.kicker}</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{t.home.destinations.title}</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              {t.home.destinations.subtitle}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {t.home.destinations.items.map((dest) => (
              <div key={dest.title} className="group relative overflow-hidden rounded-2xl bg-muted/50 transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="relative h-72 w-full overflow-hidden">
                  <Image src={dest.img} alt={dest.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                </div>
                <div className="absolute bottom-0 p-6 text-white w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium uppercase tracking-wider text-white/80">{dest.location}</span>
                  </div>
                  <h3 className="mt-2 text-xl font-bold">{dest.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: How It Works */}
        <section className="relative w-full bg-muted/30 py-24">
          <div className="mx-auto w-full max-w-5xl px-6 sm:px-10">
            <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">{t.home.process.kicker}</span>
                <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{t.home.process.title}</h2>
                <p className="mt-4 text-muted-foreground">
                  {t.home.process.subtitle}
                </p>
                <div className="mt-8 space-y-6">
                  {t.home.process.steps.map((item) => (
                    <div key={item.step} className="flex gap-4">
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 font-heading text-lg font-bold text-primary">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{item.title}</h3>
                        <p className="mt-2 text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative h-[600px] w-full overflow-hidden rounded-3xl lg:h-[700px]">
                <Image src={t.home.process.img} alt={t.home.process.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Testimonials */}
        <section className="relative mx-auto w-full max-w-5xl px-6 py-24 sm:px-10">
          <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[120px]" aria-hidden="true" />
          
          <div className="flex flex-col items-center text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">{t.home.testimonials.kicker}</span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{t.home.testimonials.title}</h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {t.home.testimonials.items.map((testimonial) => (
              <div key={testimonial.name} className="glass-panel relative rounded-2xl p-8 transition-transform hover:-translate-y-2">
                <div className="mb-6 flex gap-1 text-primary">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="size-4 fill-current" />
                  ))}
                </div>
                <p className="text-lg italic text-muted-foreground">"{testimonial.text}"</p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="size-10 rounded-full bg-gradient-to-br from-primary to-primary/50" />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
