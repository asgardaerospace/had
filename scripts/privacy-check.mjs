/**
 * Privacy drift guard. Fails the build when the shipped source gains a data
 * flow that privacy/inventory.json does not account for:
 *
 *  1. Any URL whose host is not on an inventory allowlist.
 *  2. Any host on the forbiddenWithoutConsentReview list (trackers, remote
 *     fonts, CDN script hosts, tracking embeds), anywhere in shipped source.
 *  3. Cookie or browser-storage APIs (the site currently uses none, and the
 *     Privacy Policy says so).
 *
 * If this check fails, either remove the addition, or deliberately update
 * privacy/inventory.json AND the Privacy Policy (and add a consent layer if
 * the addition is non-essential tracking). See privacy/PRIVACY-NOTES.md.
 *
 * Run: npm run privacy-check
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, extname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(fileURLToPath(import.meta.url), "..", "..");
const inventory = JSON.parse(readFileSync(join(root, "privacy", "inventory.json"), "utf8"));

const SCAN_EXTS = new Set([".ts", ".tsx", ".js", ".jsx", ".css", ".scss", ".html", ".json"]);
// Built/derived or non-shipped files that may contain stale template content.
const SKIP = [/node_modules/, /\.orig-backup$/, /dist[\\/]/];

const allowedHosts = new Set(
  [...inventory.allowedExternalRequestHosts, ...inventory.allowedOutboundLinkHosts].map((h) => h.toLowerCase())
);
const forbidden = inventory.forbiddenWithoutConsentReview.map((p) => p.toLowerCase());

const STORAGE_PATTERNS = [
  { re: /document\.cookie/, label: "document.cookie (site is declared cookie-free)" },
  { re: /\blocalStorage\b/, label: "localStorage (site is declared storage-free)" },
  { re: /\bsessionStorage\b/, label: "sessionStorage (site is declared storage-free)" },
  { re: /\bindexedDB\b/i, label: "IndexedDB (site is declared storage-free)" },
];

const files = [];
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (SKIP.some((re) => re.test(p))) continue;
    const st = statSync(p);
    if (st.isDirectory()) walk(p);
    else if (SCAN_EXTS.has(extname(name))) files.push(p);
  }
};
walk(join(root, "src"));
files.push(join(root, "index.html"));

const problems = [];
const urlRe = /https?:\/\/([a-z0-9.-]+)(\/[^\s"'`)<>\\]*)?/gi;

for (const file of files) {
  const text = readFileSync(file, "utf8");
  const rel = relative(root, file);
  const isScript = /\.(tsx?|jsx?|html)$/.test(file);

  for (const m of text.matchAll(urlRe)) {
    const host = m[1].toLowerCase();
    const url = `${host}${(m[2] ?? "").toLowerCase()}`;
    const hit = forbidden.find((f) => url.includes(f));
    if (hit) problems.push(`${rel}: forbidden tracking/CDN host "${host}" (matches "${hit}")`);
    else if (!allowedHosts.has(host) && ![...allowedHosts].some((a) => host.endsWith(`.${a}`)))
      problems.push(`${rel}: external host "${host}" is not in privacy/inventory.json allowlists`);
  }

  if (isScript) {
    for (const { re, label } of STORAGE_PATTERNS) {
      if (re.test(text)) problems.push(`${rel}: uses ${label}`);
    }
  }
}

if (problems.length) {
  console.error("Privacy check FAILED. The site's behavior no longer matches privacy/inventory.json:\n");
  for (const p of problems) console.error(`  - ${p}`);
  console.error("\nEither remove the addition, or update privacy/inventory.json, the Privacy Policy, and (for non-essential tracking) implement consent first. See privacy/PRIVACY-NOTES.md.");
  process.exit(1);
}
console.log(`Privacy check passed: ${files.length} files scanned, no undeclared external hosts, trackers, cookies, or browser storage.`);
