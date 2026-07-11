import HeaderV1 from "../../components/header/HeaderV1";
import BreadCrumb from '../../components/breadcrumb/BreadCrumb';
import LeadershipGrid from "../../components/leadership/LeadershipGrid";
import HaiBand from "../../components/hai/HaiBand";
import FooterV1 from "../../components/footer/FooterV1";

const Leadership = () => {
    return (
        <>
            <HeaderV1 />
            <BreadCrumb
                image="team-ops.jpg"
                objectPosition="center 40%"
                eyebrow="Our People"
                pageTitle="Leadership & Team"
                subtitle="Executive, program, and technical leadership."
                breadcrumb="Leadership"
            />
            <section className="had-context-section te-pt-120 te-pb-60">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9">
                            <div className="short-title-wrapper">
                                <span className="short-title">Leadership & Team</span>
                            </div>
                            <h2 className="had-section-heading">
                                The people responsible for Hemisphere Defense
                            </h2>
                            <p className="had-context-lead">
                                Hemisphere Defense is led across three areas: executive, program, and
                                technical leadership.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <LeadershipGrid />
            <HaiBand />
            <FooterV1 />
        </>
    );
};

export default Leadership;
