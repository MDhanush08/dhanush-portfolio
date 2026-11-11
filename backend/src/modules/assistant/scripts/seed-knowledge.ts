import * as fs from 'fs';
import * as path from 'path';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { SECTION_LINKS } from '../assistant.constants';

// Load .env from backend root
const envPath = path.resolve(process.cwd(), '.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  dotenv.config();
}

interface KnowledgeItem {
  section: string;
  content: string;
}

interface GeminiEmbeddingResponse {
  embedding?: {
    values?: number[];
  };
  error?: {
    code?: number;
    message?: string;
    status?: string;
  };
}

async function seedKnowledge() {
  console.log('====================================================');
  console.log(' Portfolio Knowledge Vector Seeding (pgvector)     ');
  console.log('====================================================');

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SECRET_KEY;
  const geminiApiKey = process.env.GEMINI_API_KEY;
  const embedModel = process.env.GEMINI_EMBED_MODEL || 'gemini-embedding-001';

  if (!supabaseUrl || !supabaseKey) {
    console.error(
      'ERROR: SUPABASE_URL and SUPABASE_SECRET_KEY must be set in .env',
    );
    process.exit(1);
  }

  if (!geminiApiKey) {
    console.error(
      'ERROR: GEMINI_API_KEY must be set in .env to generate embeddings',
    );
    process.exit(1);
  }

  // Normalize Supabase URL
  const cleanUrl = supabaseUrl
    .trim()
    .replace(/\/rest\/v1\/?$/, '')
    .replace(/\/+$/, '');

  const supabase = createClient(cleanUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // Load knowledge JSON
  const jsonPath = path.resolve(__dirname, '../data/dhanush-knowledge.json');
  if (!fs.existsSync(jsonPath)) {
    console.error(`ERROR: Knowledge file not found at ${jsonPath}`);
    process.exit(1);
  }

  const rawData = fs.readFileSync(jsonPath, 'utf8');
  const items: KnowledgeItem[] = JSON.parse(rawData);

  console.log(
    `Loaded ${items.length} knowledge items from ${path.basename(jsonPath)}`,
  );
  console.log(`Embedding model: ${embedModel} (768 dimensions)`);

  // Idempotency: Clear existing records first
  console.log('Deleting existing rows in portfolio_knowledge table...');
  const { error: deleteError } = await supabase
    .from('portfolio_knowledge')
    .delete()
    .neq('id', 0);

  if (deleteError) {
    console.warn(
      `Notice: Could not clear existing rows (${deleteError.message}). Table might be empty or newly created.`,
    );
  } else {
    console.log('Existing rows cleared successfully.');
  }

  let successCount = 0;
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${embedModel}:embedContent?key=${encodeURIComponent(geminiApiKey)}`;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const progress = `[${i + 1}/${items.length}]`;
    const targetLink = SECTION_LINKS[item.section.toLowerCase()]?.url || null;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: `models/${embedModel}`,
          content: {
            parts: [{ text: item.content }],
          },
          taskType: 'RETRIEVAL_DOCUMENT',
          outputDimensionality: 768,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `${progress} Embedding failed for item (${response.status}): ${errorText}`,
        );
        continue;
      }

      const resJson = (await response.json()) as GeminiEmbeddingResponse;
      const embedding = resJson?.embedding?.values;

      if (!embedding || embedding.length === 0) {
        console.error(
          `${progress} No embedding vector returned for: ${item.content.slice(0, 50)}`,
        );
        continue;
      }

      // Insert record with vector embedding
      const { error: insertError } = await supabase
        .from('portfolio_knowledge')
        .insert({
          section: item.section,
          content: item.content,
          link: targetLink,
          embedding,
        });

      if (insertError) {
        console.error(
          `${progress} Database insert error: ${insertError.message}`,
        );
      } else {
        console.log(
          `${progress} Embedded & saved (${item.section}): "${item.content.slice(0, 50)}..."`,
        );
        successCount++;
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`${progress} Error: ${msg}`);
    }

    // Rate-limit backoff: 200ms delay between calls
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  console.log('====================================================');
  console.log(
    `Seeding complete: ${successCount} of ${items.length} facts indexed in Supabase.`,
  );
  console.log('====================================================');
}

seedKnowledge().catch((err) => {
  console.error('Fatal seeding error:', err);
  process.exit(1);
});
