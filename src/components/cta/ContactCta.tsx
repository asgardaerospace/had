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
                        <span className="short-title text-white">Contact &amp; Partnership</span>
                        <h2 className="had-contact-cta-title">
                            Early warning is still a national advantage. Build it with us.
                        </h2>
                        <p className="had-contact-cta-sub">
                            For program, partnership, and government-engagement inquiries, reach the appropriate
                            Hemisphere Defense channel.
                        </p>
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
