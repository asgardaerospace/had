import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import VideoBackdrop from "../video/VideoBackdrop";

/**
 * Full-bleed cinematic statement band — the second bold moment on the page.
 * Dawn breaking over the Atlantic (looking east, toward what approaches) under
 * the site's dual-era thesis. The video is lazy + reduced-motion-safe via
 * VideoBackdrop; the parallax wrapper adds depth.
 *
 * Copy is positioning, not a deployment or performance claim.
 */
const StatementBand = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
    const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

    return (
        <section className="had-statement" ref={ref}>
            <motion.div className="had-statement-media" style={{ y }}>
                <VideoBackdrop
                    src="/video/dawn-atlantic.mp4"
                    poster="/images/had/statement-dawn.jpg"
                    objectPosition="center"
                    className="had-statement-video"
                />
            </motion.div>
            <div className="had-statement-scrim" />
            <div className="container">
                <motion.div
                    className="had-statement-inner"
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <span className="had-statement-eyebrow">Before they arrive, we know</span>
                    <h2 className="had-statement-title">
                        The watch has changed. <span>The mission has not.</span>
                    </h2>
                    <p className="had-statement-sub">
                        Early warning is still a national advantage. The signal came before the fight — it
                        still should.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default StatementBand;
