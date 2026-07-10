import { motion } from "framer-motion";
import DomainsData from "../../jsonData/domains/DomainsData.json";

type Domain = {
    id: string;
    label: string;
    icon: string;
    theme: string;
    text: string;
    image: string;
    alt: string;
};

/**
 * Domain sectors: Land / Air / Sea. The three environments HAD builds
 * awareness programs across. Cinematic media cards with hover elevation and an
 * amber "signal" accent. Copy follows the approved domain directions; imagery
 * is conceptual (uncrewed sensing infrastructure), never personnel or weapons.
 */
const DomainSectors = () => {
    return (
        <section className="had-domains te-py-120" id="domains">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <motion.div
                            className="te-section-title justify-content-center text-center"
                            initial={{ opacity: 0, y: -30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.9, ease: "easeOut" }}
                        >
                            <div className="te-section-content">
                                <div className="short-title-wrapper">
                                    <span className="short-title">Domains</span>
                                </div>
                                <h2 className="title text-white">
                                    Awareness across land, air, and sea
                                </h2>
                                <p className="had-domains-lead">
                                    The distributed warning network, modernized: persistent sensing and support
                                    infrastructure spanning every domain the mission crosses.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="row gy-4">
                    {(DomainsData as Domain[]).map((d, index) => (
                        <motion.div
                            key={d.id}
                            className="col-md-6 col-lg-4"
                            initial={{ opacity: 0, y: 44 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ delay: index * 0.14, duration: 0.6, ease: "easeOut" }}
                        >
                            <article className="had-domain-card">
                                <div className="had-domain-media">
                                    <img src={`/images/had/${d.image}`} alt={d.alt} loading="lazy" />
                                    <span className="had-domain-index" aria-hidden="true">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <div className="had-domain-label">
                                        <i className={d.icon} aria-hidden="true" />
                                        <span>{d.label}</span>
                                    </div>
                                </div>
                                <div className="had-domain-body">
                                    <span className="had-domain-theme">{d.theme}</span>
                                    <p className="had-domain-text">{d.text}</p>
                                </div>
                            </article>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DomainSectors;
