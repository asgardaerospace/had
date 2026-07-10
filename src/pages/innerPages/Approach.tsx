import HeaderV1 from "../../components/header/HeaderV1";
import BreadCrumb from '../../components/breadcrumb/BreadCrumb';
import ApproachWalkthrough from "../../components/philosophy/ApproachWalkthrough";
import HaiBand from "../../components/hai/HaiBand";
import FooterV1 from "../../components/footer/FooterV1";

const Approach = () => {
    return (
        <>
            <HeaderV1 />
            <BreadCrumb
                image="statement-dawn.jpg"
                eyebrow="How We Work"
                pageTitle="Approach"
                subtitle="The principles that govern how we scope, develop, and sustain programs."
                breadcrumb="Approach"
            />
            <section className="had-context-section te-pt-120 te-pb-60">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9">
                            <div className="short-title-wrapper">
                                <span className="short-title">Operating Philosophy</span>
                            </div>
                            <h2 className="had-section-heading">
                                Disciplined program development, from problem to sustained capability
                            </h2>
                            <p className="had-context-lead">
                                Hemisphere Defense approaches every program the same way: start with the operational
                                problem, preserve clear lines of authority, and advance on evidence. These principles
                                govern how programs are scoped, developed, and sustained.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <ApproachWalkthrough />
            <HaiBand />
            <FooterV1 />
        </>
    );
};

export default Approach;
