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
  name: "Hemisphere Defense",
  shortName: "HAD",
  // Restrained hero positioning statement (see alternates in project notes).
  positioning: "American vigilance, modernized.",
  // Primary hero line: the site's operating thesis (Paul Revere metaphor).
  headline: "The warfighter has changed. The mission remains.",
  description:
    "Hemisphere Defense builds mission-oriented programs for the next era of American vigilance: persistent awareness, distributed infrastructure, and operational readiness across land, air, and sea.",

  parent: {
    name: "Hemisphere Aerospace Investments",
    shortName: "HAI",
    // Kept visually secondary to the HAD identity per brand direction.
    relationship: "Hemisphere Defense operates within the Hemisphere Aerospace Investments (HAI) structure.",
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
  },

  /** Contact placeholders: replace with approved information before launch. */
  contact: {
    generalEmail: "[GENERAL-INQUIRY-EMAIL]",
    phone: "[PHONE]",
    address: "[MAILING-ADDRESS]",
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
