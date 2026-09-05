import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import App from "./App";
import ScrollToTop from "./components/others/ScrollToTop";

/**
 * Re-exported so the prerender script has one source of truth for which URLs
 * exist. Adding a page to config/seo.ts is all it takes for that page to be
 * prerendered and to appear in sitemap.xml.
 */
export { ALL_ROUTES, INDEXABLE_ROUTES } from "./config/seo";

/**
 * Prerender entry point.
 *
 * The site is a client-rendered SPA, which meant every URL served an empty
 * document: `<body><div id="root"></div></body>`. Google renders that
 * eventually, but Bing and the AI retrieval crawlers (GPTBot, OAI-SearchBot,
 * PerplexityBot, ClaudeBot) largely read raw HTML and saw nothing at all.
 *
 * Rather than migrate frameworks, we render each of the site's known routes to
 * static HTML at build time using React's own server renderer and React
 * Router's StaticRouter. No new runtime dependency, no server to operate, and
 * the deployed output stays a static site. The client then hydrates the same
 * markup.
 *
 * scripts/prerender.mjs drives this for every route in config/seo.ts.
 */
export type RenderResult = {
  /** Serialized markup for #root. */
  html: string;
  /** Head tags collected by react-helmet-async during the render. */
  head: string;
  /** The lang attribute Helmet resolved for <html>. */
  htmlAttributes: string;
};

export function render(url: string): RenderResult {
  const helmetContext: { helmet?: HelmetServerState } = {};

  const html = renderToString(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <ScrollToTop />
          <App />
        </StaticRouter>
      </HelmetProvider>
    </StrictMode>
  );

  const h = helmetContext.helmet;
  // <Seo> sets prioritizeSeoTags, which moves the title, meta description,
  // canonical link, and the og:* tags into a separate `priority` bucket so they
  // can be emitted first. That bucket is NOT part of h.title / h.meta / h.link,
  // so it has to be serialized explicitly. Omitting it silently drops the page
  // description and every Open Graph tag from the prerendered HTML.
  const head = h
    ? [
        h.priority.toString(),
        h.title.toString(),
        h.meta.toString(),
        h.link.toString(),
        h.script.toString(),
      ]
        .filter(Boolean)
        .join("\n    ")
    : "";

  return {
    html,
    head,
    htmlAttributes: h ? h.htmlAttributes.toString() : 'lang="en"',
  };
}
