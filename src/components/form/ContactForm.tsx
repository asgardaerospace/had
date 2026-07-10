import { useState, type FormEvent } from 'react';
import InquiryPathways from '../../jsonData/contact/InquiryPathways.json';
import { SITE, isPlaceholder } from "../../config/site";

type Pathway = { id: number; title: string };
type Status = 'idle' | 'submitting' | 'success' | 'error' | 'unconfigured';

/**
 * General inquiry form. Submissions POST to Web3Forms, which forwards them to
 * the inbox tied to the access key in site config (info@hai-aero.com). Until a
 * real key is set, the form stays inert and points visitors to email directly
 * rather than failing silently.
 */
const ContactForm = () => {
    const { web3formsAccessKey, subject } = SITE.contactForm;
    const { generalEmail } = SITE.contact;
    const deliveryReady = !isPlaceholder(web3formsAccessKey);
    const [status, setStatus] = useState<Status>('idle');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Capture the element now; React reuses the event object after the await.
        const form = e.currentTarget;

        if (!deliveryReady) {
            setStatus('unconfigured');
            return;
        }

        setStatus('submitting');
        const formData = new FormData(form);
        formData.append('access_key', web3formsAccessKey);
        formData.append('subject', subject);
        formData.append('from_name', 'Hemisphere Defense Website');

        try {
            const res = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (data.success) {
                setStatus('success');
                form.reset();
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    const submitting = status === 'submitting';

    return (
        <>
            <div className="te-comment-respond mt-0">
                <form className="te-comment-form" onSubmit={handleSubmit}>
                    {/* Honeypot: real users never see or fill this; Web3Forms discards any submission that does. */}
                    <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" style={{ display: "none" }} />
                    <div className="row gx-4 gy-2">
                        <div className="col-xl-6">
                            <div className="te-contacts-name">
                                <input name="name" type="text" placeholder="Name*" aria-label="Name" required />
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="te-contacts-name">
                                <input name="organization" type="text" placeholder="Organization" aria-label="Organization" />
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="te-contacts-email">
                                <input name="email" type="email" placeholder="Email*" aria-label="Email" required />
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="te-contacts-name had-select-wrap">
                                <select name="inquiryType" defaultValue="" className="had-select" aria-label="Inquiry type" required>
                                    <option value="" disabled>Inquiry type*</option>
                                    {(InquiryPathways as Pathway[]).map((p) => (
                                        <option key={p.id} value={p.title}>{p.title}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-xl-12">
                            <div className="te-contacts-message">
                              <textarea name="message" cols={20} rows={4} placeholder="Message*" aria-label="Message" required defaultValue={""} />
                            </div>
                        </div>
                        <div className="col-12">
                            <button className="te-theme-btn" type="submit" disabled={submitting}>
                                {submitting ? "Sending..." : "Submit Inquiry"}
                                <i className="fa fa-solid fa-arrow-right" />
                            </button>

                            <div aria-live="polite">
                                {status === 'success' && (
                                    <p className="had-form-status is-success">
                                        Thank you. Your message has been sent and we will be in touch.
                                    </p>
                                )}
                                {status === 'error' && (
                                    <p className="had-form-status is-error">
                                        Something went wrong sending your message. Please try again, or email us at{' '}
                                        <a href={`mailto:${generalEmail}`}>{generalEmail}</a>.
                                    </p>
                                )}
                                {status === 'unconfigured' && (
                                    <p className="had-form-status is-notice">
                                        Message delivery is not active yet. Please email us directly at{' '}
                                        <a href={`mailto:${generalEmail}`}>{generalEmail}</a>.
                                    </p>
                                )}
                                {(status === 'idle' || submitting) && (
                                    <p className="had-external-note" style={{ display: "block", marginTop: 14 }}>
                                        Submissions are sent to the Hemisphere Defense team.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ContactForm;
