import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SITE, EXTERNAL_LINK_PROPS, isPlaceholder } from "../../config/site";
import VideoBackdrop from "../video/VideoBackdrop";

/**
 * Flagship section — the Paul Revere Program.
 *
 * "Paul Revere Program" is the public-facing program name; it is built around
 * the AYDLL platform. This band presents the canonical description and canon-
 * safe capability bullets, then routes to the dedicated program website. Full
 * technical detail is intentionally NOT reproduced on the HAD corporate site.
 *
 * BOUNDARY GUARDRAILS (do not remove): the platform is persistent maritime
 * awareness infrastructure — never a ship, drone mothership, weapons platform,
 * combat ship, autonomous warship, or a replacement for crewed assets. It is
 * not a deployed or endorsed government program. Government personnel retain
 * all command, mission, intelligence, response, engagement, and weapons-release
 * authority; the operator only launches, recovers, hosts, operates, maintains,
 * and sustains.
 */
const CAPABILITIES = [
    "Persistent maritime awareness",
    "Distributed offshore infrastructure",
    "Modular mission support",
    "Autonomous systems launch / recovery support",
    "Sensor fusion and communications relay",
    "Government mission authority preserved",
    "Contractor-operated infrastructure support",
];

const FeaturedProgram = () => {
    const programSiteReady = !isPlaceholder(SITE.external.aydllIdl);

    return (
        <section className="had-prp" id="paul-revere">
            <div className="container">
                <div className="row gy-5 align-items-center">
                    {/* Media */}
                    <motion.div
                        className="col-lg-6"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="had-prp-media">
                            <img
                                className="had-prp-media-main"
                                src="/images/had/program-node.jpg"
                                alt="Overhead view of a modular offshore sensing node holding position on open water."
                                loading="lazy"
                            />
                            <img
                                className="had-prp-media-inset"
                                src="/images/had/program-mast-fog.jpg"
                                alt="A maritime sensing mast lit amber in coastal fog at night."
                                loading="lazy"
                            />
                            <span className="had-prp-platform-badge">
                                Built around the <strong>{SITE.flagship.platform}</strong> platform
                            </span>
                        </div>
                    </motion.div>

                    {/* Copy */}
                    <motion.div
                        className="col-lg-6"
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <span className="had-prp-eyebrow">Flagship Program</span>
                        <h2 className="had-prp-title">Paul Revere Program</h2>
                        <p className="had-prp-subtitle">{SITE.flagship.subtitle}</p>
                        <p className="had-prp-body">
                            The Paul Revere Program carries forward a simple American idea: warning before
                            arrival. Built around the {SITE.flagship.platform} platform, the program is designed
                            to support maritime domain awareness, autonomous systems operations, modular mission
                            capabilities, and government reach-back command.
                        </p>

                        <ul className="had-prp-caps">
                            {CAPABILITIES.map((c) => (
                                <li key={c}>
                                    <i className="fa-solid fa-angle-right" aria-hidden="true" />
                                    {c}
                                </li>
                            ))}
                        </ul>

                        <div className="had-authority-note">
                            Government mission owners retain command, mission, intelligence, response, and
                            engagement authority. Hemisphere Defense operates, maintains, hosts, and sustains the
                            infrastructure — it is not a ship, a weapons platform, or a replacement for crewed
                            assets.
                        </div>

                        <div className="btn-wrapper d-flex flex-wrap align-items-center gap-3 mt-4">
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
                                    Visit the Paul Revere Program Site
                                    <i className="fa fa-solid fa-arrow-up-right-from-square ms-2" />
                                </a>
                            ) : (
                                <span className="had-external-note">
                                    <i className="fa-solid fa-link" />
                                    Dedicated program website link pending
                                </span>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Lantern → network tagline band */}
            <div className="had-prp-tagline">
                <VideoBackdrop
                    src="/video/lantern-network.mp4"
                    poster="/images/had/lantern-network.jpg"
                    objectPosition="center"
                    className="had-prp-tagline-media"
                />
                <div className="had-prp-tagline-scrim" />
                <div className="container">
                    <motion.div
                        className="had-prp-tagline-inner"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h3 className="had-prp-tagline-title">
                            The lantern was a signal. <span>The platform is the network.</span>
                        </h3>
                        <p className="had-prp-tagline-sub">
                            From one signal in a church tower to persistent awareness across the maritime edge.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default FeaturedProgram;
