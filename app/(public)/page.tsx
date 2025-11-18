import { connectToDatabase } from '@/lib/db/mongoose';

export default async function HomePage() {
  await connectToDatabase();

  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-16">
      <section className="space-y-2">
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">Step 2</p>
        <h1 className="text-3xl font-semibold text-white">moneyMachine Publishing Engine</h1>
        <p className="text-base text-neutral-300">
          Database connectivity is initialized directly from this server component, allowing any
          route or layout to safely query MongoDB before rendering UI. Additional data fetching and
          AI generation logic will build on top of these schemas in the upcoming steps.
        </p>
      </section>
    </main>
  );
}
