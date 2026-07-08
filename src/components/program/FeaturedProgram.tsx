import { Link } from "react-router-dom";
import { SITE, EXTERNAL_LINK_PROPS, isPlaceholder } from "../../config/site";

/**
 * Featured Program band — AYDLL / IDL.
 *
 * Presents the canonical program description only, then routes visitors to
 * the dedicated AYDLL / IDL program website. The full technical narrative is
 * intentionally NOT reproduced on the HAD corporate site.
 *
 * Boundary guardrails (do not remove): AYDLL / IDL is persistent maritime
 * awareness infrastructure — never a ship, drone mothership, weapons platform,
 * combat ship, autonomous warship, or a replacement for crewed assets.
 * Government retains all command, mission, intelligence, response, engagement,
 * and weapons-release authority.
 */
const FeaturedProgram = () => {
    const programSiteReady = !isPlaceholder(SITE.external.aydllIdl);

    return (
        <>
            <div className="cta-area had-featured-program te-py-120">
                <div className="container">
                    <div className="row gy-5 align-items-center">
                        <div className="col-lg-5 wow fadeInLeft" data-wow-delay="100ms" data-wow-duration="1500ms">
                            <div className="had-mission-visual had-mv-photo had-mv-aydll" style={{ minHeight: 380 }}>
                                <span className="had-mission-visual-eyebrow">Featured Program</span>
                                <p className="had-mission-visual-line">AYDLL / IDL</p>
                            </div>
                        </div>
                        <div className="col-lg-7 wow fadeInRight" data-wow-delay="200ms" data-wow-duration="1500ms">
                            <div className="te-section-title">
                                <div className="te-section-content">
                                    <span className="had-program-eyebrow">
                                        Persistent Maritime Awareness Infrastructure
                                    </span>
                                    <h2 className="title">AYDLL / IDL</h2>
                                    <p className="had-featured-canonical">
                                        Persistent maritime awareness infrastructure designed to support maritime
                                        domain awareness, autonomous systems operations, modular mission capabilities,
                                        and government reach-back command.
                                    </p>
                                    <div className="te-section-desc">
                                        <p>
                                            AYDLL / IDL exists to reduce the burden of continuous low-intensity sensing
                                            and monitoring on high-value crewed assets. Government personnel retain
                                            command, mission, intelligence, response, engagement, and weapons-release
                                            authority; the infrastructure operator launches, recovers, hosts, operates,
                                            maintains, and sustains the infrastructure.
                                        </p>
                                    </div>
                                    <div className="btn-wrapper d-flex flex-wrap align-items-center gap-3">
                                        <Link to="/program-details/aydll-idl" className="te-theme-btn">
                                            Program Overview
                                            <i className="fa fa-solid fa-arrow-right" />
                                        </Link>
                                        {programSiteReady ? (
                                            <a
                                                href={SITE.external.aydllIdl}
                                                {...EXTERNAL_LINK_PROPS}
                                                className="te-theme-btn te-theme-btn-outline"
                                            >
                                                Visit the AYDLL / IDL Site
                                                <i className="fa fa-solid fa-arrow-up-right-from-square ms-2" />
                                            </a>
                                        ) : (
                                            <span className="had-external-note">
                                                <i className="fa-solid fa-link" />
                                                Dedicated program website link pending
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FeaturedProgram;
