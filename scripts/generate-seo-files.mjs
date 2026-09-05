/**
 * Generates dist/robots.txt and dist/sitemap.xml from the route table.
 *
 * PRODUCTION DOMAIN GATE
 * A sitemap requires absolute URLs, and a wrong absolute URL is worse than no
 * sitemap: it tells search engines to crawl an origin that is not ours. So:
 *
 *   SITE.productionDomain set    -> full robots.txt + complete sitemap.xml
 *   SITE.productionDomain empty  -> robots.txt with no Sitemap line, no
 *                                   sitemap.xml, and a loud build warning
 *
 * Populate productionDomain in src/config/site.ts and re-run the build. No
 * other file needs to change.
 *
 * Run: npm run seo-files  (normally invoked by npm run build)
 */
import { writeFileSync, existsSync, unlinkSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(fileURLToPath(import.meta.url), "..", "..");
const distDir = join(root, "dist");
const ssrEntry = join(root, "dist-ssr", "entry-server.js");

if (!existsSync(ssrEntry)) {
  console.error("SEO files FAILED: run the SSR build before this script.");
  process.exit(1);
}

const { INDEXABLE_ROUTES } = await import(pathToFileURL(ssrEntry).href);

/** Read productionDomain straight from the config source, so there is one gate. */
const siteSrc = readFileSync(join(root, "src", "config", "site.ts"), "utf8");
const domainMatch = siteSrc.match(/productionDomain:\s*"([^"]*)"/);
const domain = (domainMatch?.[1] ?? "").trim().replace(/\/+$/, "");
const hasDomain = domain.length > 0;

/* ----------------------------- robots.txt ----------------------------- */

const robots = hasDomain
  ? `# Hemisphere Aerospace Defense
User-agent: *
Allow: /
Disallow: /404

Sitemap: ${domain}/sitemap.xml
`
  : `# Hemisphere Aerospace Defense
# NOTE: no Sitemap directive yet. The production domain has not been set.
# See PRODUCTION_DOMAIN_REQUIRED in src/config/site.ts.
User-agent: *
Allow: /
Disallow: /404
`;

writeFileSync(join(distDir, "robots.txt"), robots, "utf8");

/* ----------------------------- sitemap.xml ---------------------------- */

const sitemapPath = join(distDir, "sitemap.xml");

if (!hasDomain) {
  // Never emit a sitemap with a guessed origin. Remove any stale one.
  if (existsSync(sitemapPath)) unlinkSync(sitemapPath);
  console.warn(
    "\n  PRODUCTION_DOMAIN_REQUIRED\n" +
      "  robots.txt written without a Sitemap directive, and sitemap.xml was not generated,\n" +
      "  because src/config/site.ts productionDomain is empty. Canonical tags, og:url, and\n" +
      "  JSON-LD URLs are omitted for the same reason. Set that one field and rebuild.\n"
  );
} else {
  const today = new Date().toISOString().slice(0, 10);
  const urls = INDEXABLE_ROUTES.map((r) => {
    const loc = `${domain}${r.path === "/" ? "/" : r.path}`;
    const priority = (r.priority ?? 0.5).toFixed(1);
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
  });

  // The capability statement is a linkable, indexable procurement asset.
  urls.push(
    `  <url>\n    <loc>${domain}/documents/HAD-AYDLL-Capability-Statement.pdf</loc>\n    <lastmod>${today}</lastmod>\n    <priority>0.6</priority>\n  </url>`
  );

  writeFileSync(
    sitemapPath,
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`,
    "utf8"
  );
  console.log(`SEO files: robots.txt and sitemap.xml written (${urls.length} URLs, ${domain}).`);
}

if (!hasDomain) console.log("SEO files: robots.txt written (sitemap deferred).");
