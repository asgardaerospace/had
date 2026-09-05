import { SITE, EXTERNAL_LINK_PROPS, isPlaceholder } from "../../config/site";

/**
 * Restrained social presence: LinkedIn only, no consumer-social clutter.
 *
 * The placeholder previously rendered as <Link to="#">, which React Router
 * resolves to href="/". That put a LinkedIn icon on all twenty pages that
 * silently navigated to the home page: misleading to a visitor, wrong for a
 * screen reader, and twenty spurious internal links into the home page.
 *
 * It now follows the same convention as every other pending value on the site:
 * a dim, non-interactive placeholder until the real URL is supplied in
 * config/site.ts. Populate SITE.external.linkedin and it becomes a live link.
 */
const SocialShare = () => {
    const url = SITE.external.linkedin;
    const ready = url.length > 0 && !isPlaceholder(url);

    if (!ready) {
        return (
            <span
                className="had-placeholder"
                aria-label="LinkedIn profile not yet published"
                title="LinkedIn profile not yet published"
            >
                <i className="fa-brands fa-linkedin-in" aria-hidden="true"></i>
            </span>
        );
    }

    return (
        <a href={url} {...EXTERNAL_LINK_PROPS} aria-label="Hemisphere Aerospace Defense on LinkedIn">
            <i className="fa-brands fa-linkedin-in" aria-hidden="true"></i>
        </a>
    );
};

export default SocialShare;
