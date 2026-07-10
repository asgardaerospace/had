import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import LeadershipData from '../../jsonData/leadership/LeadershipData.json';

type Group = { group: string; members: { name: string }[] };

/**
 * Team preview for the home page. Shows the four leadership categories and their
 * members over a mission-operations image and routes to the full Team page. No
 * content is invented here.
 */
const LeadershipTeaser = () => {
    const groups = LeadershipData as Group[];

    return (
        <section className="about-us-area style-1 te-py-120 had-team" id="team">
            <div className="container">
                <div className="row gy-5 align-items-center">
                    <motion.div
                        className="col-lg-6"
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="had-team-media">
                            <img
                                src="/images/had/team-ops.jpg"
                                alt="A small mission-operations team at consoles before a wall display tracking the maritime approaches."
                                loading="lazy"
                            />
                            <span className="had-team-media-caption">
                                Disciplined operations in support of government reach-back
                            </span>
                        </div>
                    </motion.div>

                    <motion.div
                        className="col-lg-6"
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="te-section-title">
                            <div className="te-section-content">
                                <div className="short-title-wrapper">
                                    <span className="short-title">Team</span>
                                </div>
                                <h2 className="title">The people who keep the watch</h2>
                                <div className="te-section-desc">
                                    <p>
                                        HAD is led across executive, program, technical, and strategic &amp; corporate
                                        leadership.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="row gy-3">
                            {groups.map((g) => (
                                <div className="col-sm-6" key={g.group}>
                                    <div className="had-team-chip">
                                        <h3 className="had-team-chip-title">{g.group}</h3>
                                        <p className="had-team-chip-note">
                                            {g.members.map((m) => m.name).join(" · ")}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="btn-wrapper mt-4">
                            <Link to="/leadership" className="te-theme-btn">
                                Meet the Team
                                <i className="fa fa-solid fa-arrow-right" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default LeadershipTeaser;
