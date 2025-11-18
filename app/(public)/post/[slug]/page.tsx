interface PostPageProps {
  params: { slug: string };
}

export default function PostPage({ params }: PostPageProps) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-sm text-neutral-400">Slug preview</p>
      <h1 className="text-2xl font-semibold text-white">{params.slug}</h1>
      <p className="mt-4 text-neutral-300">
        Detailed post rendering and SEO metadata will be implemented in later steps.
      </p>
    </main>
  );
}
