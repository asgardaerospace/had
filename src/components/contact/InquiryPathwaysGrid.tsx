import InquiryPathways from '../../jsonData/contact/InquiryPathways.json';
import { isPlaceholder } from "../../config/site";

type Pathway = {
    id: number;
    icon: string;
    title: string;
    desc: string;
    email: string;
};

/** Five contact pathways. Emails are placeholders until approved. */
const InquiryPathwaysGrid = () => {
    return (
        <div className="row gy-4">
            {(InquiryPathways as Pathway[]).map((p) => {
                const emailReady = !isPlaceholder(p.email);
                return (
                    <div className="col-lg-4 col-md-6" key={p.id}>
                        <div className="had-inquiry-card">
                            <div className="had-inquiry-icon">
                                <i className={p.icon} />
                            </div>
                            <h3 className="had-inquiry-title">{p.title}</h3>
                            <p className="had-inquiry-desc">{p.desc}</p>
                            {emailReady ? (
                                <a className="had-inquiry-email" href={`mailto:${p.email}`}>{p.email}</a>
                            ) : (
                                <span className="had-inquiry-email had-placeholder">{p.email}</span>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default InquiryPathwaysGrid;
