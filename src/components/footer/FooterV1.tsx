import { Link } from "react-router-dom";
import HeaderLogo from '../header/HeaderLogo';
import FooterBottomV1 from './FooterBottomV1';
import SocialShare from "../slider/SocialShare";
import { SITE, EXTERNAL_LINK_PROPS, isPlaceholder } from "../../config/site";

const FooterV1 = () => {
    const haiReady = !isPlaceholder(SITE.external.hai);
    const aydllReady = !isPlaceholder(SITE.external.aydllIdl);
    const { generalEmail, phone, phoneDisplay, address } = SITE.contact;

    return (
        <>
            <footer className="footer style-1 background-gray-700">
                <div className="te-footer-sec">
                    <div className="container">
                        <div className="row gy-5">
                            {/* Brand */}
                            <div className="col-xl-3 col-lg-6 col-md-6 te-footer-widget-wrapper">
                                <div className="te-footer-widget">
                                    <div className="te-footer-widget-info">
                                        <div className="te-footer-logo">
                                            <HeaderLogo />
                                        </div>
                                        <p className="mt-3">
                                            Hemisphere Defense (HAD) develops and advances defense-oriented programs
                                            within the Hemisphere Aerospace Investments structure.
                                        </p>
                                    </div>
                                    <div className="te-social-profile">
                                        <SocialShare />
                                    </div>
                                </div>
                            </div>

                            {/* Contact */}
                            <div className="col-xl-3 col-lg-6 col-md-6 te-footer-widget-wrapper">
                                <div className="te-footer-widget">
                                    <h3 className="te-footer-widget-title">Contact</h3>
                                    <div className="te-footer-widget-contact">
                                        <div className="footer-contact">
                                            <ul>
                                                <li>
                                                    <div className="contact-icon"><i className="fa-solid fa-envelope" /></div>
                                                    <div className="contact-text">
                                                        {isPlaceholder(generalEmail)
                                                            ? <span className="had-placeholder">{generalEmail}</span>
                                                            : <Link to={`mailto:${generalEmail}`}>{generalEmail}</Link>}
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="contact-icon"><i className="fa-solid fa-phone" /></div>
                                                    <div className="contact-text">
                                                        {isPlaceholder(phone)
                                                            ? <span className="had-placeholder">{phone}</span>
                                                            : <Link to={`tel:${phone}`}>{phoneDisplay}</Link>}
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="contact-icon"><i className="fa-solid fa-location-dot" /></div>
                                                    <div className="contact-text">
                                                        {isPlaceholder(address)
                                                            ? <span className="had-placeholder">{address}</span>
                                                            : <span>{address}</span>}
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className="contact-icon"><i className="fa-solid fa-shield-halved" /></div>
                                                    <div className="contact-text">
                                                        <Link to="/contact">All inquiry channels</Link>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Quick links */}
                            <div className="col-xl-3 col-lg-6 col-md-6 te-footer-widget-wrapper">
                                <div className="te-footer-widget te_widget_nav_menu">
                                    <h3 className="te-footer-widget-title">Explore</h3>
                                    <ul className="no-icon">
                                        <li><Link to="/#domains">Domains</Link></li>
                                        <li><Link to="/programs">Programs</Link></li>
                                        <li><Link to="/program-details/aydll-idl">Paul Revere Program</Link></li>
                                        <li><Link to="/approach">Approach</Link></li>
                                        <li><Link to="/leadership">Team</Link></li>
                                        <li><Link to="/contact">Contact</Link></li>
                                    </ul>
                                </div>
                            </div>

                            {/* Hemisphere / programs */}
                            <div className="col-xl-3 col-lg-6 col-md-6 te-footer-widget-wrapper">
                                <div className="te-footer-widget te_widget_nav_menu">
                                    <h3 className="te-footer-widget-title">Hemisphere</h3>
                                    <ul className="no-icon">
                                        <li>
                                            {haiReady ? (
                                                <a href={SITE.external.hai} {...EXTERNAL_LINK_PROPS}>
                                                    Hemisphere Aerospace Investments (HAI)
                                                    <i className="fa fa-solid fa-arrow-up-right-from-square ms-2" />
                                                </a>
                                            ) : (
                                                <span className="had-placeholder">HAI website (link pending)</span>
                                            )}
                                        </li>
                                        <li>
                                            {aydllReady ? (
                                                <a href={SITE.external.aydllIdl} {...EXTERNAL_LINK_PROPS}>
                                                    Paul Revere Program Site
                                                    <i className="fa fa-solid fa-arrow-up-right-from-square ms-2" />
                                                </a>
                                            ) : (
                                                <Link to="/program-details/aydll-idl">Paul Revere Program</Link>
                                            )}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <FooterBottomV1 />
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default FooterV1;
