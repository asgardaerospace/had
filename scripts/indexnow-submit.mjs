/**
 * IndexNow submission.
 *
 * Tells Bing (and the other IndexNow participants, including Yandex and
 * Seznam) that these URLs exist. Google does not participate in IndexNow, so
 * Google discovery still depends on Search Console plus inbound links.
 *
 * Why this exists: the site was deployed with correct robots.txt and sitemap
 * and still was not indexed, because nothing had ever pointed a crawler at it.
 * IndexNow is the one discovery channel that needs no account and no
 * dashboard, so it can be fired from the repo.
 *
 * How it works: a key file is published at the site root, and a JSON POST
 * names that key plus the URL list. The receiving engine fetches the key file
 * to confirm whoever submitted controls the domain.
 *
 * PRIVACY NOTE
 * This is a build and operations tool. It runs from a developer machine or CI,
 * never in a visitor's browser. No visitor data is involved and no script is
 * added to any page. The only artifact a visitor could see is the public key
 * file, which contains nothing but the key itself. scripts/privacy-check.mjs
 * scans src/ and index.html, so nothing here affects the privacy guard.
 *
 * Run: npm run indexnow
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(fileURLToPath(import.meta.url), "..", "..");
const ENDPOINT = "https://api.indexnow.org/indexnow";

/* The key is whatever 32-hex-character .txt file sits in public/. */
const keyFile = readdirSync(join(root, "public")).find((f) => /^[0-9a-f]{32}\.txt$/.test(f));
if (!keyFile) {
  console.error(
    "IndexNow FAILED: no key file found in public/.\n" +
      "Create one: a file named <32-hex-chars>.txt whose contents are that same string."
  );
  process.exit(1);
}
const key = keyFile.replace(/\.txt$/, "");
const fileKey = readFileSync(join(root, "public", keyFile), "utf8").trim();
if (fileKey !== key) {
  console.error(`IndexNow FAILED: ${keyFile} must contain exactly "${key}", found "${fileKey}".`);
  process.exit(1);
}

/* Production domain and route list come from the same single sources the rest
   of the build uses, so this can never submit a stale or guessed origin. */
const siteSrc = readFileSync(join(root, "src", "config", "site.ts"), "utf8");
const domain = (siteSrc.match(/productionDomain:\s*"([^"]*)"/)?.[1] ?? "").trim().replace(/\/+$/, "");
if (!domain) {
  console.error("IndexNow FAILED: SITE.productionDomain is empty. Nothing to submit.");
  process.exit(1);
}
const host = new URL(domain).host;

const ssrEntry = join(root, "dist-ssr", "entry-server.js");
if (!existsSync(ssrEntry)) {
  console.error("IndexNow FAILED: run `npm run build` first so the route list is available.");
  process.exit(1);
}
const { INDEXABLE_ROUTES } = await import(pathToFileURL(ssrEntry).href);

const urlList = INDEXABLE_ROUTES.map((r) => `${domain}${r.path === "/" ? "/" : r.path}`);

const payload = {
  host,
  key,
  keyLocation: `${domain}/${keyFile}`,
  urlList,
};

console.log(`IndexNow: submitting ${urlList.length} URLs for ${host}`);
for (const u of urlList) console.log(`  ${u}`);

const res = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(payload),
});

const body = await res.text();

/* 200 accepted, 202 accepted but key still being validated. Both are success. */
if (res.status === 200 || res.status === 202) {
  console.log(`\nIndexNow: accepted (HTTP ${res.status}).`);
  console.log("Bing and the other participating engines will crawl from here.");
  console.log("Google does not participate; use Search Console for Google.");
} else {
  console.error(`\nIndexNow FAILED: HTTP ${res.status}\n${body.slice(0, 500)}`);
  process.exit(1);
}
