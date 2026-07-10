import { useParams, Link } from "react-router-dom";
import HeaderV1 from "../../components/header/HeaderV1";
import BreadCrumb from '../../components/breadcrumb/BreadCrumb';
import HaiBand from "../../components/hai/HaiBand";
import FooterV1 from "../../components/footer/FooterV1";
import ProgramsData from '../../jsonData/programs/ProgramsData.json';
import { SITE, EXTERNAL_LINK_PROPS, isPlaceholder } from "../../config/site";

type Program = {
    id: string; name: string; category: string; mission: string;
    problem: string; approach: string; stage: string; featured: boolean;
    hasDedicatedSite: boolean; externalKey: string | null; thumb: string;
    platform?: string;
};

const ProgramDetails = () => {
    const { id } = useParams();
    const program = (ProgramsData as Program[]).find((p) => p.id === id);

    const externalUrl =
        program?.externalKey
            ? (SITE.external as Record<string, string>)[program.externalKey]
            : undefined;
    const externalReady = !!externalUrl && !isPlaceholder(externalUrl);
    const isAydll = program?.id === "aydll-idl";
    const pending = program ? isPlaceholder(program.name) : false;

    return (
        <>
            <HeaderV1 />
            <BreadCrumb pageTitle={program ? program.name : "Program"} breadcrumb="Program" />

            <section className="had-context-section te-pt-120 te-pb-120">
                <div className="container">
                    {!program ? (
                        <div className="row">
                            <div className="col-lg-8">
                                <h2 className="had-section-heading">Program not found</h2>
                                <p className="had-context-lead">
                                    This program reference is not available. Return to the{" "}
                                    <Link to="/programs" className="had-inline-link">program portfolio</Link>.
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="row gy-5">
                            <div className="col-lg-8">
                                <span className={`had-program-cat ${pending ? "had-placeholder" : ""}`}>{program.category}</span>
                                <h2 className={`had-section-heading ${pending ? "had-placeholder" : ""}`}>{program.name}</h2>

                                {isAydll ? (
                                    <>
                                        <p className="had-context-lead" style={{ marginBottom: 16 }}>
                                            The public-facing <strong>Paul Revere Program</strong> is built around the{" "}
                                            <strong>AYDLL</strong> platform. It carries forward a simple American idea:
                                            warning before arrival.
                                        </p>
                                        <div className="had-canonical-callout">
                                            Persistent maritime awareness infrastructure designed to support maritime
                                            domain awareness, autonomous systems operations, modular mission
                                            capabilities, and government reach-back command.
                                        </div>
                                        <p className="had-context-lead">
                                            The program exists to reduce the burden of continuous, low-intensity sensing
                                            and monitoring on high-value crewed assets. It is persistent infrastructure —
                                            not a ship, a weapons platform, or a replacement for crewed cutters,
                                            destroyers, or aircraft.
                                        </p>
                                        <div className="had-authority-note">
                                            Government personnel retain command authority, mission authority,
                                            intelligence authority, response authorization, engagement authority, and
                                            weapons-release authority where applicable. The infrastructure operator
                                            launches, recovers, hosts, operates, maintains, and sustains the
                                            infrastructure.
                                        </div>
                                        <p className="had-context-lead" style={{ marginTop: 24 }}>
                                            This is a concise corporate-level introduction. Full program detail is
                                            maintained on the dedicated Paul Revere Program website.
                                        </p>
                                    </>
                                ) : (
                                    <>
                                        <p className={`had-context-lead ${pending ? "had-placeholder" : ""}`}>{program.mission}</p>
                                        <div className="row gy-4 mt-2">
                                            <div className="col-md-6">
                                                <span className="had-program-field-label">Operational Problem</span>
                                                <p className={`had-program-field-value ${pending ? "had-placeholder" : ""}`}>{program.problem}</p>
                                            </div>
                                            <div className="col-md-6">
                                                <span className="had-program-field-label">Program Approach</span>
                                                <p className={`had-program-field-value ${pending ? "had-placeholder" : ""}`}>{program.approach}</p>
                                            </div>
                                        </div>
                                    </>
                                )}

                                <div className="btn-wrapper mt-4 d-flex flex-wrap align-items-center gap-3">
                                    {program.hasDedicatedSite && externalReady && (
                                        <a href={externalUrl} {...EXTERNAL_LINK_PROPS} className="te-theme-btn">
                                            Visit the {program.name} Site
                                            <i className="fa fa-solid fa-arrow-up-right-from-square ms-2" />
                                        </a>
                                    )}
                                    {program.hasDedicatedSite && !externalReady && (
                                        <span className="had-external-note">
                                            <i className="fa-solid fa-link" /> Dedicated program website link pending
                                        </span>
                                    )}
                                    <Link to="/programs" className="te-theme-btn te-theme-btn-outline">
                                        All Programs
                                    </Link>
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="had-program-aside">
                                    <span className="had-program-field-label">Current Stage</span>
                                    <p className={`had-program-field-value ${pending ? "had-placeholder" : ""}`} style={{ marginBottom: 22 }}>
                                        {program.stage}
                                    </p>
                                    <span className="had-program-field-label">Capability Area</span>
                                    <p className={`had-program-field-value ${pending ? "had-placeholder" : ""}`}>{program.category}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <HaiBand />
            <FooterV1 />
        </>
    );
};

export default ProgramDetails;
