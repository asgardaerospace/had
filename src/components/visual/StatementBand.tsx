import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Full-bleed cinematic statement band — the one deliberately bold moment on
 * the page. It breaks the stacked-section rhythm with a parallaxed dawn image
 * of an uncrewed surface vessel and states the site's thesis.
 *
 * Copy is operating philosophy (echoes the approved "maintained over time,
 * not demonstrated once" language), NOT a claim of deployment or performance.
 */
const StatementBand = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const photoY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

    return (
        <section className="had-statement" ref={ref}>
            <motion.div className="had-statement-photo" style={{ y: photoY }} />
            <div className="had-statement-scrim" />
            <div className="container">
                <motion.div
                    className="had-statement-inner"
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="had-statement-eyebrow">Persistent by design</span>
                    <h2 className="had-statement-title">
                        Awareness is something you <span>sustain</span> — not
                        something you demonstrate once.
                    </h2>
                </motion.div>
            </div>
        </section>
    );
};

export default StatementBand;
