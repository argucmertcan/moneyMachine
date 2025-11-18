import 'dotenv/config';
import { connectToDatabase } from '../lib/db/mongoose';
import { CategoryModel } from '../lib/models/category';
import { PostModel } from '../lib/models/post';

async function seed() {
  await connectToDatabase();

  const categories = [
    {
      slug: 'ancient-civilizations',
      name: 'Ancient Civilizations',
      description: 'Insights into Mesopotamia, Egypt, the Mayans, and more.'
    },
    {
      slug: 'cosmic-frontiers',
      name: 'Cosmic Frontiers',
      description: 'Space exploration, astronomy breakthroughs, and cosmic mysteries.'
    },
    {
      slug: 'enigmas-and-theories',
      name: 'Enigmas & Theories',
      description: 'Conspiracy theories, unexplained events, and fringe science.'
    }
  ];

  await CategoryModel.deleteMany({ slug: { $in: categories.map((category) => category.slug) } });
  const insertedCategories = await CategoryModel.insertMany(categories);

  const primaryCategory = insertedCategories[0];

  const samplePost = {
    slug: 'demo-post-from-seed-script',
    title: 'Demo Post From Seed Script',
    summary: 'A placeholder article seeded for local development.',
    content: '# Demo Post\n\nReplace this content with AI generated prose.',
    seoTitle: 'Demo Post From Seed Script',
    seoDescription: 'Seeded article to verify MongoDB schemas and rendering.',
    status: 'published',
    language: 'en',
    categoryId: primaryCategory._id,
    images: [],
    publishedAt: new Date()
  } as const;

  await PostModel.findOneAndUpdate({ slug: samplePost.slug }, samplePost, {
    new: true,
    upsert: true
  });

  console.log('Seed completed. Categories and a sample post are ready.');
}

seed()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
