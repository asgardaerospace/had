import { Link } from "react-router-dom";
import HeaderV1 from "../../components/header/HeaderV1";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import DomainSectors from "../../components/domains/DomainSectors";
import HaiBand from "../../components/hai/HaiBand";
import FooterV1 from "../../components/footer/FooterV1";
import Seo from "../../components/seo/Seo";
import { breadcrumbSchema, webPageSchema } from "../../components/seo/schema";
import { metaForPath } from "../../config/seo";

/**
 * Land, air, and sea domains, promoted from a home-page anchor to a page.
 *
 * "Domains" is a top-level navigation item, but it previously resolved to
 * /#domains, a fragment on the home page. A fragment cannot rank as its own
 * result, cannot carry its own title or description, and cannot be cited
 * independently by an AI system. The home section stays as a teaser and now
 * links here.
 */
const Domains = () => {
    const meta = metaForPath("/domains");

    return (
        <>
            <Seo
                path="/domains"
                schema={[
                    webPageSchema({ path: "/domains", name: meta.title, description: meta.description }),
                    breadcrumbSchema([{ name: "Domains", path: "/domains" }]),
                ]}
            />
            <HeaderV1 />
            <BreadCrumb
                image="domain-sea.jpg"
                objectPosition="center 45%"
                eyebrow="Where We Work"
                pageTitle="Land, Air and Sea Domains"
                subtitle="Persistent sensing and support infrastructure across every domain the mission crosses."
                breadcrumb="Domains"
            />

            <section className="had-context-section te-pt-120 te-pb-60">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9">
                            <div className="short-title-wrapper">
                                <span className="short-title">Domains</span>
                            </div>
                            <h2 className="had-section-heading">
                                One problem, three operating environments
                            </h2>
                            <p className="had-context-lead">
                                Awareness has to be maintained continuously to be useful, and the cost of
                                maintaining it changes with the environment. Hemisphere Aerospace Defense
                                develops programs across ground, air, and maritime domains, drawing on the same{" "}
                                <Link to="/capabilities" className="had-inline-link">
                                    capability areas
                                </Link>{" "}
                                in each. Maritime is where the company's first program, the{" "}
                                <Link to="/programs/paul-revere-program" className="had-inline-link">
                                    Paul Revere Program
                                </Link>
                                , is concentrated.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <DomainSectors />
            <HaiBand />
            <FooterV1 />
        </>
    );
};

export default Domains;
