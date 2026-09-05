/**
 * Hemisphere Aerospace Defense: JSON-LD structured data builders.
 *
 * CLAIM DISCIPLINE
 * Every field emitted here is supported by content already visible on the site
 * or already held in config/site.ts. Nothing is asserted that the company has
 * not published itself. Specifically, this file never emits:
 *   - awards, ratings, reviews, or aggregate ratings
 *   - customers, contracts, or government relationships
 *   - certifications beyond the registrations the site actually publishes
 *   - facilities, production capacity, or deployments
 *   - Product or Offer markup for a program that is in development
 *   - GovernmentService, which would imply authority the site disclaims
 *   - LocalBusiness, which misrepresents the entity type
 *
 * DOMAIN GATE
 * All absolute URLs come from absoluteUrl(), which returns undefined until
 * SITE.productionDomain is populated. Undefined fields are stripped before
 * serialization, so the graph stays valid, just smaller, until the domain is
 * supplied. See PRODUCTION_DOMAIN_REQUIRED in config/site.ts.
 *
 * NOTE ON schema.org
 * "https://schema.org" appears below only as the JSON-LD @context vocabulary
 * identifier. It is never fetched at runtime. It is declared in
 * privacy/inventory.json for this reason.
 */

import { SITE, absoluteUrl } from "../../config/site";

const SCHEMA_CONTEXT = "https://schema.org";

/** Recursively drop undefined values and the empty objects/arrays they leave. */
export const prune = <T>(value: T): T => {
  if (Array.isArray(value)) {
    const arr = value.map(prune).filter((v) => v !== undefined && v !== null);
    return (arr.length ? arr : undefined) as unknown as T;
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      const pv = prune(v);
      if (pv !== undefined && pv !== null && pv !== "") out[k] = pv;
    }
    return (Object.keys(out).length ? out : undefined) as unknown as T;
  }
  return value;
};

/** Stable @id for the Organization node, so other nodes can reference it. */
export const orgId = (): string | undefined => {
  const base = absoluteUrl("/");
  return base ? `${base}#organization` : undefined;
};

/** A reference to the Organization node, or the inline name as a fallback. */
const orgRef = () => {
  const id = orgId();
  return id ? { "@id": id } : { "@type": "Organization", name: SITE.legalNameShort };
};

/**
 * The company. Emitted on every page.
 *
 * "sameAs" lists only properties confirmed to carry this entity's legal name
 * and identifiers. aydll.com is deliberately excluded: as of this build it
 * neither names Hemisphere Aerospace Defense nor references the Paul Revere
 * Program, so asserting sameAs would be unsupported. Add it once the two
 * properties state the relationship reciprocally.
 */
export const organizationSchema = () =>
  prune({
    "@type": "Organization",
    "@id": orgId(),
    name: SITE.legalNameShort,
    legalName: SITE.registration.legalName,
    alternateName: [SITE.name, SITE.shortName],
    url: absoluteUrl("/"),
    logo: absoluteUrl("/images/logo/had-logo-full.png"),
    description:
      "Hemisphere Aerospace Defense develops, manages, operates, and sustains defense programs built around persistent awareness, distributed infrastructure, and autonomous systems support.",
    /*
     * parentOrganization is DELIBERATELY NOT EMITTED, pending management
     * confirmation of the legal corporate relationship.
     *
     * What is published: this site states that Hemisphere Defense and
     * Hemisphere Aerospace Investments share executive leadership, which three
     * approved leadership biographies support. That establishes affiliation
     * and common leadership.
     *
     * What is NOT established: a parent-subsidiary hierarchy. Schema.org
     * parentOrganization asserts exactly that, which is a stronger and more
     * specific claim than the prose. HAI's own website describes no defense
     * arm, no subsidiary, and no group structure, so the relationship is
     * currently asserted in one direction only.
     *
     * Per the pre-deployment directive, an uncertain parent relationship is
     * not encoded in structured data. The visible copy is unchanged. Restore
     * this block, verbatim, once management confirms the legal relationship:
     *
     *   parentOrganization: {
     *     "@type": "Organization",
     *     name: SITE.parent.name,
     *     url: SITE.external.hai,
     *   },
     */
    address: {
      "@type": "PostalAddress",
      streetAddress: "522 Austin Ave",
      addressLocality: "Waco",
      addressRegion: "TX",
      postalCode: "76701",
      addressCountry: "US",
    },
    identifier: [
      { "@type": "PropertyValue", name: "UEI", value: SITE.registration.uei },
      { "@type": "PropertyValue", name: "CAGE", value: SITE.registration.cage },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "business inquiries",
        email: SITE.contact.generalEmail,
        // E.164 rather than the display format: this value is read by machines,
        // and the human-readable form is already on the contact page.
        telephone: SITE.contact.phone,
        areaServed: "US",
        availableLanguage: "en",
      },
    ],
    /*
     * sameAs is DELIBERATELY EMPTY, pending alignment of the capability
     * statement property.
     *
     * The only candidate was hemispheredefensegov.com. Its identity match is
     * not in doubt: it carries the legal name HEMISPHERE AEROSPACE DEFENSE,
     * LLC with UEI JC89VWA2MA45 and CAGE 22TR6, all exactly matching this
     * entity. It is unambiguously the same organization.
     *
     * The problem is what declaring sameAs does. It tells search and AI systems
     * that the page is an authoritative reference for this entity's identity,
     * so they may draw the company's description from it. As of this build that
     * page carries, verbatim:
     *
     *   - "AI Supervisory Command and Control"
     *   - "AI-enabled solutions that enhance operational reach, improve
     *      situational awareness, and support mission success"
     *   - primary NAICS 522220, Sales Financing
     *
     * The first two are AI capability claims that management has explicitly
     * withheld from this site and has not defined. Pointing retrieval systems
     * at that page would reintroduce, through structured data, exactly the
     * terminology the copy deliberately excludes. The NAICS code is an
     * unresolved corporate-data question. That is a material entity conflict,
     * so the assertion is withheld rather than made.
     *
     * Restore once the capability statement is aligned to the canonical
     * description, or once a LinkedIn company page exists:
     *
     *   sameAs: [SITE.external.usfcrProfile],
     *
     * The page is still linked normally from the footer and the certifications
     * page. Only the machine-readable identity assertion is withheld.
     */
  });

