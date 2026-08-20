'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/shared/lib/utils';

type PitchSlideNavProps = {
  sectionIds: string[];
};

export function PitchSlideNav({ sectionIds }: PitchSlideNavProps) {
  const [activeId, setActiveId] = useState(sectionIds[0]);

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { root: elements[0]?.parentElement, threshold: 0.5 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sectionIds]);

  return (
    <nav
      aria-label="Slide navigation"
      className="fixed right-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-3 sm:flex"
    >
      {sectionIds.map((id) => (
        <button
          key={id}
          type="button"
          aria-label={`Go to ${id} slide`}
          aria-current={activeId === id}
          onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          className={cn(
            'size-2.5 rounded-full border border-white/30 transition-all',
            activeId === id ? 'scale-125 bg-primary' : 'bg-white/10 hover:bg-white/30'
          )}
        />
      ))}
    </nav>
  );
}
