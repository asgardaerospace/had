import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Mission statement band — the site's thesis, stated over the Old North Church
 * signal lanterns ("one if by land, two if by sea"). Parallaxed image + navy
 * scrim; copy reveals as it enters view.
 *
 * Historical framing only — the metaphor, not a claim. Anchors the hero scroll
 * cue (id="mission").
 */
const MissionBand = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const photoY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <section className="had-mission-band" id="mission" ref={ref}>
            <motion.div className="had-mission-band-photo" style={{ y: photoY }} />
            <div className="had-mission-band-scrim" />
            <div className="container">
                <motion.div
                    className="had-mission-band-inner"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="had-mission-band-eyebrow">
                        <span className="had-tricolor" aria-hidden="true" />
                        The Watch
                    </span>
                    <h2 className="had-mission-band-title">
                        The warning came <span>before</span> the fight.
                    </h2>
                    <p className="had-mission-band-lead">
                        America has always depended on those who see first. On an April night in 1775, the
                        country's defense began with a signal — lanterns raised in a church tower and riders
                        carrying word ahead of the column. Hemisphere Defense is built on the same idea:
                        detect early, signal clearly, and sustain the watch so decision-makers can act before
                        arrival.
                    </p>
                    <p className="had-mission-band-coda">
                        From lanterns to sensors. From riders to networks. The mission remains.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default MissionBand;
