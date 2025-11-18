export default function HomePage() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-16">
      <section className="space-y-2">
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">Step 1</p>
        <h1 className="text-3xl font-semibold text-white">moneyMachine Publishing Engine</h1>
        <p className="text-base text-neutral-300">
          Initial project scaffold is ready. Subsequent steps will add automated content generation,
          advanced routing, and database connectivity.
        </p>
      </section>
    </main>
  );
}
