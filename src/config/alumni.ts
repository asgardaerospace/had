/**
 * Conservative alumniOf extraction for Person structured data.
 *
 * Rather than parsing biographies freely, this matches against a fixed list of
 * institution names and emits one only when that exact name appears in the
 * approved biography text. A biography that names no institution produces no
 * alumniOf field, which is the correct outcome. Nothing is inferred from a
 * degree abbreviation, a rank, a commissioning source, or a former employer.
 *
 * To support a new institution, add its exact published name here. Do not add
 * an entry to make a schema field look fuller.
 */

const KNOWN_INSTITUTIONS = [
  "Texas A&M University",
  "Embry-Riddle Aeronautical University",
  "North Carolina State University",
  "Baylor University",
  "United States Coast Guard Academy",
  "University of North Carolina at Chapel Hill",
  "United States Naval War College",
] as const;

/**
 * Institutions explicitly named in a leader's approved biography.
 * Returns undefined when the biography names none, so the field is omitted
 * rather than emitted empty.
 */
export const alumniFromBio = (bio: string): string[] | undefined => {
  const found = KNOWN_INSTITUTIONS.filter((name) => bio.includes(name));
  return found.length ? [...found] : undefined;
};
