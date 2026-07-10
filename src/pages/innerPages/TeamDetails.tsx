import { useParams, Link } from "react-router-dom";
import HeaderV1 from "../../components/header/HeaderV1";
import BreadCrumb from '../../components/breadcrumb/BreadCrumb';
import FooterV1 from "../../components/footer/FooterV1";
import LeadershipData from '../../jsonData/leadership/LeadershipData.json';

type Member = { id: string; name: string; title: string; bio: string; photo: string | null };
type Group = { group: string; members: Member[] };

/**
 * Leadership detail page. Renders approved fields for the selected leader; no
 * biography, service history, clearances, or affiliations are invented here.
 */
const LeadershipDetails = () => {
    const { id } = useParams();
    const all = (LeadershipData as Group[]).flatMap((g) =>
        g.members.map((m) => ({ ...m, group: g.group }))
    );
    const member = all.find((m) => m.id === id);

    return (
        <>
            <HeaderV1 />
            <BreadCrumb
                image="team-ops.jpg"
                objectPosition="center 40%"
                eyebrow="Leadership & Team"
                pageTitle="Leadership"
                breadcrumb="Leadership"
            />
            <section className="had-context-section te-pt-120 te-pb-120">
                <div className="container">
                    <div className="row gy-4">
                        <div className="col-lg-4">
                            <div
                                className="had-leader-photo"
                                role="img"
                                aria-label={member ? member.name : "Portrait placeholder"}
                                style={{ backgroundImage: `url(${member?.photo || "/images/had/leader-placeholder.jpg"})` }}
                            />
                        </div>
                        <div className="col-lg-8">
                            <h2 className={`had-section-heading ${member ? "" : "had-placeholder"}`}>
                                {member ? member.name : "[NAME]"}
                            </h2>
                            <p className="had-leader-title">{member ? member.title : "[TITLE]"}</p>
                            <p className={`had-context-lead ${member ? "" : "had-placeholder"}`}>
                                {member ? member.bio : "[SHORT BIO: to be provided]"}
                            </p>
                            <div className="btn-wrapper mt-4">
                                <Link to="/leadership" className="te-theme-btn te-theme-btn-outline">
                                    All Leadership
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <FooterV1 />
        </>
    );
};

export default LeadershipDetails;
