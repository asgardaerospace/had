/**
 * Hemisphere Defense (HAD): central site configuration.
 *
 * Single source of truth for brand strings, external links, and contact
 * information. Values wrapped in [BRACKETS] are placeholders awaiting
 * approved content; swap them here and they update everywhere.
 *
 * CORPORATE BOUNDARY: HAD and HAI are Hemisphere entities. Do not add any
 * relationship, link, or reference to any non-Hemisphere entity here, and do
 * not infer corporate relationships from program materials.
 */

export const SITE = {
  /**
   * PRODUCTION_DOMAIN_REQUIRED
   *
   * The single authoritative origin for this site. Management must supply it.
   * Format: scheme plus host, no trailing slash and no path.
   * Shape: "https:" + "//" + the live hostname.
   *
   * While this is empty the site still builds and prerenders correctly, but it
   * deliberately omits every absolute URL rather than guessing one:
   *   - no <link rel="canonical">
   *   - no og:url / og:image / twitter:image
   *   - no "url" / "@id" / "logo" fields in JSON-LD
   *   - no sitemap.xml, and a conservative robots.txt
   *
   * Populate this ONE field and every one of those is generated automatically.
   * Nothing else in the codebase hard-codes the production origin.
   */
  productionDomain: "https://had.hai-aero.com",

  name: "Hemisphere Defense",
  /** Registered entity name. The canonical, unambiguous string for search. */
  legalNameShort: "Hemisphere Aerospace Defense",
  shortName: "HAD",
  // Restrained hero positioning statement (see alternates in project notes).
  positioning: "American vigilance, modernized.",
  // Primary hero line: the site's operating thesis (Paul Revere metaphor).
  headline: "The warfighter has changed. The mission remains.",
  description:
    "Hemisphere Defense builds mission-oriented programs for the next era of American vigilance: persistent awareness, distributed infrastructure, and operational readiness across land, air, and sea.",

  /**
   * Hemisphere Aerospace Investments (HAI).
   *
   * RELATIONSHIP LANGUAGE IS DELIBERATELY CONSERVATIVE.
   *
   * What is supported by approved material: three leadership biographies
   * describe officers serving across both entities (the CEO "providing
   * executive leadership across HAI and Hemisphere Aerospace Defense", the CFO
   * and the Technical Director serving both). That establishes shared
   * executive leadership and affiliation.
   *
   * What is NOT established: a parent-subsidiary hierarchy. HAI's own website
   * describes a commercial aircraft and engine trading business founded in
   * 2018, with no defense arm, no subsidiary, and no group structure. The
   * earlier wording ("operates within the HAI structure", "a HAI company")
   * asserted ownership that is currently claimed in one direction only.
   *
   * Structured data asserts no parentOrganization for the same reason; see
   * components/seo/schema.ts.
   *
   * Once management confirms the legal hierarchy, update these two strings and
   * restore the parentOrganization block. They are the only place the
   * relationship is worded, so both propagate site-wide.
   */
  parent: {
    name: "Hemisphere Aerospace Investments",
    shortName: "HAI",
    /** Full sentence. Used in the HAI band and long-form copy. */
    relationship:
      "Hemisphere Defense and Hemisphere Aerospace Investments (HAI) share executive leadership.",
    /** Short label. Used in the header bar and the footer copyright line. */
    relationshipShort: "Affiliated with Hemisphere Aerospace Investments (HAI)",
  },

  /**
   * Flagship program. "Paul Revere Program" is the public-facing program name;
   * it is built around the AYDLL platform. CANONICAL description (verbatim) is
   * reused wherever the program is summarized. Never describe the platform as a
   * ship, warship, drone mothership, weapons platform, or combatant.
   */
  flagship: {
    program: "Paul Revere Program",
    platform: "AYDLL",
    subtitle: "Persistent maritime awareness infrastructure for the modern watch.",
    canonical:
      "Persistent maritime awareness infrastructure designed to support maritime domain awareness, autonomous systems operations, modular mission capabilities, and government reach-back command.",
  },

  /** External destinations. Program websites live off the HAD corporate site. */
  external: {
    // Dedicated AYDLL platform / Paul Revere Program website.
    aydllIdl: "https://aydll.com",
    // Hemisphere Aerospace Investments (HAI) corporate website.
    hai: "https://hai-aero.com/",
    // USFCR verified vendor profile for Hemisphere Defense.
    usfcrProfile: "https://hemispheredefensegov.com/",
    // HAD LinkedIn company page. Empty until one exists: no page was found for
    // Hemisphere Aerospace Defense (only Hemisphere Aerospace Investments).
    // While empty, the footer renders a dim placeholder instead of a dead link,
    // and the URL is not asserted in Organization sameAs.
    linkedin: "",
    // SAM.gov entity page for HEMISPHERE AEROSPACE DEFENSE, LLC. Currently
    // unused: the registration is not visible in SAM.gov public search, so the
    // footer badge stays unlinked. Re-link once public display is enabled and
    // this URL resolves for signed-out visitors.
    samEntity: "https://sam.gov/entity/JC89VWA2MA45",
  },

  /**
   * Federal registration identifiers (SAM.gov, active). Shown on the
   * Certifications page and in the footer. Placeholder values render dim
   * until the approved codes/documents are supplied.
   */
  registration: {
    legalName: "HEMISPHERE AEROSPACE DEFENSE, LLC",
    uei: "JC89VWA2MA45",
    cage: "22TR6",
    samStatus: "Active Registration",
    naics: "[NAICS CODES PENDING]",
    psc: "[PSC CODES PENDING]",
    capabilityStatement: "/documents/HAD-AYDLL-Capability-Statement.pdf",
  },

  /** Contact information. */
  contact: {
    generalEmail: "info@haiaero.com",
    // phone is raw E.164 for the tel: click-to-call href; phoneDisplay is the readable label shown to visitors.
    phone: "+12544772281",
    phoneDisplay: "+1 (254) 477-2281",
    address: "522 Austin Ave, Waco, TX 76701, USA",
  },

  /**
   * Contact form delivery via Web3Forms (https://web3forms.com), which
   * forwards submissions to info@haiaero.com. The access key is a public
   * inbox-routing identifier by design (it grants no account access), so it
   * is safe to ship client-side; the form's honeypot field filters bot spam.
   * Web3Forms is the only third party that receives form data; it is named
   * in the Privacy Policy and in the notice under the form. If this provider
   * ever changes, update both of those disclosures and privacy/inventory.json.
   */
  contactForm: {
    web3formsAccessKey: "c6dff364-33a3-45e9-8c42-4de36b3b25a8",
    subject: "New inquiry from the Hemisphere Defense website",
  },
} as const;

/** Standard props for any outbound link so program/HAI links open safely. */
export const EXTERNAL_LINK_PROPS = {
  target: "_blank" as const,
  rel: "noopener noreferrer" as const,
};

/** True when a config value is still an unfilled placeholder. */
export const isPlaceholder = (value: string): boolean =>
  value.includes("[") && value.includes("]");

/**
 * True once management has supplied SITE.productionDomain. Every absolute-URL
 * feature (canonical, og:url, JSON-LD @id, sitemap) is gated on this so the
 * site never ships a guessed origin.
 */
export const hasProductionDomain = (): boolean => SITE.productionDomain.trim().length > 0;

/**
 * Absolute URL for a site-relative path, or undefined while the production
 * domain is unset. Callers must omit the field entirely when this returns
 * undefined rather than substituting a placeholder.
 */
export const absoluteUrl = (path: string): string | undefined => {
  if (!hasProductionDomain()) return undefined;
  const origin = SITE.productionDomain.replace(/\/+$/, "");
  return `${origin}${path.startsWith("/") ? path : `/${path}`}`;
};
