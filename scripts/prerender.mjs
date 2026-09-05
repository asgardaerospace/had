/**
 * Build-time prerender.
 *
 * Renders every known route to static HTML so a plain HTTP GET returns real,
 * route-specific content: title, description, canonical, Open Graph, JSON-LD,
 * H1, and body copy. Before this, every URL served an empty document and only
 * JavaScript-executing crawlers saw anything.
 *
 * Approach: React's own renderToString plus React Router's StaticRouter, run
 * over a Vite SSR bundle. No headless browser, no new runtime dependency, and
 * the deployed artifact stays a plain static site.
 *
 * Pipeline (see package.json "build"):
 *   1. vite build              -> dist/ client bundle + dist/index.html shell
 *   2. vite build --ssr        -> dist-ssr/entry-server.js
 *   3. node scripts/prerender  -> writes dist/<route>/index.html for each route
 *
 * Run: npm run prerender  (normally invoked by npm run build)
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(fileURLToPath(import.meta.url), "..", "..");
const distDir = join(root, "dist");
const ssrEntry = join(root, "dist-ssr", "entry-server.js");
const shellPath = join(distDir, "index.html");

if (!existsSync(ssrEntry)) {
  console.error(
    `Prerender FAILED: ${ssrEntry} not found.\n` +
      `Run the SSR build first: vite build --ssr src/entry-server.tsx --outDir dist-ssr`
  );
  process.exit(1);
}
if (!existsSync(shellPath)) {
  console.error(`Prerender FAILED: ${shellPath} not found. Run "vite build" first.`);
  process.exit(1);
}

// The route list lives in src/config/seo.ts; entry-server re-exports it so
// there is exactly one source of truth for "which URLs exist".
const { render, ALL_ROUTES: routes } = await import(pathToFileURL(ssrEntry).href);
if (!routes?.length) {
  console.error("Prerender FAILED: entry-server did not export ALL_ROUTES.");
  process.exit(1);
}

const shell = readFileSync(shellPath, "utf8");

/** Where a route's HTML file goes: "/" -> dist/index.html, "/about" -> dist/about/index.html */
const outputPathFor = (route) =>
  route === "/" ? join(distDir, "index.html") : join(distDir, route.slice(1), "index.html");

let written = 0;
const failures = [];

for (const { path: route } of routes) {
  try {
    const { html, head, htmlAttributes } = render(route);

    let page = shell;

    // Replace the empty root div with the rendered markup.
    page = page.replace(
      /<div id="root"><\/div>/,
      `<div id="root">${html}</div>`
    );

    // Inject the route's head tags. The shell's static <title> is dropped so
    // Helmet's per-route title is the only one present.
    page = page.replace(/<title>[\s\S]*?<\/title>\s*/i, "");
    page = page.replace(/<\/head>/i, `    ${head}\n  </head>`);

    if (htmlAttributes) {
      page = page.replace(/<html[^>]*>/i, `<html ${htmlAttributes}>`);
    }

    const out = outputPathFor(route);
    mkdirSync(dirname(out), { recursive: true });
    writeFileSync(out, page, "utf8");
    written += 1;
  } catch (err) {
    failures.push({ route, message: err?.message ?? String(err) });
  }
}

// Vercel serves dist/404.html, with a real 404 status, for any path that has
// no prerendered file. Without this the host would fall back to the homepage
// and every unknown URL would return HTTP 200 with home-page content.
const notFoundSource = join(distDir, "404", "index.html");
if (existsSync(notFoundSource)) {
  writeFileSync(join(distDir, "404.html"), readFileSync(notFoundSource, "utf8"), "utf8");
} else {
  failures.push({ route: "/404", message: "no 404 page was rendered, so the host has no error page to serve" });
}

if (failures.length) {
  console.error(`\nPrerender FAILED for ${failures.length} route(s):`);
  for (const f of failures) console.error(`  - ${f.route}: ${f.message}`);
  process.exit(1);
}

console.log(`Prerender: wrote ${written} static routes to dist/.`);
