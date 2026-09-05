import { useParams, Link } from "react-router-dom";
import HeaderV1 from "../../components/header/HeaderV1";
import BreadCrumb from '../../components/breadcrumb/BreadCrumb';
import FooterV1 from "../../components/footer/FooterV1";
import LeadershipData from '../../jsonData/leadership/LeadershipData.json';
import Seo from "../../components/seo/Seo";
import { breadcrumbSchema, personSchema, webPageSchema } from "../../components/seo/schema";
import { metaForPath } from "../../config/seo";
import { alumniFromBio } from "../../config/alumni";

type Member = { id: string; slug: string; name: string; title: string; bio: string; photo: string | null };
type Group = { group: string; members: Member[] };

/**
 * Leadership detail page. Renders approved fields for the selected leader; no
 * biography, service history, clearances, or affiliations are invented here.
 */
const LeadershipDetails = () => {
    const { slug } = useParams();
    const all = (LeadershipData as Group[]).flatMap((g) =>
        g.members.map((m) => ({ ...m, group: g.group }))
    );
    const member = all.find((m) => m.slug === slug);

    const path = member ? `/leadership/${member.slug}` : "/404";
    const meta = metaForPath(path);

    return (
        <>
            <Seo
                path={path}
                schema={member ? [
                    webPageSchema({ path, name: meta.title, description: meta.description }),
                    breadcrumbSchema([
                        { name: "Leadership", path: "/leadership" },
                        { name: member.name, path },
                    ]),
                    // Person nodes bind named, checkable leadership to the company.
                    // Only fields the published biography supports: no honorifics,
                    // awards, clearances, or affiliations are added here.
                    personSchema({
                        name: member.name,
                        title: member.title,
                        slug: member.slug,
                        alumniOf: alumniFromBio(member.bio),
                    }),
                ] : []}
            />
            <HeaderV1 />
            <BreadCrumb
                image="team-ops.jpg"
                objectPosition="center 40%"
                eyebrow="Leadership & Team"
                pageTitle={member ? member.name : "Leadership"}
                subtitle={member ? member.title : undefined}
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
                            {/* The name is now the page H1, set on the hero above, so this
                              * heading labels the section instead of repeating it. */}
                            <h2 className="had-section-heading">
                                {member ? "Background" : "Leader not found"}
                            </h2>
                            <p className="had-leader-title">{member ? member.title : "[TITLE]"}</p>
                            {(member ? member.bio.split("\n\n") : ["[SHORT BIO: to be provided]"]).map((para, i) => (
                                <p key={i} className={`had-context-lead ${member ? "" : "had-placeholder"}`}>
                                    {para}
                                </p>
                            ))}
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
