import InquiryPathways from '../../jsonData/contact/InquiryPathways.json';

type Pathway = { id: number; title: string };

/**
 * General inquiry form. Routing is by inquiry type; no sales/quote framing.
 * This is a front-end placeholder. Wire to an approved endpoint before launch.
 */
const ContactForm = () => {
    return (
        <>
            <div className="te-comment-respond mt-0">
                <form action="#" method="post" className="te-comment-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="row gx-4 gy-2">
                        <div className="col-xl-6">
                            <div className="te-contacts-name">
                                <input name="name" type="text" placeholder="Name*" />
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="te-contacts-name">
                                <input name="organization" type="text" placeholder="Organization" />
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="te-contacts-email">
                                <input name="email" type="email" placeholder="Email*" />
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="te-contacts-name had-select-wrap">
                                <select name="inquiryType" defaultValue="" className="had-select">
                                    <option value="" disabled>Inquiry type*</option>
                                    {(InquiryPathways as Pathway[]).map((p) => (
                                        <option key={p.id} value={p.title}>{p.title}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-xl-12">
                            <div className="te-contacts-message">
                              <textarea name="message" cols={20} rows={4} placeholder="Message*" defaultValue={""} />
                            </div>
                        </div>
                        <div className="col-12">
                            <button className="te-theme-btn" type="submit">
                                Submit Inquiry
                                <i className="fa fa-solid fa-arrow-right" />
                            </button>
                            <p className="had-external-note" style={{ display: "block", marginTop: 14 }}>
                                Submissions are directed to the appropriate Hemisphere Defense channel.
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ContactForm;
