import { Link } from "react-router-dom";
import HeaderV1 from "../../components/header/HeaderV1";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import CapabilityAreas from "../../components/capability/CapabilityAreas";
import HaiBand from "../../components/hai/HaiBand";
import ContactCta from "../../components/cta/ContactCta";
import FooterV1 from "../../components/footer/FooterV1";
import Seo from "../../components/seo/Seo";
import { breadcrumbSchema, webPageSchema } from "../../components/seo/schema";
import { metaForPath } from "../../config/seo";

/**
 * Capability areas, promoted to a top-level page.
 *
 * These six areas previously existed only as a card grid two thirds of the way
 * down the About page, which was itself unlinked from anywhere on the site. As
 * the surfaces a program office or prime would actually search for, they need
 * their own URL, their own title, and their own place in the internal link
 * graph.
 *
 * Claim discipline: each area describes how Hemisphere Aerospace Defense
 * structures programs, not a delivered system, a fielded capability, or a
 * customer engagement. The closing note states program maturity explicitly so
 * a reader cannot mistake an approach for a deployment.
 */
const Capabilities = () => {
    const meta = metaForPath("/capabilities");

    return (
        <>
            <Seo
                path="/capabilities"
                schema={[
                    webPageSchema({ path: "/capabilities", name: meta.title, description: meta.description }),
                    breadcrumbSchema([{ name: "Capabilities", path: "/capabilities" }]),
                ]}
            />
            <HeaderV1 />
            <BreadCrumb
                image="cap-awareness.jpg"
                objectPosition="center 40%"
                eyebrow="What We Build"
                pageTitle="Capability Areas"
                subtitle="The six areas Hemisphere Aerospace Defense structures its programs around."
                breadcrumb="Capabilities"
            />

            <section className="had-context-section te-pt-120 te-pb-60">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9">
                            <div className="short-title-wrapper">
                                <span className="short-title">Capability Areas</span>
                            </div>
                            <h2 className="had-section-heading">
                                Six areas that define how we scope and sustain defense programs
                            </h2>
                            <p className="had-context-lead">
                                Hemisphere Aerospace Defense develops programs around a consistent set of
                                capability areas. Each one describes how a program is structured rather than a
                                product line: what the program has to sustain, where it has to operate, what it
                                has to support, and how it has to be maintained over its life. The{" "}
                                <Link to="/programs/paul-revere-program" className="had-inline-link">
                                    Paul Revere Program
                                </Link>{" "}
                                is the first program to bring these areas together in one effort.
                            </p>
                            <div className="had-authority-note" style={{ maxWidth: 760 }}>
                                These are capability areas the company develops programs against. They are not
                                claims of fielded systems, delivered capability, or existing government
                                engagements. Program maturity is stated on each program page.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <CapabilityAreas style="te-pt-60 te-pb-60" />

            <section className="had-context-section te-pb-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <h3 className="had-leader-group-title">Where these areas apply</h3>
                            <p className="had-context-lead">
                                Capability areas cut across the three domains the company works in. Ground,
                                air, and maritime programs draw on the same underlying disciplines and differ
                                in environment, endurance, and support burden. See{" "}
                                <Link to="/domains" className="had-inline-link">
                                    land, air, and sea domains
                                </Link>{" "}
                                for how each is addressed, and{" "}
                                <Link to="/approach" className="had-inline-link">
                                    our approach
                                </Link>{" "}
                                for how a capability area becomes a scoped program.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <ContactCta />
            <HaiBand />
            <FooterV1 />
        </>
    );
};

export default Capabilities;
