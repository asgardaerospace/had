/**
 * Hemisphere Aerospace Defense: per-route search metadata.
 *
 * Single source of truth for every indexable route's title, description,
 * canonical path, and social card. Replaces the previous model, where one
 * <Helmet> in App.tsx gave all eleven routes the same title and description.
 *
 * ENTITY STRATEGY
 * The primary entity is "Hemisphere Aerospace Defense". The bare phrase
 * "hemisphere defense" is a long-standing term of art in US defense policy and
 * military history, held in search by DTIC, the Library of Congress, and the
 * Army Center of Military History. We do not compete for it. Titles therefore
 * lead with, or explicitly contain, the full company name.
 *
 * DOMAIN GATE
 * Canonical and Open Graph URLs are derived from SITE.productionDomain. While
 * that field is empty, absolute URLs are omitted rather than guessed. See
 * PRODUCTION_DOMAIN_REQUIRED in config/site.ts.
 *
 * CLAIM DISCIPLINE
 * Descriptions state what the company develops and how programs are staged.
 * No description asserts a customer, a contract, a government relationship, a
 * deployment, or a delivered capability. Program language stays developmental
 * wherever the program is developmental.
 */


import ProgramsData from "../jsonData/programs/ProgramsData.json";
import LeadershipData from "../jsonData/leadership/LeadershipData.json";

export type RouteMeta = {
  /** Canonical site-relative path, always leading slash, never trailing. */
  path: string;
  /** <title>. Aim for roughly 60 characters. */
  title: string;
  /** <meta name="description">. Aim for 150 to 160 characters. */
  description: string;
  /** Social card image, site-relative. Absolute form is built at render. */
  image?: string;
  /** og:type. "website" for hubs, "article" for content and profile pages. */
  ogType?: "website" | "article" | "profile";
  /** Excluded from robots indexing and from sitemap.xml. */
  noindex?: boolean;
  /** Sitemap priority hint, 0.0 to 1.0. */
  priority?: number;
};

const OG_DEFAULT = "/images/had/hero-vigilance-poster.jpg";

/** Static routes. Dynamic routes are generated below from the content data. */
export const STATIC_ROUTES: RouteMeta[] = [
  {
    path: "/",
    title: "Hemisphere Aerospace Defense | Persistent Awareness Programs",
    description:
      "Hemisphere Aerospace Defense develops, manages, operates, and sustains defense programs built around persistent awareness, distributed infrastructure, and autonomous systems support across land, air, and sea.",
    image: OG_DEFAULT,
    priority: 1.0,
  },
  {
    path: "/about",
    title: "About Hemisphere Aerospace Defense | Company Overview",
    description:
      "Hemisphere Defense is the operating name of Hemisphere Aerospace Defense, LLC, a defense-programs company based in Waco, Texas. What we do, how we are organized, and how to engage us.",
    image: "/images/had/about-revere.jpg",
    priority: 0.9,
  },
  {
    path: "/capabilities",
    title: "Capability Areas | Hemisphere Aerospace Defense",
    description:
      "The six capability areas Hemisphere Aerospace Defense builds programs around: persistent awareness, distributed infrastructure, autonomous systems support, modular mission capability, operational sustainment, and rapid program development.",
    image: "/images/had/cap-awareness.jpg",
    priority: 0.9,
  },
  {
    path: "/domains",
    title: "Land, Air and Sea Domains | Hemisphere Aerospace Defense",
    description:
      "Hemisphere Aerospace Defense develops persistent sensing and support infrastructure across three domains: ground-based awareness, air-domain reach and relay, and maritime distributed sensing.",
    image: "/images/had/domain-sea.jpg",
    priority: 0.7,
  },
  {
    path: "/programs",
    title: "Program Portfolio | Hemisphere Aerospace Defense",
    description:
      "The defense programs Hemisphere Aerospace Defense develops, manages, operates, or sponsors. Each program is scoped around a specific operational problem and matures through defined stages.",
    image: "/images/had/colonial-boston.jpg",
    priority: 0.9,
  },
  {
    path: "/approach",
    title: "How We Develop Defense Programs | Hemisphere Aerospace Defense",
    description:
      "The principles governing how Hemisphere Aerospace Defense scopes, develops, and sustains programs: start with the operational problem, preserve clear lines of authority, and advance on evidence.",
    image: "/images/had/statement-dawn.jpg",
    priority: 0.7,
  },
  {
    path: "/leadership",
    title: "Leadership Team | Hemisphere Aerospace Defense",
    description:
      "Executive and technical leadership of Hemisphere Aerospace Defense, spanning commercial aerospace, US Air Force command, defense finance and contracting, systems engineering, and program execution.",
    image: "/images/had/team-ops.jpg",
    priority: 0.8,
  },
  {
    path: "/certifications",
    title: "SAM.gov Registration, UEI and CAGE | Hemisphere Aerospace Defense",
    description:
      "Federal registration details for HEMISPHERE AEROSPACE DEFENSE, LLC: UEI JC89VWA2MA45, CAGE code 22TR6, active SAM.gov registration, USFCR verified vendor status, and the AYDLL capability statement.",
    ogType: "article",
    priority: 0.9,
  },
  {
    path: "/contact",
    title: "Contact Hemisphere Aerospace Defense | Program Inquiries",
    description:
      "Reach Hemisphere Aerospace Defense for program, government mission, partnership, corporate, and media inquiries. Entity identifiers for contracting officers are published on our certifications page.",
    image: "/images/had/lantern-network.jpg",
    priority: 0.8,
  },
  {
    path: "/privacy",
    title: "Privacy Policy | Hemisphere Aerospace Defense",
    description:
      "How the Hemisphere Aerospace Defense website handles visitor information. The site sets no cookies, runs no analytics, and uses one processor for contact form delivery.",
    ogType: "article",
    priority: 0.2,
  },
  {
    path: "/terms",
    title: "Terms of Use | Hemisphere Aerospace Defense",
    description:
      "Terms governing use of the Hemisphere Aerospace Defense website.",
    ogType: "article",
    priority: 0.2,
  },
  {
    path: "/404",
    title: "Page Not Found | Hemisphere Aerospace Defense",
    description: "The requested page could not be found.",
    noindex: true,
  },
];