/** The site itself. Emitted on every page alongside Organization. */
export const webSiteSchema = () =>
  prune({
    "@type": "WebSite",
    "@id": absoluteUrl("/") ? `${absoluteUrl("/")}#website` : undefined,
    name: SITE.legalNameShort,
    url: absoluteUrl("/"),
    publisher: orgId() ? { "@id": orgId() } : undefined,
  });

/** Breadcrumb trail matching the trail rendered visually on inner pages. */
export const breadcrumbSchema = (
  trail: { name: string; path: string }[]
) => {
  const items = [{ name: "Home", path: "/" }, ...trail];
  return prune({
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  });
};

/**
 * A named leader. Only fields the published biography supports.
 * No honorifics, no awards, no clearances, no service records beyond what the
 * approved bio states in prose.
 */
export const personSchema = (p: {
  name: string;
  title: string;
  slug: string;
  alumniOf?: string[];
}) =>
  prune({
    "@type": "Person",
    name: p.name,
    jobTitle: p.title,
    worksFor: orgRef(),
    url: absoluteUrl(`/leadership/${p.slug}`),
    alumniOf: p.alumniOf?.map((name) => ({
      "@type": "CollegeOrUniversity",
      name,
    })),
  });

/**
 * A program. Modelled as Service, not Product: there is no offer, no price,
 * and the program is in development. Service carries the provider relationship
 * that lets search and AI systems answer "who develops the Paul Revere
 * Program?" without inferring it.
 */
export const programSchema = (p: {
  name: string;
  slug: string;
  serviceType: string;
  description: string;
}) =>
  prune({
    "@type": "Service",
    name: p.name,
    serviceType: p.serviceType,
    provider: orgRef(),
    url: absoluteUrl(`/programs/${p.slug}`),
    areaServed: { "@type": "Country", name: "United States" },
    description: p.description,
  });

/** A page-level node binding the page to the entity it is about. */
export const webPageSchema = (p: {
  path: string;
  name: string;
  description: string;
}) =>
  prune({
    "@type": "WebPage",
    "@id": absoluteUrl(p.path),
    url: absoluteUrl(p.path),
    name: p.name,
    description: p.description,
    isPartOf: absoluteUrl("/") ? { "@id": `${absoluteUrl("/")}#website` } : undefined,
    about: orgId() ? { "@id": orgId() } : undefined,
  });

/** A question-and-answer block that is also rendered visibly on the page. */
export const faqSchema = (qa: { q: string; a: string }[]) =>
  prune({
    "@type": "FAQPage",
    mainEntity: qa.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  });

/** Wrap a set of nodes into one @graph document ready for a script tag. */
export const buildGraph = (nodes: unknown[]): string =>
  JSON.stringify(
    prune({
      "@context": SCHEMA_CONTEXT,
      "@graph": nodes.filter(Boolean),
    }),
    null,
    0
  );
