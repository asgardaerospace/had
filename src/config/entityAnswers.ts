/**
 * Canonical entity answers.
 *
 * These are the short, self-contained passages that search engines and AI
 * retrieval systems lift when asked "what is Hemisphere Aerospace Defense?".
 * They exist as one shared source so that the visible page copy and the
 * FAQPage structured data can never drift apart, and so the same wording can
 * be reused verbatim on adjacent Hemisphere properties, in the capability
 * statement, and in directory profiles.
 *
 * RULES FOR EDITING
 * 1. Every answer must be true, and supportable from published material.
 * 2. Every answer must stand alone. Assume it is read with no surrounding page.
 * 3. Keep maturity language accurate. "Develops" and "is designed to" are not
 *    interchangeable with "operates" or "provides".
 * 4. No customer, contract, government relationship, deployment, award, or
 *    certification may be named here unless the company has published it.
 *
 * DELIBERATE OMISSION
 * There is no answer here about artificial intelligence capability. The
 * phrase "AI Supervisory Command and Control" appears on an adjacent
 * Hemisphere property but not on this site, and its current status (approved
 * capability, program component, future architecture, or marketing language)
 * has not been established. Per the implementation directive, that terminology
 * is not propagated here until management defines it. See the audit's
 * cross-property section.
 */

export type EntityAnswer = { q: string; a: string };

/** Rendered visibly on /about and emitted as FAQPage structured data there. */
export const ABOUT_FAQ: EntityAnswer[] = [
  {
    q: "What is Hemisphere Aerospace Defense?",
    a: "Hemisphere Aerospace Defense is a defense-programs company operating as HEMISPHERE AEROSPACE DEFENSE, LLC. It is registered in the System for Award Management under UEI JC89VWA2MA45 and CAGE code 22TR6, and is based in Waco, Texas. Hemisphere Defense is the company's operating name; the two refer to the same entity. It shares executive leadership with Hemisphere Aerospace Investments (HAI).",
  },
  {
    q: "What does Hemisphere Aerospace Defense do?",
    a: "Hemisphere Aerospace Defense identifies operational gaps in government missions and develops structured defense programs around them. The company develops, manages, operates, and sustains those programs across their life, rather than supplying individual components. Its work is organized around six capability areas: persistent awareness, distributed infrastructure, autonomous systems support, modular mission capability, operational sustainment, and rapid program development.",
  },
  {
    q: "What mission areas does the company address?",
    a: "Hemisphere Aerospace Defense works across land, air, and maritime domains. Ground programs address persistent awareness and support infrastructure in contested, remote, and austere environments. Air programs address reach, sensing, communications relay, and autonomous systems support. Maritime programs address persistent awareness, distributed sensing, and lower-burden operational coverage, and are where the company's first program is concentrated.",
  },
  {
    q: "What is the Paul Revere Program?",
    a: "The Paul Revere Program is persistent maritime awareness infrastructure designed to support maritime domain awareness, autonomous systems operations, modular mission capabilities, and government reach-back command. It is built around the AYDLL platform. It is infrastructure, not a ship, a weapons platform, or a replacement for crewed cutters, destroyers, or aircraft. The program is in program development.",
  },
  {
    q: "Who develops the Paul Revere Program?",
    a: "Hemisphere Aerospace Defense develops the Paul Revere Program. The program is the company's flagship effort and is built around the AYDLL platform.",
  },
  {
    q: "How does Hemisphere Aerospace Defense approach autonomous systems?",
    a: "The company treats autonomous and uncrewed systems as something its infrastructure supports rather than something it replaces people with. Its programs are designed to launch, recover, host, and sustain autonomous systems so those systems can operate for longer and further from shore-based support. The purpose is to reduce the burden of continuous, low-intensity sensing and monitoring on high-value crewed assets.",
  },
  {
    q: "What authority remains with human operators?",
    a: "Government personnel retain command authority, mission authority, intelligence authority, response authorization, engagement authority, and weapons-release authority where applicable. Hemisphere Aerospace Defense launches, recovers, hosts, operates, maintains, and sustains the infrastructure. The company does not replace military services, government mission owners, or prime contractors, and does not hold government authority.",
  },
  {
    q: "Who leads Hemisphere Aerospace Defense?",
    a: "The company is led by an executive team and a technical leadership team. Executive leadership comprises John B. Sawyer, Founder, Principal and Chief Executive Officer; Craig McPike, Brigadier General USAF Retired, Chair of the Board of Strategy and Oversight; Brendan McPherson, Board Member and Senior Strategic Advisor; and Alex Hart, Chief Financial Officer. Technical leadership comprises Robert Riedell, Director of Programs; Chip Fichtner, Head of Engineering; Dalton Sawyer, Technical Director; and Austin Fichtner, Technology Strategy and Integration.",
  },
  {
    q: "How can an organization engage Hemisphere Aerospace Defense?",
    a: "Government mission owners, industry partners, and other organizations can reach the company through the contact page. Contracting officers and procurement teams will find the entity's legal name, UEI, CAGE code, SAM.gov registration status, and capability statement on the certifications page.",
  },
];

/** Rendered visibly on /certifications and emitted as FAQPage there. */
export const PROCUREMENT_FAQ: EntityAnswer[] = [
  {
    q: "What is the legal business name of Hemisphere Defense?",
    a: "HEMISPHERE AEROSPACE DEFENSE, LLC. Hemisphere Defense and Hemisphere Aerospace Defense are operating names for the same registered entity.",
  },
  {
    q: "What is the company's UEI and CAGE code?",
    a: "The Unique Entity ID is JC89VWA2MA45 and the CAGE code is 22TR6. Both are held under an active System for Award Management registration.",
  },
  {
    q: "Is the SAM.gov registration active?",
    a: "Yes. HEMISPHERE AEROSPACE DEFENSE, LLC holds an active SAM.gov registration, verified through US Federal Contractor Registration.",
  },
  {
    q: "Where is Hemisphere Aerospace Defense located?",
    a: "522 Austin Ave, Waco, TX 76701, United States.",
  },
];
