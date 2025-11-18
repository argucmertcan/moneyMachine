export interface PostCardProps {
  title: string;
  summary: string;
  href?: string;
  date?: string;
  category?: string;
}

export function PostCard({ title, summary, href = '#', date, category }: PostCardProps) {
  return (
    <article className="space-y-3 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-5 transition hover:border-emerald-400/60">
      <header className="space-y-1">
        {category ? <p className="text-xs uppercase tracking-[0.3em] text-emerald-400">{category}</p> : null}
        <h2 className="text-xl font-semibold text-white">
          <a href={href}>{title}</a>
        </h2>
      </header>
      <p className="text-sm text-neutral-300">{summary}</p>
      {date ? <p className="text-xs text-neutral-500">{date}</p> : null}
    </article>
  );
}
