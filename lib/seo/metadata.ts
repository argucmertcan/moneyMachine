import type { Metadata } from 'next';

const baseUrl = process.env.SITE_URL ?? 'https://example.com';

export function buildSiteMetadata(overrides?: Metadata): Metadata {
  const defaultMetadata: Metadata = {
    metadataBase: new URL(baseUrl),
    title: 'moneyMachine Content Engine',
    description: 'AI-native automated content publishing system.',
    openGraph: {
      type: 'website',
      title: 'moneyMachine Content Engine',
      description: 'AI-native automated content publishing system.',
      url: baseUrl
    }
  };

  return {
    ...defaultMetadata,
    ...overrides
  };
}
