interface CategoryPageProps {
  params: { slug: string };
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <main className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="text-3xl font-semibold text-white">Category: {params.slug}</h1>
      <p className="mt-4 text-neutral-300">
        Category filtering and pagination will arrive together with the actual data layer in future steps.
      </p>
    </main>
  );
}
