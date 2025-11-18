import type { ReactNode } from 'react';

interface SectionLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function SectionLayout({ title, description, children }: SectionLayoutProps) {
  return (
    <section className="space-y-4 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6">
      <header>
        <p className="text-sm font-semibold uppercase tracking-[0.4em] text-emerald-400">{title}</p>
        {description ? (
          <p className="mt-2 text-sm text-neutral-400">{description}</p>
        ) : null}
      </header>
      <div>{children}</div>
    </section>
  );
}
