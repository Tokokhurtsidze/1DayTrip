'use client';
import { Compass, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import { useLogout } from '@/features/auth/hooks/use-logout';
import { LocaleToggle } from '@/shared/components/layout/locale-toggle';
import { ThemeToggle } from '@/shared/components/layout/theme-toggle';
import { Button } from '@/shared/components/ui/button';
import { APP_NAME } from '@/shared/const/app.const';
import { useTranslations } from '@/shared/hooks/use-translations';
import { cn } from '@/shared/lib/utils';

type SessionUser = {
  name?: string | null;
  avatar?: string | null;
  role?: 'admin' | 'user';
};

type HeaderActionsProps = {
  stacked?: boolean;
  onNavigate?: () => void;
};

const HeaderActions = ({ stacked, onNavigate }: HeaderActionsProps) => {
  const { data: session } = useSession();
  const { logout } = useLogout();
  const { t } = useTranslations();
  const sessionUser = session?.user as SessionUser | undefined;
  const userName = sessionUser?.name ?? '';
  const initials = userName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

  const linkClassName = cn(
    'text-muted-foreground hover:text-foreground hover:bg-accent',
    stacked && 'w-full justify-start'
  );

  return (
    <div className={cn('flex items-center gap-2', stacked && 'flex-col items-stretch gap-3')}>
      <Button variant="ghost" size="sm" asChild className={linkClassName}>
        <Link href="/tours" onClick={onNavigate}>
          {t.nav.tours}
        </Link>
      </Button>

      <div className={cn('flex items-center gap-2', stacked && 'justify-between')}>
        <LocaleToggle />
        <ThemeToggle />
      </div>

      {sessionUser ? (
        <>
          {sessionUser.role === 'admin' && (
            <Button variant="ghost" size="sm" asChild className={linkClassName}>
              <Link href="/dashboard" onClick={onNavigate}>
                {t.nav.dashboard}
              </Link>
            </Button>
          )}
          <div className={cn('flex items-center gap-3', stacked && 'w-full')}>
            {sessionUser.avatar ? (
              <Image
                src={sessionUser.avatar}
                alt={userName}
                width={32}
                height={32}
                className="size-8 shrink-0 rounded-full border border-border object-cover"
              />
            ) : (
              <div
                className={cn(
                  'flex size-8 shrink-0 items-center justify-center rounded-full',
                  'border border-border bg-muted text-xs font-semibold text-foreground'
                )}
              >
                {initials || 'U'}
              </div>
            )}
            <span className="truncate text-sm text-muted-foreground">{userName}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={() => { logout(); onNavigate?.(); }} className={linkClassName}>
            {t.nav.signOut}
          </Button>
        </>
      ) : (
        <>
          <Button variant="ghost" size="sm" asChild className={linkClassName}>
            <Link href="/sign-in" onClick={onNavigate}>
              {t.nav.signIn}
            </Link>
          </Button>
          <Button
            size="sm"
            asChild
            className={cn('bg-primary text-primary-foreground hover:bg-primary/90 font-semibold', stacked && 'w-full justify-center')}
          >
            <Link href="/sign-up" onClick={onNavigate}>
              {t.nav.signUp}
            </Link>
          </Button>
        </>
      )}
    </div>
  );
};

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-background/70 px-6 py-5 backdrop-blur-xl sm:px-10">
      <Link
        href="/"
        className="group flex items-center gap-2.5"
        onClick={() => setMobileMenuOpen(false)}
      >
        <span
          aria-hidden="true"
          className="relative inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground"
        >
          <span className="glass-glow size-8 opacity-70" aria-hidden="true" />
          <Compass className="relative size-4 transition-transform duration-500 group-hover:rotate-45" />
        </span>
        <span className="font-heading text-sm font-semibold tracking-tight text-foreground">
          {APP_NAME}
        </span>
      </Link>

      <div className="hidden lg:block">
        <HeaderActions />
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={() => setMobileMenuOpen((open) => !open)}
        aria-label="Toggle menu"
        aria-expanded={mobileMenuOpen}
      >
        {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </Button>

      {mobileMenuOpen && (
        <div className="glass-panel absolute inset-x-0 top-full z-20 border-t bg-background p-4 lg:hidden">
          <HeaderActions stacked onNavigate={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </header>
  );
};
