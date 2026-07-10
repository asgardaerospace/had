import { Link } from "react-router-dom";

type AboutV1Props = {
    style?: string;
    full?: boolean;
};

/**
 * Mission block. Used as a teaser on the home page and, with `full`, as the
 * primary narrative on the About / Mission page.
 * No fabricated experience counters, customers, or contracts.
 */
const AboutV1 = ({ style = "", full = false }: AboutV1Props) => {
    return (
        <>
            <div className={`about-us-area style-1 ${style}`}>
                <div className="container">
                    <div className="row gy-4">
                        <div className="col-lg-6 wow fadeInLeft" data-wow-delay="100ms" data-wow-duration="1500ms">
                            <div className="had-mission-visual had-mv-photo had-mv-mission">
                                <span className="had-mission-visual-eyebrow">Hemisphere Defense</span>
                                <p className="had-mission-visual-line">
                                    From the first watchmen to the modern warfighter — the mission endures.
                                </p>
                            </div>
                        </div>
                        <div
                            className="col-lg-5 offset-xl-1 align-self-center wow fadeInRight"
                            data-wow-delay="200ms"
                            data-wow-duration="1500ms"
                        >
                            <div className="te-about-info-card">
                                <div className="te-about-info-content">
                                    <div className="te-section-title">
                                        <div className="te-section-content">
                                            <div className="short-title-wrapper">
                                                <span className="short-title">About</span>
                                            </div>
                                            <h2 className="title">
                                                A defense-programs company built for sustained missions
                                            </h2>
                                            <div className="te-section-desc">
                                                <p>
                                                    Hemisphere Defense (HAD) is the defense-programs company within
                                                    Hemisphere Aerospace Investments. Government missions increasingly
                                                    require persistent awareness, distributed infrastructure, and
                                                    autonomous-systems support delivered at a lower manpower burden and
                                                    sustained over time. HAD is built to identify those operational gaps
                                                    and develop disciplined programs around them.
                                                </p>
                                                {full && (
                                                    <p>
                                                        We develop, manage, operate, and sustain the programs that support
                                                        the mission. We approach each program with measurable criteria and
                                                        decision gates, so capability advances on evidence rather than
                                                        demonstration.
                                                    </p>
                                                )}
                                            </div>
                                            <div className="had-authority-note">
                                                Hemisphere Defense does not replace military services, government mission
                                                owners, or prime contractors, and does not hold government authority.
                                            </div>
                                        </div>
                                    </div>
                                    {!full && (
                                        <div className="btn-wrapper">
                                            <Link to="/about" className="te-theme-btn">
                                                Read the Mission
                                                <i className="fa fa-solid fa-arrow-right" />
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutV1;
