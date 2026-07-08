import { Link } from "react-router-dom";
import LeadershipData from '../../jsonData/leadership/LeadershipData.json';

type Group = { group: string; members: unknown[] };

/**
 * Compact leadership teaser for the home page. Shows the organizing structure
 * of the team and routes to the full Leadership page. Names/bios stay on the
 * Leadership page as placeholders — none are invented here.
 */
const LeadershipTeaser = () => {
    const groups = LeadershipData as Group[];

    return (
        <div className="about-us-area style-1 te-py-120">
            <div className="container">
                <div className="row gy-4 align-items-center">
                    <div className="col-lg-5">
                        <div className="te-section-title">
                            <div className="te-section-content">
                                <div className="short-title-wrapper">
                                    <span className="short-title">Leadership</span>
                                </div>
                                <h2 className="title">The team responsible for Hemisphere Defense</h2>
                                <div className="te-section-desc">
                                    <p>
                                        HAD is led across executive, program, and technical leadership, supported by
                                        strategic advisors. Profiles are published as approved information is provided.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="btn-wrapper">
                            <Link to="/leadership" className="te-theme-btn">
                                Meet the Leadership
                                <i className="fa fa-solid fa-arrow-right" />
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-6 offset-lg-1">
                        <div className="row gy-3">
                            {groups.map((g) => (
                                <div className="col-sm-6" key={g.group}>
                                    <div className="had-principle-card" style={{ padding: "24px 24px" }}>
                                        <h3 className="had-principle-title" style={{ fontSize: 20 }}>{g.group}</h3>
                                        <p className="had-principle-text" style={{ fontSize: 14 }}>
                                            {g.members.length} {g.members.length === 1 ? "role" : "roles"} — profiles pending
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeadershipTeaser;
