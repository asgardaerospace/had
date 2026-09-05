import { Helmet } from "react-helmet-async";
import { absoluteUrl } from "../../config/site";
import { metaForPath, type RouteMeta } from "../../config/seo";
import { buildGraph, organizationSchema, webSiteSchema } from "./schema";

type SeoProps = {
  /** Canonical path for this page, e.g. "/programs/paul-revere-program". */
  path: string;
  /** Override the route map entry. Used by dynamic pages. */
  meta?: Partial<RouteMeta>;
  /** Extra JSON-LD nodes for this page (breadcrumb, person, service, FAQ). */
  schema?: unknown[];
};

/**
 * Per-page search metadata and structured data.
 *
 * Every indexable route renders exactly one <Seo>. It emits the page's own
 * title, description, canonical, Open Graph, and Twitter tags, plus a JSON-LD
 * @graph that always contains the Organization and WebSite nodes and any
 * page-specific nodes passed in.
 *
 * Absolute URLs (canonical, og:url, og:image) are omitted entirely while
 * SITE.productionDomain is unset, rather than being guessed. Titles,
 * descriptions, and the non-URL parts of the schema graph work regardless, so
 * nothing here is blocked on the domain decision.
 */
const Seo = ({ path, meta, schema = [] }: SeoProps) => {
  const base = metaForPath(path);
  const m: RouteMeta = { ...base, ...meta, path };

  const canonical = absoluteUrl(m.path);
  const ogImage = m.image ? absoluteUrl(m.image) : undefined;
  const graph = buildGraph([organizationSchema(), webSiteSchema(), ...schema]);

  return (
    <Helmet prioritizeSeoTags>
      <title>{m.title}</title>
      <meta name="description" content={m.description} />
      {canonical && <link rel="canonical" href={canonical} />}
      {m.noindex && <meta name="robots" content="noindex, follow" />}

      {/* Open Graph */}
      <meta property="og:site_name" content="Hemisphere Aerospace Defense" />
      <meta property="og:type" content={m.ogType ?? "website"} />
      <meta property="og:title" content={m.title} />
      <meta property="og:description" content={m.description} />
      {canonical && <meta property="og:url" content={canonical} />}
      {ogImage && <meta property="og:image" content={ogImage} />}

      {/* Twitter / X */}
      <meta name="twitter:card" content={ogImage ? "summary_large_image" : "summary"} />
      <meta name="twitter:title" content={m.title} />
      <meta name="twitter:description" content={m.description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      <script type="application/ld+json">{graph}</script>
    </Helmet>
  );
};

export default Seo;
