/**
 * Rendering release gate.
 *
 * Asserts that the built output actually contains route-specific content in
 * raw HTML, with no client-side JavaScript involved. This is the check that
 * catches a regression back to the empty-shell SPA, which is the single
 * largest search problem this site had.
 *
 * For every route it verifies:
 *   - a <title> that is unique to that route
 *   - a non-empty meta description that is unique to that route
 *   - an <h1> with real text
 *   - body copy inside #root (not just the header and footer chrome)
 *   - a JSON-LD block containing the Organization node
 *   - a canonical link, once the production domain is set
 *
 * Run: npm run verify-rendering  (after npm run build)
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(fileURLToPath(import.meta.url), "..", "..");
const distDir = join(root, "dist");
const ssrEntry = join(root, "dist-ssr", "entry-server.js");

const { ALL_ROUTES } = await import(pathToFileURL(ssrEntry).href);

const siteSrc = readFileSync(join(root, "src", "config", "site.ts"), "utf8");
const hasDomain = (siteSrc.match(/productionDomain:\s*"([^"]*)"/)?.[1] ?? "").trim().length > 0;

const fileFor = (route) =>
  route === "/" ? join(distDir, "index.html") : join(distDir, route.slice(1), "index.html");

const text = (s) => s.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

const problems = [];
const titles = new Map();
const descriptions = new Map();
const report = [];

for (const { path: route, noindex } of ALL_ROUTES) {
  const file = fileFor(route);
  if (!existsSync(file)) {
    problems.push(`${route}: no prerendered file at ${file}`);
    continue;
  }
  const html = readFileSync(file, "utf8");

  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "";
  const desc =
    html.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/i)?.[1]?.trim() ?? "";
  const h1 = text(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? "");
  const rootHtml = html.match(/<div id="root">([\s\S]*?)<\/body>/i)?.[1] ?? "";
  const bodyWords = text(rootHtml).split(" ").filter(Boolean).length;
  const hasOrgSchema = /"@type"\s*:\s*"Organization"/.test(html);
  const canonical = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]*)"/i)?.[1] ?? "";

  if (!title) problems.push(`${route}: no <title>`);
  if (!desc) problems.push(`${route}: no meta description`);
  if (!h1) problems.push(`${route}: no <h1> text`);
  if (bodyWords < 120) problems.push(`${route}: only ${bodyWords} words inside #root`);
  if (!hasOrgSchema) problems.push(`${route}: no Organization JSON-LD`);
  if (hasDomain && !canonical && !noindex) problems.push(`${route}: no canonical link`);

  if (title) {
    if (titles.has(title)) problems.push(`${route}: duplicate <title> shared with ${titles.get(title)}`);
    else titles.set(title, route);
  }
  if (desc) {
    if (descriptions.has(desc))
      problems.push(`${route}: duplicate description shared with ${descriptions.get(desc)}`);
    else descriptions.set(desc, route);
  }

  report.push({ route, words: bodyWords, h1: h1.slice(0, 48), title: title.slice(0, 58) });
}

const pad = (s, n) => String(s).padEnd(n).slice(0, n);
console.log(`\n${pad("ROUTE", 34)}${pad("WORDS", 7)}${pad("H1", 34)}TITLE`);
console.log("-".repeat(130));
for (const r of report) {
  console.log(`${pad(r.route, 34)}${pad(r.words, 7)}${pad(r.h1, 34)}${r.title}`);
}

if (problems.length) {
  console.error(`\nRendering gate FAILED (${problems.length}):`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}

console.log(
  `\nRendering gate PASSED: ${report.length} routes serve unique titles, descriptions, an H1, ` +
    `body content, and Organization JSON-LD in raw HTML.` +
    (hasDomain ? "" : "\nCanonical checks skipped: production domain not set yet.")
);
