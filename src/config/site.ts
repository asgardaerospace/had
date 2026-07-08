/**
 * Hemisphere Defense (HAD) — central site configuration.
 *
 * Single source of truth for brand strings, external links, and contact
 * information. Values wrapped in [BRACKETS] are placeholders awaiting
 * approved content — swap them here and they update everywhere.
 *
 * CORPORATE BOUNDARY: HAD and HAI are Hemisphere entities. Do not add any
 * relationship, link, or reference to any non-Hemisphere entity here, and do
 * not infer corporate relationships from program materials.
 */

export const SITE = {
  name: "Hemisphere Defense",
  shortName: "HAD",
  // Restrained hero positioning statement (see alternates in project notes).
  positioning: "Developing defense programs for persistent, distributed operations.",
  description:
    "Hemisphere Defense (HAD) is the defense-programs company within Hemisphere Aerospace Investments. HAD identifies operational gaps in national-security missions and develops structured, sustainable defense programs around them.",

  parent: {
    name: "Hemisphere Aerospace Investments",
    shortName: "HAI",
    // Kept visually secondary to the HAD identity per brand direction.
    relationship: "Hemisphere Defense operates within the Hemisphere Aerospace Investments (HAI) structure.",
  },

  /** External destinations. Program websites live off the HAD corporate site. */
  external: {
    // Dedicated AYDLL / IDL program website — replace with the approved URL.
    aydllIdl: "https://[AYDLL-IDL-PROGRAM-SITE]",
    // HAI corporate website — replace with the approved URL.
    hai: "https://[HAI-CORPORATE-SITE]",
  },

  /** Contact placeholders — replace with approved information before launch. */
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
