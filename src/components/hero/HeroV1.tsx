import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useReducedMotion, type Variants } from "framer-motion";
import VideoBackdrop from "../video/VideoBackdrop";

/**
 * Hemisphere Defense cinematic hero.
 *
 * The operating metaphor made literal: a colonial rider and a modern operator
 * face each other across a single amber lantern: "The warfighter has changed.
 * The mission remains." A muted, looped video plays behind a left-weighted
 * navy scrim that keeps the copy legible; a poster still paints first and is
 * the sole visual for reduced-motion / reduced-data users.
 *
 * No weapons emphasis, no flag-waving. The two watchmen and the signal light
 * carry the meaning.
 */
const HeroV1 = () => {
    const reduce = useReducedMotion();

    // Subtle parallax: the media drifts slower than the page on scroll.
    const { scrollY } = useScroll();
    const mediaY = useTransform(scrollY, [0, 700], [0, reduce ? 0 : 80]);

    const heroBg: React.CSSProperties = {
        background:
            "radial-gradient(1200px 600px at 74% 18%, rgba(233,162,59,0.16), transparent 60%), linear-gradient(120deg, #0E1C33 0%, #14203A 55%, #0B1522 100%)",
    };

    const container: Variants = {
        hidden: {},
        show: { transition: { staggerChildren: reduce ? 0 : 0.14, delayChildren: reduce ? 0 : 0.2 } },
    };
    const line: Variants = {
        hidden: { opacity: 0, y: reduce ? 0 : 24 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] } },
    };

    return (
        <section className="had-hero had-hero-cinematic">
            {/* Navy gradient fallback beneath the video. */}
            <div className="had-hero-bg" style={heroBg} />
            <motion.div className="had-hero-media" style={{ y: mediaY }}>
                <VideoBackdrop
                    eager
                    src="/video/hero-revere.mp4"
                    poster="/images/had/hero-poster.jpg"
                    objectPosition="center"
                    className="had-hero-video"
                    playbackRate={0.5}
                    crossfadeLoop
                    crossfadeDuration={1}
                />
            </motion.div>
            {/* Left-weighted scrim + bottom vignette keep the headline legible. */}
            <div className="had-hero-scrim" />

            <div className="container">
                <motion.div
                    className="had-hero-content"
                    variants={container}
                    initial="hidden"
                    animate="show"
                >
                    <motion.span className="had-hero-eyebrow" variants={line}>
                        <span className="had-tricolor" aria-hidden="true" />
                        Hemisphere Defense
                    </motion.span>

                    <h1 className="had-hero-title">
                        <motion.span className="had-hero-line" variants={line}>
                            The warfighter has changed.
                        </motion.span>
                        <motion.span className="had-hero-line had-hero-line-accent" variants={line}>
                            The mission remains.
                        </motion.span>
                    </h1>

                    <motion.p className="had-hero-desc" variants={line}>
                        Hemisphere Defense builds mission-oriented programs for the next era of American
                        vigilance: persistent awareness, distributed infrastructure, and operational
                        readiness across land, air, and sea.
                    </motion.p>

                    <motion.div className="had-hero-actions" variants={line}>
                        <Link to="/programs" className="te-theme-btn">
                            Explore Programs
                            <i className="fa fa-solid fa-arrow-right" />
                        </Link>
                        <Link
                            to="/program-details/aydll-idl"
                            className="te-theme-btn te-theme-btn-outline"
                        >
                            View Paul Revere Program
                        </Link>
                    </motion.div>
                </motion.div>
            </div>

            <a href="#mission" className="had-hero-scrollcue" aria-label="Scroll to mission">
                <span className="had-hero-scrollcue-dot" />
                <span>The warning came first</span>
            </a>
        </section>
    );
};

export default HeroV1;
