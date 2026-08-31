# Privacy posture and operational notes

Last audit: August 25, 2026. This file records how the site's privacy controls
work, the manual processes behind them, and the questions the codebase cannot
answer. It is internal documentation, not a public page.

## Current technical posture (verified)

- No cookies are set by the site (first- or third-party).
- No localStorage, sessionStorage, or IndexedDB usage.
- No analytics, advertising, pixels, session replay, or fingerprinting.
- No third-party requests on page load: fonts (Rajdhani, Font Awesome), CSS,
  JS, images, and video are all served with the site itself.
- Exactly one third-party data recipient: Web3Forms (api.web3forms.com),
  which receives contact form contents on explicit submit only and forwards
  them to info@haiaero.com. Disclosed under the form and in the Privacy Policy.
- Outbound links (aydll.com, hai-aero.com, hemispheredefensegov.com, sam.gov)
  use rel="noopener noreferrer".
- Because no non-essential tracking exists, there is no cookie banner, and
  none is required. Opt-out signals such as Global Privacy Control are
  trivially honored: there is no sale, sharing, or targeted advertising to
  opt out of. Do not add a banner without adding something that needs one.

`npm run privacy-check` (also runs first in `npm run build`) fails the build
if shipped source gains an undeclared external host, a known tracker/CDN
host, or cookie/storage APIs. The allowlists live in `privacy/inventory.json`.

## If you add a third-party service

1. Decide whether it is strictly necessary for something the visitor
   explicitly requests. "The template uses it" does not qualify.
2. If it is non-essential tracking (analytics, pixels, embeds that phone
   home), a consent management layer must ship BEFORE it does, with Reject as
   easy as Accept, per-category control, withdrawal, and GPC handling.
3. Update `privacy/inventory.json`, the Privacy Policy
   (`src/pages/innerPages/Privacy.tsx`), and any point-of-collection notice.
4. Check whether a data processing agreement with the vendor is needed.

## Rights requests (manual workflow)

There is no automated rights portal because there is no user database; the
only personal data is email correspondence and Web3Forms-delivered form
submissions in the info@haiaero.com inbox. When a request arrives at that
inbox (access, correction, deletion, etc.):

1. Verify the requester controls the email address the correspondence came
   from (reply-to-confirm is sufficient at this data sensitivity level).
2. Search the inbox for their correspondence; fulfill by exporting, editing,
   or deleting it, and confirm completion to the requester.
3. Web3Forms retains submissions transiently for delivery; for deletion
   requests, also check the Web3Forms dashboard for stored submissions.
4. Respond within the shortest applicable statutory window (45 days is a safe
   default; GDPR is one month). If denying, explain why and note the
   requester may appeal by replying.

## Open questions requiring business/legal input

These cannot be resolved from the repository. None of them block launch of
the current tracking-free site, but they should be confirmed:

1. **Hosting provider logging.** Which host serves production, what its
   server logs capture, and how long it retains them. The policy currently
   describes standard logs generically, which is accurate but should be
   confirmed once hosting is fixed.
2. **Email retention.** How long inquiry correspondence is kept in the
   info@haiaero.com inbox. The policy states business-correspondence
   retention; a defined internal retention period would be stronger.
3. **Web3Forms terms.** Confirm the Web3Forms plan in use, its data retention
   for delivered submissions, and whether a DPA is warranted. (Legal review.)
4. **State law applicability.** Comprehensive state privacy laws (California,
   Colorado, Texas, Virginia, etc.) have revenue and volume thresholds a
   corporate brochure site with one contact form is unlikely to meet, but
   applicability depends on Hemisphere's overall business, not this site.
   The site is built to be compliant-by-architecture regardless (no sale, no
   sharing, no tracking, rights honored on request). (Legal review.)
5. **GDPR/UK GDPR exposure.** The site is US-directed and does not monitor
   behavior in any jurisdiction, but whether Hemisphere offers services to
   EEA/UK individuals is a business fact. The tracking-free design means the
   main ePrivacy/consent risks do not arise either way. (Legal review.)
6. **Counsel review of legal pages.** The Privacy Policy and Terms of Use are
   written to match verified site behavior but have not been reviewed by
   counsel. The Terms' consent-by-use, indemnification, and governing-law
   clauses in particular are boilerplate that counsel should confirm.
