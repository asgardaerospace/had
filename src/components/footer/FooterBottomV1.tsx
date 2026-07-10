import { Link } from "react-router-dom";
import { SITE } from "../../config/site";

const FooterBottomV1 = () => {
    return (
        <>
            <div className="te-footer-bottom-wrapper">
                <div className="te-copyright-text">
                    <p>
                        &copy; {new Date().getFullYear()} {SITE.name} ({SITE.shortName}). All rights reserved.
                    </p>
                    <p className="had-copyright-hai">
                        A {SITE.parent.name} ({SITE.parent.shortName}) company.
                    </p>
                </div>
                <div className="te-footer-bottom-menu">
                    <ul>
                        <li><Link to="/privacy">Privacy Policy</Link></li>
                        <li><Link to="/terms">Terms of Use</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default FooterBottomV1;
