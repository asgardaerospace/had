import { Link } from "react-router-dom";
import { motion } from "framer-motion";

type BreadCrumbProps = {
    pageTitle?: string;
    breadcrumb?: string;
    /** Small label above the title. */
    eyebrow?: string;
    /** One-line lead under the title. */
    subtitle?: string;
    /** Hero image filename in /images/had/. */
    image?: string;
    /** CSS object-position for the hero image (e.g. "center 40%"). */
    objectPosition?: string;
};

/**
 * Inner-page hero. A full-bleed cinematic image band with an eyebrow, page
 * title, optional lead, and a breadcrumb trail, so every inner page opens on a
 * strong visual consistent with the home hero (replaces the old flat strip).
 */
const BreadCrumb = ({
    pageTitle,
    breadcrumb,
    eyebrow,
    subtitle,
    image = "breadcrumb-bg.jpg",
    objectPosition = "center",
}: BreadCrumbProps) => {
    return (
        <section className="had-page-hero">
            <div className="had-page-hero-media">
                <img src={`/images/had/${image}`} alt="" aria-hidden="true" style={{ objectPosition }} />
            </div>
            <div className="had-page-hero-scrim" />
            <div className="container">
                <motion.div
                    className="had-page-hero-inner"
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
                >
                    {eyebrow && (
                        <span className="had-page-hero-eyebrow">
                            <span className="had-tricolor" aria-hidden="true" />
                            {eyebrow}
                        </span>
                    )}
                    <h1 className="had-page-hero-title">{pageTitle ? pageTitle : "Page not found"}</h1>
                    {subtitle && <p className="had-page-hero-sub">{subtitle}</p>}
                    <nav className="had-page-hero-crumbs" aria-label="Breadcrumb">
                        <Link to="/">Home</Link>
                        <span className="sep" aria-hidden="true">/</span>
                        <span className="current">{breadcrumb ? breadcrumb : "Page"}</span>
                    </nav>
                </motion.div>
            </div>
        </section>
    );
};

export default BreadCrumb;
