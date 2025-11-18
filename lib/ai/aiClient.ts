const DEFAULT_TOPIC_BANK = [
  'enigmatic rituals of Göbekli Tepe',
  'lost inventions of Alexandria',
  'mysteries surrounding the Antikythera mechanism',
  'hidden symbolism of the Nazca Lines',
  'enigmas inside the Yonaguni Monument',
  'forgotten astronomers of the Islamic Golden Age',
  'cold war conspiracies in space race milestones',
  'dark energy anomalies spotted by deep-space probes',
  'linguistic secrets of the Voynich manuscript',
  'Mayan observations of cosmic cycles'
];

const IMAGE_STYLES = ['cinematic concept art', 'vintage lithograph', 'infrared space photography'];

function titleCase(input: string) {
  return input.replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.slice(1));
}

function buildSummary(topic: string) {
  return `An AI-generated deep dive into ${topic}, weaving together history, science, and mythology for curious readers.`;
}

function paragraph(topic: string, angle: string) {
  return `The narrative around ${topic} ${angle} This perspective helps contextualize how scholars, enthusiasts, and skeptics continue to reinterpret the evidence.`;
}

function composeArticle(topic: string) {
  const intro = `Human fascination with ${topic} has endured because it bridges mythology, archaeology, and modern analytics.`;
  const sections = [
    { heading: 'Origins and Clues', body: paragraph(topic, 'examines primary artifacts, inscriptions, and astronomical alignments discovered in recent expeditions.') },
    { heading: 'Scientific Debate', body: paragraph(topic, 'highlights current research, contrasting mainstream explanations with fringe hypotheses about advanced knowledge or off-world contact.') },
    { heading: 'Cultural Echoes', body: paragraph(topic, 'explores how folklore, contemporary media, and online communities keep the mystery vibrant and globally relevant.') }
  ];

  const markdownSections = sections
    .map((section) => [`## ${section.heading}`, section.body])
    .flat();

  return [`# ${titleCase(topic)}`, intro, ...markdownSections].join('\n\n');
}

function selectTopics(n: number) {
  const topics: string[] = [];
  for (let i = 0; i < n; i += 1) {
    const base = DEFAULT_TOPIC_BANK[(i + Date.now()) % DEFAULT_TOPIC_BANK.length];
    topics.push(titleCase(base));
  }
  return topics;
}

function buildImagePrompt(topic: string, style: string, angle: string) {
  return `${style} illustration of ${topic.toLowerCase()} ${angle}`;
}

function extractTopicFromContent(content: string) {
  const heading = content.split('\n').find((line) => line.startsWith('# '));
  return heading ? heading.replace('# ', '') : 'mystery concept';
}

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

/**
 * Prompt for topic discovery (reference for real providers):
 * "You are an editorial strategist. Suggest {n} unique article topics about history, ancient civilizations,
 * space, science, or conspiracy theories. Return ONLY a JSON array of concise topic titles."
 */
async function mockGenerateTopics(n: number) {
  return selectTopics(n);
}

/**
 * Prompt for long-form article generation (reference for real providers):
 * "You are an investigative science writer. Based on the topic provided, craft a markdown article with title,
 * summary, SEO title, SEO description, and three sections (Origins, Scientific Debate, Cultural Impact).
 * Return a JSON object with keys: title, seoTitle, seoDescription, summary, content."
 */
async function mockGeneratePostFromTopic(topic: string): Promise<GeneratedPost> {
  const cleanTopic = topic.trim();
  const title = titleCase(cleanTopic.startsWith('The') ? cleanTopic : `The ${cleanTopic}`);
  const summary = buildSummary(cleanTopic);
  const content = composeArticle(cleanTopic);
  return {
    title,
    seoTitle: `${title} | moneyMachine`,
    seoDescription: summary,
    summary,
    content
  };
}

/**
 * Prompt for image prompts (reference for real providers):
 * "You are an AI art director. Read the following article and produce up to three descriptive image prompts
 * capturing its tone and visuals. Reply as a JSON array of short prompt strings."
 */
async function mockGenerateImagePrompts(postContent: string) {
  const topic = extractTopicFromContent(postContent);
  return IMAGE_STYLES.map((style, index) =>
    buildImagePrompt(topic, style, ['emerging from starlit fog', 'during an eclipse over monolithic ruins', 'captured with speculative alien technology'][index] ?? 'in dramatic lighting')
  );
}

const mockProvider: AiClient = {
  generateTopics: mockGenerateTopics,
  generatePostFromTopic: mockGeneratePostFromTopic,
  generateImagePrompts: mockGenerateImagePrompts
};

const providers: Record<string, AiClient> = {
  mock: mockProvider
};

const providerName = process.env.AI_PROVIDER ?? 'mock';

export const aiClient: AiClient = providers[providerName] ?? mockProvider;
