import { useRef } from "react";
import Slider from 'react-slick';
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { SITE } from "../../config/site";

/**
 * Hemisphere Defense hero.
 * Restrained, text-led. The environment layers (navy gradient, faint world
 * map, sensing motif) live on the hero container — NOT inside the slick
 * slides — so the carousel only manages content and the motif stays fixed
 * as slides change. No personnel or weapons imagery.
 */
const SliderV1 = () => {
    const sliderRef = useRef<Slider | null>(null);

    // Parallax: the hero photo drifts slower than the page as you scroll,
    // giving the flat backdrop real depth.
    const { scrollY } = useScroll();
    const heroPhotoY = useTransform(scrollY, [0, 700], [0, 90]);

    const settings = {
        infinite: true,
        autoplay: false,
        arrows: true,
        speed: 1200,
        slidesToShow: 1,
        dots: false,
        slidesToScroll: 1,
    };

    const heroBg: React.CSSProperties = {
        background:
            "radial-gradient(1200px 600px at 78% 15%, rgba(62,124,177,0.22), transparent 60%), linear-gradient(120deg, #0E1C33 0%, #14203A 55%, #0B1522 100%)",
    };

    return (
        <>
            {/* Hero Section Start */}
            <section className="slider-area style-1 had-hero">
                {/* environment layers (behind content); navy gradient is the
                    load fallback beneath the cinematic hero photo, which drifts
                    in a parallax wrapper and slow-zooms for depth. */}
                <div className="had-hero-bg" style={heroBg} />
                <motion.div className="had-hero-photo-wrap" style={{ y: heroPhotoY }}>
                    <div className="had-hero-photo" />
                </motion.div>
                <div className="had-hero-overlay" />

                <h2 className="te-slider-label">HAD</h2>
                <div className="te-slider-wrapper">
                    <Slider {...settings} ref={sliderRef}>
                        {/* Slide 1 — positioning */}
                        <div className="had-hero-slide">
                            <div className="container">
                                <div className="te-slider-content had-hero-content">
                                    <span className="te-slider-short-title">HEMISPHERE DEFENSE</span>
                                    <h1 className="te-slider-title">
                                        Developing defense programs for <span>persistent,</span> distributed operations
                                    </h1>
                                    <p className="te-slider-short-desc">{SITE.description}</p>
                                    <div className="te-slider-btn-wrapper">
                                        <Link to="/programs" className="te-theme-btn">
                                            Explore Programs
                                            <i className="fa fa-solid fa-arrow-right" />
                                        </Link>
                                        <Link to="/about" className="te-theme-btn te-theme-btn-outline">
                                            About Hemisphere Defense
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Slide 2 — featured program */}
                        <div className="had-hero-slide">
                            <div className="container">
                                <div className="te-slider-content had-hero-content">
                                    <span className="te-slider-short-title">FEATURED PROGRAM — AYDLL / IDL</span>
                                    <h1 className="te-slider-title">
                                        Persistent <span>maritime awareness</span> infrastructure
                                    </h1>
                                    <p className="te-slider-short-desc">
                                        Infrastructure to support maritime domain awareness, autonomous systems
                                        operations, modular mission capabilities, and government reach-back command.
                                    </p>
                                    <div className="te-slider-btn-wrapper">
                                        <Link to="/program-details/aydll-idl" className="te-theme-btn">
                                            View Program
                                            <i className="fa fa-solid fa-arrow-right" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Slider>
                </div>
            </section>
            {/* Hero Section End */}
        </>
    );
};

export default SliderV1;
