export interface GeneratedPost {
  title: string;
  seoTitle: string;
  seoDescription: string;
  content: string;
  summary: string;
}

export interface AiClient {
  generateTopics: (n: number) => Promise<string[]>;
  generatePostFromTopic: (topic: string) => Promise<GeneratedPost>;
  generateImagePrompts: (postContent: string) => Promise<string[]>;
}

export const aiClient: AiClient = {
  async generateTopics(n: number) {
    return Array.from({ length: n }, (_, index) => `Placeholder topic #${index + 1}`);
  },
  async generatePostFromTopic(topic: string) {
    return {
      title: `Draft for ${topic}`,
      seoTitle: `SEO ${topic}`,
      seoDescription: `SEO description for ${topic}`,
      content: `# ${topic}\n\nFull content will be generated in later steps.`,
      summary: 'Summary placeholder'
    };
  },
  async generateImagePrompts(postContent: string) {
    return [`Prompt derived from: ${postContent.slice(0, 30)}...`];
  }
};
