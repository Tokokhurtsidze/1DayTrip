import Image from 'next/image';
import { type ReactNode } from 'react';

import { Header } from '@/shared/components/layout/header';

type AuthPageShellProps = {
  children: ReactNode;
};

const AUTH_IMAGE =
  'https://images.unsplash.com/photo-1603698873304-b052340d9719?auto=format&fit=crop&w=1600&q=80';

export const AuthPageShell = ({ children }: AuthPageShellProps) => {
  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      <Header />

      <main className="relative flex flex-1">
        <div className="relative hidden w-1/2 lg:block">
          <Image src={AUTH_IMAGE} alt="" fill priority className="object-cover" sizes="50vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/10" />
          <div className="absolute inset-x-0 bottom-0 p-12">
            <p className="max-w-md font-heading text-2xl font-semibold leading-snug text-foreground">
              &ldquo;Georgia doesn&apos;t ask for a week. It asks for one unforgettable day.&rdquo;
            </p>
          </div>
        </div>

        <div className="glass-glow -left-32 top-1/3 size-96 lg:hidden" aria-hidden="true" />

        <div className="relative flex flex-1 items-center justify-center px-4 py-16">
          {children}
        </div>
      </main>
    </div>
  );
};
