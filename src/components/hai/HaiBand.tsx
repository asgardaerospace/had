import { SITE, EXTERNAL_LINK_PROPS, isPlaceholder } from "../../config/site";

/**
 * Hemisphere Aerospace Investments (HAI) relationship band.
 * States the one approved relationship fact and links back to HAI. Kept
 * visually secondary to the HAD identity. Does NOT assert subsidiaries,
 * affiliates, partners, portfolio companies, or ownership terms.
 */
const HaiBand = () => {
    const haiReady = !isPlaceholder(SITE.external.hai);

    return (
        <div className="had-hai-band">
            <div className="container">
                <div className="had-hai-inner">
                    <p>{SITE.parent.relationship}</p>
                    {haiReady ? (
                        <a href={SITE.external.hai} {...EXTERNAL_LINK_PROPS} className="had-hai-link">
                            Visit {SITE.parent.shortName}
                            <i className="fa fa-solid fa-arrow-up-right-from-square ms-2" />
                        </a>
                    ) : (
                        <span className="had-external-note">
                            <i className="fa-solid fa-link" />
                            {SITE.parent.shortName} website link pending
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HaiBand;
