import { Link } from "react-router-dom";
import HeaderV1 from "../../components/header/HeaderV1";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import FooterV1 from "../../components/footer/FooterV1";
import Seo from "../../components/seo/Seo";

/**
 * 404. Previously the site had no catch-all route: an unknown URL rendered the
 * header and footer with nothing between them and still returned HTTP 200,
 * which search engines index as a soft 404. This page carries an explicit
 * noindex (set from the /404 entry in config/seo.ts) and routes the visitor
 * back into the real site rather than dead-ending them.
 */
const NotFound = () => {
    return (
        <>
            <Seo path="/404" />
            <HeaderV1 />
            <BreadCrumb
                eyebrow="404"
                pageTitle="Page not found"
                subtitle="That page does not exist, or it has moved."
                breadcrumb="Not found"
            />
            <section className="had-context-section te-pt-120 te-pb-120">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <p className="had-context-lead">
                                Some pages moved to clearer addresses. Program pages now live under{" "}
                                <code>/programs/</code> and leadership profiles under{" "}
                                <code>/leadership/</code> with the person's name. The links below cover
                                everything on the site.
                            </p>
                            <ul className="had-contact-list" style={{ marginTop: 28 }}>
                                <li>
                                    <span className="had-contact-list-label">Company</span>
                                    <Link to="/about">About Hemisphere Aerospace Defense</Link>
                                </li>
                                <li>
                                    <span className="had-contact-list-label">What we build</span>
                                    <Link to="/capabilities">Capability areas</Link>
                                </li>
                                <li>
                                    <span className="had-contact-list-label">Programs</span>
                                    <Link to="/programs">Program portfolio</Link>
                                </li>
                                <li>
                                    <span className="had-contact-list-label">Flagship program</span>
                                    <Link to="/programs/paul-revere-program">Paul Revere Program</Link>
                                </li>
                                <li>
                                    <span className="had-contact-list-label">People</span>
                                    <Link to="/leadership">Leadership and team</Link>
                                </li>
                                <li>
                                    <span className="had-contact-list-label">Contracting</span>
                                    <Link to="/certifications">Certifications and registrations</Link>
                                </li>
                                <li>
                                    <span className="had-contact-list-label">Get in touch</span>
                                    <Link to="/contact">Contact</Link>
                                </li>
                            </ul>
                            <div className="btn-wrapper mt-4">
                                <Link to="/" className="te-theme-btn">
                                    Return home
                                    <i className="fa fa-solid fa-arrow-right" />
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

export default NotFound;
