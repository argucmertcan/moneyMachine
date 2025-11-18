# moneyMachine

Fully automated content website scaffold following the provided multi-step plan.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run seed
```

## Database & Models

MongoDB is accessed through Mongoose models located in `lib/models`:

- `Category` — slugged taxonomy with timestamps.
- `Post` — multilingual article content referencing categories and generated images.
- `Image` — generated assets + prompts with `createdAt` tracking.
- `GenerationJob` — cron queue for automated content runs.

## Connecting to MongoDB in server components

Server components can safely connect to the database by awaiting `connectToDatabase()` from
`@/lib/db/mongoose`. The home page (`app/(public)/page.tsx`) demonstrates this pattern so any
route, layout, or server action can hydrate data before rendering UI.

## Local data seeding

Populate reference categories and a demo article with:

```bash
npm run seed
```

The script loads environment variables, connects to MongoDB, and upserts sample documents.

## AI layer (Step 3)

- The abstraction lives in `lib/ai/aiClient.ts` and exposes `generateTopics`, `generatePostFromTopic`,
  and `generateImagePrompts`.
- Each method includes the exact natural-language prompt we plan to use with real providers. Swap the
  underlying functions (or set `AI_PROVIDER`) when wiring up OpenAI, Groq, etc.
- The default "mock" provider synthesizes deterministic data for local development so the rest of the
  stack can be exercised without external API calls.

## Environment

Copy `.env.example` to `.env.local` and update values before running the app.
