import HeaderV1 from "../../components/header/HeaderV1";
import BreadCrumb from '../../components/breadcrumb/BreadCrumb';
import ProgramPortfolio from "../../components/program/ProgramPortfolio";
import HaiBand from "../../components/hai/HaiBand";
import FooterV1 from "../../components/footer/FooterV1";
import Seo from "../../components/seo/Seo";
import { breadcrumbSchema, webPageSchema } from "../../components/seo/schema";
import { metaForPath } from "../../config/seo";

const Programs = () => {
    const meta = metaForPath("/programs");
    return (
        <>
            <Seo
                path="/programs"
                schema={[
                    webPageSchema({ path: "/programs", name: meta.title, description: meta.description }),
                    breadcrumbSchema([{ name: "Programs", path: "/programs" }]),
                ]}
            />
            <HeaderV1 />
            <BreadCrumb
                image="colonial-boston.jpg"
                eyebrow="What We Build"
                pageTitle="Programs"
                subtitle="Mission-oriented programs, each scoped to a specific operational problem."
                breadcrumb="Programs"
            />
            <section className="had-context-section te-pt-120 te-pb-60">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9">
                            <div className="short-title-wrapper">
                                <span className="short-title">Program Portfolio</span>
                            </div>
                            <h2 className="had-section-heading">
                                Defense programs HAD develops, manages, operates, or sponsors
                            </h2>
                            <p className="had-context-lead">
                                Hemisphere Defense advances a focused portfolio of defense-oriented programs. Each
                                program is scoped around a specific operational problem and matures through defined
                                stages. Where a program has a dedicated website, this page routes you to it.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <ProgramPortfolio />
            <HaiBand />
            <FooterV1 />
        </>
    );
};

export default Programs;
