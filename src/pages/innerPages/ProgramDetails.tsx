import { useParams, Link } from "react-router-dom";
import HeaderV1 from "../../components/header/HeaderV1";
import BreadCrumb from '../../components/breadcrumb/BreadCrumb';
import HaiBand from "../../components/hai/HaiBand";
import FooterV1 from "../../components/footer/FooterV1";
import ProgramsData from '../../jsonData/programs/ProgramsData.json';
import { SITE, EXTERNAL_LINK_PROPS, isPlaceholder } from "../../config/site";
import Seo from "../../components/seo/Seo";
import { breadcrumbSchema, programSchema, webPageSchema } from "../../components/seo/schema";
import { metaForPath } from "../../config/seo";

type Program = {
    id: string; slug: string; name: string; category: string; mission: string;
    problem: string; approach: string; stage: string; featured: boolean;
    hasDedicatedSite: boolean; externalKey: string | null; thumb: string;
    platform?: string;
};

/** Flagship (AYDLL) program imagery: full-bleed hero + capability gallery. Boundary-safe. */
const AYDLL_GALLERY = [
    { src: "program-network.jpg", cap: "Distributed offshore infrastructure", alt: "Concept rendering: a distributed network of AYDLL platform nodes providing persistent coverage across the maritime domain." },
    { src: "program-air.jpg", cap: "Autonomous systems launch & recovery", alt: "Concept rendering: an autonomous tiltrotor aircraft launching from the AYDLL platform flight deck." },
    { src: "program-launch.jpg", cap: "Multi-domain uncrewed systems", alt: "Concept rendering: an autonomous tiltrotor and surface vessel staged on the AYDLL platform for launch and recovery." },
];

const ProgramDetails = () => {
    const { slug } = useParams();
    const program = (ProgramsData as Program[]).find((p) => p.slug === slug);

    const externalUrl =
        program?.externalKey
            ? (SITE.external as Record<string, string>)[program.externalKey]
            : undefined;
    const externalReady = !!externalUrl && !isPlaceholder(externalUrl);
    const isAydll = program?.slug === "paul-revere-program";
    const pending = program ? isPlaceholder(program.name) : false;

    const path = program ? `/programs/${program.slug}` : "/404";
    const meta = metaForPath(path);

    return (
        <>
            <Seo
                path={path}
                schema={program ? [
                    webPageSchema({ path, name: meta.title, description: meta.description }),
                    breadcrumbSchema([
                        { name: "Programs", path: "/programs" },
                        { name: program.name, path },
                    ]),
                    // Names Hemisphere Aerospace Defense as the provider, so the
                    // program and the company resolve as one connected entity pair
                    // rather than two unrelated names.
                    programSchema({
                        name: program.name,
                        slug: program.slug,
                        serviceType: program.category,
                        description: program.mission,
                    }),
                ] : []}
            />
            <HeaderV1 />
            <BreadCrumb
                image={isAydll ? "program-node-hero.jpg" : "program-network.jpg"}
                objectPosition="center 45%"
                eyebrow={isAydll ? "Flagship Program" : "Program"}
                pageTitle={program ? program.name : "Program"}
                subtitle={isAydll ? SITE.flagship.subtitle : undefined}
                breadcrumb="Program"
            />

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
                        <>
                        <div className="row gy-5">
                            <div className="col-lg-8">
                                <span className={`had-program-cat ${pending ? "had-placeholder" : ""}`}>{program.category}</span>
                                <h2 className={`had-section-heading ${pending ? "had-placeholder" : ""}`}>{program.name}</h2>

                                {isAydll ? (
                                    <>
                                        {/*
                                          * Explicit entity relationship. Stated in plain language rather
                                          * than left for a crawler to infer, so that search and AI systems
                                          * can answer "who develops the Paul Revere Program?" from this
                                          * page alone. Mirrored in Service schema (provider) and in
                                          * config/entityAnswers.ts.
                                          */}
                                        <p className="had-context-lead" style={{ marginBottom: 16 }}>
                                            The <strong>Paul Revere Program</strong> is developed by{" "}
                                            <strong>Hemisphere Aerospace Defense</strong> and is built around the{" "}
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
                                            and monitoring on high-value crewed assets. It is persistent infrastructure,
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
                                        {/*
                                          * Previously this said full program detail was maintained on a
                                          * dedicated Paul Revere Program website. As of this build the
                                          * linked AYDLL site describes the platform and does not carry
                                          * program-named detail, so the claim was inaccurate. Corrected to
                                          * describe what each property actually covers. Flagged for
                                          * management: see the cross-property consistency matrix.
                                          */}
                                        <p className="had-context-lead" style={{ marginTop: 24 }}>
                                            This page is the authoritative corporate description of the program.
                                            The AYDLL platform site covers the platform the program is built
                                            around.
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
                                            Visit the AYDLL Platform Site
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
                        {isAydll && (
                            <div className="had-program-gallery-wrap">
                                <span className="had-program-gallery-eyebrow">Platform &amp; Operations</span>
                                <div className="had-program-gallery">
                                    {AYDLL_GALLERY.map((g) => (
                                        <figure className="had-program-gallery-item" key={g.src}>
                                            <img src={`/images/had/${g.src}`} alt={g.alt} loading="lazy" />
                                            <figcaption className="had-program-gallery-cap">{g.cap}</figcaption>
                                        </figure>
                                    ))}
                                </div>
                            </div>
                        )}
                        </>
                    )}
                </div>
            </section>

            <HaiBand />
            <FooterV1 />
        </>
    );
};

export default ProgramDetails;
