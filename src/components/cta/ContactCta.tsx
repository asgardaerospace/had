import { Link } from "react-router-dom";

/**
 * Closing contact prompt. Restrained, single call to action toward the
 * contact pathways. No sales/quote framing.
 */
const ContactCta = () => {
    return (
        <div className="had-contact-cta te-py-120">
            <div className="container">
                <div className="had-contact-cta-inner">
                    <div>
                        <span className="short-title text-white">Contact</span>
                        <h2 className="had-contact-cta-title">
                            Direct your inquiry to the appropriate channel
                        </h2>
                    </div>
                    <Link to="/contact" className="te-theme-btn">
                        Contact Hemisphere Defense
                        <i className="fa fa-solid fa-arrow-right" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ContactCta;