/* ------------------------------------------------------------------ */
/* Dynamic routes, generated from the same data the pages render from. */
/* ------------------------------------------------------------------ */

type ProgramRecord = {
  id: string;
  slug: string;
  name: string;
  category: string;
  mission: string;
  thumb?: string;
};

type LeaderRecord = { id: string; slug: string; name: string; title: string; titleShort?: string };
type LeaderGroup = { group: string; members: LeaderRecord[] };

export const PROGRAM_ROUTES: RouteMeta[] = (ProgramsData as ProgramRecord[]).map((p) => {
  const isFlagship = p.slug === "paul-revere-program";
  return {
    path: `/programs/${p.slug}`,
    title: isFlagship
      ? "Paul Revere Program | Persistent Maritime Awareness Infrastructure"
      : `${p.name} | Hemisphere Aerospace Defense`,
    // The flagship description is the canonical program sentence from
    // config/site.ts, extended only with the developing organization. Keeping
    // one wording across the site, the capability statement, and any adjacent
    // property is what lets search and AI systems resolve the entity.
    description: isFlagship
      ? "The Paul Revere Program is persistent maritime awareness infrastructure supporting maritime domain awareness, autonomous systems operations, modular mission capability, and government reach-back command. Developed by Hemisphere Aerospace Defense around the AYDLL platform."
      : p.mission,
    image: "/images/had/program-node-hero.jpg",
    ogType: "article",
    priority: isFlagship ? 0.9 : 0.6,
  };
});

export const LEADERSHIP_ROUTES: RouteMeta[] = (LeadershipData as LeaderGroup[])
  .flatMap((g) => g.members)
  .map((m) => ({
    path: `/leadership/${m.slug}`,
    // titleShort exists only where the published title lists several roles and
    // would otherwise blow past the length a search result renders.
    title: `${m.name}, ${m.titleShort ?? m.title} | Hemisphere Aerospace Defense`,
    description: `${m.name} serves as ${m.title} at Hemisphere Aerospace Defense. Background, responsibilities, and role in the company's defense programs.`,
    image: "/images/had/team-ops.jpg",
    ogType: "profile",
    priority: 0.5,
  }));

/** Every route the prerenderer builds and the sitemap generator considers. */
export const ALL_ROUTES: RouteMeta[] = [
  ...STATIC_ROUTES,
  ...PROGRAM_ROUTES,
  ...LEADERSHIP_ROUTES,
];

/** Routes eligible for indexing and inclusion in sitemap.xml. */
export const INDEXABLE_ROUTES = ALL_ROUTES.filter((r) => !r.noindex);

/**
 * Look up metadata for a resolved pathname. Falls back to the 404 entry so a
 * page can never silently ship without a title.
 */
export const metaForPath = (pathname: string): RouteMeta => {
  const clean = pathname !== "/" ? pathname.replace(/\/+$/, "") : "/";
  return (
    ALL_ROUTES.find((r) => r.path === clean) ??
    ALL_ROUTES.find((r) => r.path === "/404")!
  );
};
