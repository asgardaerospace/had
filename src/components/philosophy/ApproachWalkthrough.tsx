import PrinciplesData from "../../jsonData/philosophy/PrinciplesData.json";
import { motion } from "framer-motion";

type Principle = {
    id: number;
    icon: string;
    title: string;
    text: string;
    image?: string;
    alt?: string;
};

/**
 * Approach page walkthrough: the five operating principles presented as a
 * numbered, alternating image/text narrative. Reuses the same photography as
 * the home-page callout cards, shown larger so the Approach page reads as a
 * guided tour of how HAD scopes, develops, and sustains programs.
 */
const ApproachWalkthrough = () => {
    return (
        <section className="had-approach-walk te-pb-120">
            <div className="container">
                <div className="had-approach-walk-steps">
                    {(PrinciplesData as Principle[]).map((item, index) => {
                        const reversed = index % 2 === 1;
                        const fromX = reversed ? 48 : -48;
                        return (
                            <motion.article
                                key={item.id}
                                className={`had-approach-step${reversed ? " is-reversed" : ""}`}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.25 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            >
                                <motion.div
                                    className="had-approach-step-media"
                                    initial={{ opacity: 0, x: fromX }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, amount: 0.25 }}
                                    transition={{ duration: 0.7, ease: "easeOut" }}
                                >
                                    <img
                                        src={`/images/had/${item.image}`}
                                        alt={item.alt || item.title}
                                        loading="lazy"
                                    />
                                </motion.div>
                                <div className="had-approach-step-body">
                                    <span className="had-approach-step-eyebrow">
                                        <i className={item.icon} aria-hidden="true" />
                                        Principle {String(item.id).padStart(2, "0")}
                                    </span>
                                    <h3 className="had-approach-step-title">{item.title}</h3>
                                    <p className="had-approach-step-text">{item.text}</p>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ApproachWalkthrough;
