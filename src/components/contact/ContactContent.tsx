import ContactForm from '../form/ContactForm';
import InquiryPathwaysGrid from './InquiryPathwaysGrid';
import { SITE, isPlaceholder } from "../../config/site";

const ContactContent = () => {
    const { generalEmail, phone, address } = SITE.contact;

    return (
        <>
            <div className="contact-info-area background-gray-700 te-pt-120 te-pb-60">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9">
                            <div className="short-title-wrapper">
                                <span className="short-title">Contact</span>
                            </div>
                            <h2 className="had-section-heading">Direct your inquiry to the appropriate channel</h2>
                            <p className="had-context-lead">
                                Hemisphere Defense routes inquiries by type. Select the channel that best matches your
                                inquiry, or use the general form below.
                            </p>
                        </div>
                    </div>
                    <div className="mt-5">
                        <InquiryPathwaysGrid />
                    </div>
                </div>
            </div>

            <div className="contact-map-area background-gray-700 te-pb-120">
                <div className="container">
                    <div className="row gy-5">
                        <div className="col-lg-5">
                            <h3 className="had-leader-group-title" style={{ marginBottom: 24 }}>General Contact</h3>
                            <ul className="had-contact-list">
                                <li>
                                    <span className="had-contact-list-label">Email</span>
                                    {isPlaceholder(generalEmail)
                                        ? <span className="had-placeholder">{generalEmail}</span>
                                        : <a href={`mailto:${generalEmail}`}>{generalEmail}</a>}
                                </li>
                                <li>
                                    <span className="had-contact-list-label">Phone</span>
                                    {isPlaceholder(phone)
                                        ? <span className="had-placeholder">{phone}</span>
                                        : <a href={`tel:${phone}`}>{phone}</a>}
                                </li>
                                <li>
                                    <span className="had-contact-list-label">Address</span>
                                    <span className={isPlaceholder(address) ? "had-placeholder" : ""}>{address}</span>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-7">
                            <div className="te-post-comments-form style-3 mt-0">
                                <div className="comment-respond">
                                    <div className="te-section-title">
                                        <div className="te-section-content">
                                            <h2 className="title">Send an inquiry</h2>
                                            <div className="te-section-desc">
                                                <p>Provide a brief description and we will route it to the correct team.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <ContactForm />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContactContent;
