import { Link } from "react-router-dom";
import ProgramsData from '../../jsonData/programs/ProgramsData.json';
import { SITE, EXTERNAL_LINK_PROPS, isPlaceholder } from "../../config/site";

type Program = {
    id: string;
    name: string;
    category: string;
    mission: string;
    problem: string;
    approach: string;
    stage: string;
    featured: boolean;
    hasDedicatedSite: boolean;
    externalKey: string | null;
    thumb: string;
    platform?: string;
};

const externalUrlFor = (key: string | null): string | null => {
    if (!key) return null;
    const url = (SITE.external as Record<string, string>)[key];
    if (!url || isPlaceholder(url)) return null;
    return url;
};

/**
 * Scalable program portfolio. Each program lists mission, operational problem,
 * approach, and current stage, and links to a dedicated program website when
 * one is available. Adding a program = one entry in ProgramsData.json.
 */
const ProgramPortfolio = () => {
    return (
        <div className="portfolio-slider-area-page background-gray-700 te-pt-120 te-pb-120">
            <div className="container">
                {(ProgramsData as Program[]).map((p) => {
                    const externalUrl = externalUrlFor(p.externalKey);
                    const isPending = isPlaceholder(p.name);
                    return (
                        <div className="had-program-row" key={p.id}>
                            <div className="row gy-3 align-items-start">
                                <div className="col-lg-8">
                                    <span className={`had-program-cat ${isPending ? "had-placeholder" : ""}`}>
                                        {p.category}
                                    </span>
                                    <h3 className={`had-program-name ${isPending ? "had-placeholder" : ""}`}>
                                        {p.name}
                                        {p.featured && <span className="had-featured-tag">Featured</span>}
                                    </h3>
                                </div>
                                <div className="col-lg-4 text-lg-end">
                                    <span className={`had-program-stage ${isPending ? "had-placeholder" : ""}`}>
                                        Stage: {p.stage}
                                    </span>
                                </div>
                            </div>

                            <div className="row gy-4 mt-2">
                                <div className="col-md-4">
                                    <span className="had-program-field-label">Mission</span>
                                    <p className={`had-program-field-value ${isPending ? "had-placeholder" : ""}`}>{p.mission}</p>
                                </div>
                                <div className="col-md-4">
                                    <span className="had-program-field-label">Operational Problem</span>
                                    <p className={`had-program-field-value ${isPending ? "had-placeholder" : ""}`}>{p.problem}</p>
                                </div>
                                <div className="col-md-4">
                                    <span className="had-program-field-label">Program Approach</span>
                                    <p className={`had-program-field-value ${isPending ? "had-placeholder" : ""}`}>{p.approach}</p>
                                </div>
                            </div>

                            {!isPending && (
                                <div className="btn-wrapper mt-4 d-flex flex-wrap align-items-center gap-3">
                                    <Link to={`/program-details/${p.id}`} className="te-theme-btn">
                                        Program Overview
                                        <i className="fa fa-solid fa-arrow-right" />
                                    </Link>
                                    {p.hasDedicatedSite && externalUrl && (
                                        <a href={externalUrl} {...EXTERNAL_LINK_PROPS} className="te-theme-btn te-theme-btn-outline">
                                            Visit Program Site
                                            <i className="fa fa-solid fa-arrow-up-right-from-square ms-2" />
                                        </a>
                                    )}
                                    {p.hasDedicatedSite && !externalUrl && (
                                        <span className="had-external-note">
                                            <i className="fa-solid fa-link" /> Dedicated program website link pending
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProgramPortfolio;
