import HeaderV1 from "../../components/header/HeaderV1";
import BreadCrumb from '../../components/breadcrumb/BreadCrumb';
import AboutV1 from "../../components/about/AboutV1";
import CapabilityAreas from "../../components/capability/CapabilityAreas";
import HaiBand from "../../components/hai/HaiBand";
import FooterV1 from "../../components/footer/FooterV1";

const About = () => {
    return (
        <>
            <HeaderV1 />
            <BreadCrumb pageTitle="About Hemisphere Defense" breadcrumb="About" />
            <AboutV1 full style="background-gray-700 te-pt-120 te-pb-120" />
            <section className="had-context-section te-pt-120 te-pb-60">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="short-title-wrapper">
                                <span className="short-title">Why HAD Exists</span>
                            </div>
                            <h2 className="had-section-heading">
                                A defense environment that increasingly requires persistent, distributed capability
                            </h2>
                            <p className="had-context-lead">
                                Government missions increasingly depend on awareness that is maintained continuously,
                                infrastructure that is distributed rather than concentrated, and autonomous systems that
                                extend reach — all delivered at a lower manpower burden and sustained over a program's
                                life. Hemisphere Defense is built to identify these operational gaps and develop
                                structured defense programs around them.
                            </p>
                            <div className="had-authority-note" style={{ maxWidth: 760 }}>
                                Hemisphere Defense does not replace military services, government mission owners, or
                                prime contractors, and does not hold government authority. HAD develops, manages,
                                operates, and sustains the programs that support the mission.
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <CapabilityAreas style="te-pb-120" />
            <HaiBand />
            <FooterV1 />
        </>
    );
};

export default About;
