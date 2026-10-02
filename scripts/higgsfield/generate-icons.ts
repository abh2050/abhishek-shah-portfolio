// Generates project thumbnail icons with Recraft V4.1 via Higgsfield. Billable: one image per slug.
// Usage: npm run icons:generate -- <slug> [<slug> ...] [--force]
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { config as loadEnv } from "dotenv";
import {
  AuthenticationError,
  config,
  higgsfield,
  NotEnoughCreditsError,
  TimeoutError,
} from "@higgsfield/client/v2";

loadEnv({ path: ".env.local", quiet: true });

const MODEL = "recraft/v4.1/text-to-image";
const OUT_DIR = "assets/generated/icons"; // raw sources; run `npm run icons:prepare` to publish
const MANIFEST = "docs/portfolio/generated-icons.json";

// One shared style and palette so the set reads as a family.
const STYLE =
  "Single centered isometric 3D object, brushed aluminum and frosted glass materials with small muted accents, " +
  "soft diffused studio lighting, subtle contact shadow, restrained low-saturation colors, sophisticated editorial " +
  "product illustration, the object fills about 60 percent of the square frame with even margins on all sides, no text, no letters, no logos, " +
  "solid warm off-white seamless background filling the whole frame.";
const PALETTE = [
  { rgb: [15, 27, 42] }, // ink
  { rgb: [31, 94, 96] }, // deep teal
  { rgb: [176, 112, 78] }, // muted copper
  { rgb: [214, 222, 226] }, // mist
];
const BACKGROUND = { rgb: [244, 241, 234] }; // warm paper

const SUBJECTS: Record<string, string> = {
  "enterprise-rag-aws": "a neat stack of documents with a small padlock and a search magnifier resting on top",
  "yieldloop-wafer-triage-with-HIL": "a thin round silicon wafer disc etched with a fine grid of tiny square dies, three dies tinted copper",
  "edge-ai-inspection-gates": "a compact edge computing chip with a small camera lens on top, beside a short conveyor belt",
  "sentinel-ai": "a shield with a pulse line across it, connected to small server blocks",
  "fault-triage-ai": "an industrial process tower with pipes and a small gauge, one valve highlighted",
  "mlx-sft-pubmedqa": "a laptop-sized aluminum slab with a glowing neural network node cluster above it and a small medical cross",
  linegate: "a short factory conveyor passing through an inspection gate with a tilted barrier arm, small boxes on the belt",
  "agent-org-chart": "a four-tier hierarchy of small rounded pods connected by thin rods, the top pod tinted copper",
  langgraph_data_analytics_agents: "three ascending frosted glass bars with a small node graph linking their tops",
  reinforcement_learning_based_pump_control_with_edge_deployment:
    "an industrial centrifugal pump with a curved pipe and a small control dial module attached",
  "jev-test-confidence-gate": "a round analog confidence gauge with a needle near the top, mounted on a small pedestal beside a hinged gate arm",
  docu_scribe_ai: "a clipboard holding a structured medical chart beside a small studio microphone",
  Rag_with_knowledge_graph_neo4j: "a cluster of spheres joined by thin rods forming a graph, resting on an open book",
  colpali_rag: "a fanned stack of page sheets with image panels on them and a small magnifier",
  financial_doc_analyser: "a folded financial report showing a line chart, beside a short stack of coins",
  "agentic-memory-patterns": "stacked memory module cards standing in a slotted rack, one card tinted copper",
  "machine-failure-api-aws-ECR": "interlocking gears with a small warning triangle, beside a compact shipping container",
  "llama-2_fine_tune_AWS_deploy": "three slim stacked server blades with a translucent layered neural network panel floating above them and a small wrench resting on top",
};

const args = process.argv.slice(2);
const force = args.includes("--force");
const slugs = args.filter((a) => !a.startsWith("--"));

if (slugs.length === 0) {
  console.error(`Name at least one slug. Known: ${Object.keys(SUBJECTS).join(", ")}`);
  process.exit(1);
}
const unknown = slugs.filter((s) => !SUBJECTS[s]);
if (unknown.length) {
  console.error(`Unknown slug(s): ${unknown.join(", ")}`);
  process.exit(1);
}
if (!process.env.HF_CREDENTIALS) {
  console.error("HF_CREDENTIALS is not set. Add it to .env.local as key-id:key-secret.");
  process.exit(1);
}

config({ credentials: process.env.HF_CREDENTIALS });
mkdirSync(OUT_DIR, { recursive: true });

type Entry = { slug: string; file: string; model: string; prompt: string; requestId: string; generatedAt: string };
const manifest: Entry[] = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, "utf8")) : [];

let failures = 0;
for (const slug of slugs) {
  const file = `${OUT_DIR}/${slug}.png`;
  if (existsSync(file) && !force) {
    console.log(`skip ${slug}: ${file} exists (use --force to regenerate)`);
    continue;
  }
  const prompt = `${SUBJECTS[slug]}. ${STYLE}`;
  try {
    const result = await higgsfield.subscribe(MODEL, {
      input: {
        prompt,
        resolution: "1k",
        aspect_ratio: "1:1",
        output_format: "png",
        colors: PALETTE,
        background_color: BACKGROUND,
      },
      withPolling: true,
    });
    const url = result.images?.[0]?.url;
    if (result.status !== "completed" || !url) {
      console.error(`fail ${slug}: request ${result.request_id} ended with status "${result.status}"`);
      failures++;
      continue;
    }
    const response = await fetch(url);
    if (!response.ok) throw new Error(`download failed with HTTP ${response.status}`);
    writeFileSync(file, Buffer.from(await response.arrayBuffer()));
    const entry = { slug, file, model: MODEL, prompt, requestId: result.request_id, generatedAt: new Date().toISOString() };
    const i = manifest.findIndex((e) => e.slug === slug);
    if (i >= 0) manifest[i] = entry;
    else manifest.push(entry);
    writeFileSync(MANIFEST, `${JSON.stringify(manifest, null, 2)}\n`);
    console.log(`ok   ${slug}: ${file}`);
  } catch (error) {
    const reason =
      error instanceof AuthenticationError
        ? "credentials were rejected"
        : error instanceof NotEnoughCreditsError
          ? "not enough credits"
          : error instanceof TimeoutError
            ? "polling timed out"
            : error instanceof Error
              ? error.message
              : String(error);
    console.error(`fail ${slug}: ${reason}`);
    failures++;
    if (error instanceof AuthenticationError || error instanceof NotEnoughCreditsError) break;
  }
}
process.exit(failures ? 1 : 0);
