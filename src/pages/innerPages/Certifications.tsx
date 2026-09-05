import HeaderV1 from "../../components/header/HeaderV1";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import HaiBand from "../../components/hai/HaiBand";
import FooterV1 from "../../components/footer/FooterV1";
import { SITE, EXTERNAL_LINK_PROPS, isPlaceholder } from "../../config/site";
import Seo from "../../components/seo/Seo";
import EntityAnswers from "../../components/seo/EntityAnswers";
import { breadcrumbSchema, faqSchema, webPageSchema } from "../../components/seo/schema";
import { metaForPath } from "../../config/seo";
import { PROCUREMENT_FAQ } from "../../config/entityAnswers";

/**
 * Certifications & Registrations: the reference page for contracting officers,
 * program offices, and procurement teams. Lists only verified registration
 * facts (SAM.gov identifiers, USFCR verification); pending items render as
 * dim placeholders until approved values are supplied in config/site.ts.
 */
const Certifications = () => {
    const { legalName, uei, cage, samStatus, naics, psc, capabilityStatement } = SITE.registration;
    const { generalEmail, phone, phoneDisplay, address } = SITE.contact;
    const meta = metaForPath("/certifications");

    return (
        <>
            <Seo
                path="/certifications"
                schema={[
                    webPageSchema({ path: "/certifications", name: meta.title, description: meta.description }),
                    breadcrumbSchema([{ name: "Certifications", path: "/certifications" }]),
                    faqSchema(PROCUREMENT_FAQ),
                ]}
            />
            <HeaderV1 />
            <BreadCrumb
                eyebrow="Working With Us"
                pageTitle="Certifications &amp; Registrations"
                subtitle="Federal registration identifiers and verification resources for contracting officers and program offices."
                breadcrumb="Certifications"
            />

            <section className="had-context-section te-pt-120 te-pb-60">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9">
                            <div className="short-title-wrapper">
                                <span className="short-title">Federal Contracting</span>
                            </div>
                            <h2 className="had-section-heading">
                                Registered and verified for federal engagement
                            </h2>
                            <p className="had-context-lead">
                                Hemisphere Defense operates as {legalName} and holds an active registration in
                                the System for Award Management (SAM.gov), verified through US Federal Contractor
                                Registration (USFCR). The identifiers on this page support vendor vetting, market
                                research, and award actions.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="background-gray-700 te-pt-60 te-pb-120">
                <div className="container">
                    <div className="row gy-5">
                        <div className="col-lg-6">
                            <h3 className="had-leader-group-title">Entity Information</h3>
                            <ul className="had-contact-list">
                                <li>
                                    <span className="had-contact-list-label">Legal Business Name</span>
                                    <span>{legalName}</span>
                                </li>
                                <li>
                                    <span className="had-contact-list-label">Unique Entity ID (UEI)</span>
                                    <span>{uei}</span>
                                </li>
                                <li>
                                    <span className="had-contact-list-label">CAGE Code</span>
                                    <span>{cage}</span>
                                </li>
                                <li>
                                    <span className="had-contact-list-label">SAM.gov Registration</span>
                                    <span>{samStatus}</span>
                                </li>
                                <li>
                                    <span className="had-contact-list-label">Physical Address</span>
                                    <span className={isPlaceholder(address) ? "had-placeholder" : ""}>{address}</span>
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-6">
                            <h3 className="had-leader-group-title">Registrations &amp; Verification</h3>
                            <div className="had-registrations had-cert-badges">
                                <a
                                    href={SITE.external.usfcrProfile}
                                    {...EXTERNAL_LINK_PROPS}
                                    className="had-registration-badge"
                                    aria-label="USFCR Verified Vendor profile for Hemisphere Defense"
                                >
                                    <img
                                        src="/images/had/usfcr-verified-vendor-2026.png"
                                        alt="USFCR Verified Vendor 2026 seal"
                                        width={349}
                                        height={269}
                                        loading="lazy"
                                    />
                                </a>
                                <span
                                    className="had-registration-badge"
                                    aria-label="SAM.gov active registration for Hemisphere Aerospace Defense, LLC"
                                >
                                    <img
                                        src="/images/had/sam-gov.webp"
                                        alt="SAM.gov active registration"
                                        loading="lazy"
                                    />
                                </span>
                            </div>
                            <ul className="had-contact-list">
                                <li>
                                    <span className="had-contact-list-label">USFCR Verified Vendor</span>
                                    <a href={SITE.external.usfcrProfile} {...EXTERNAL_LINK_PROPS}>
                                        View our verified vendor profile
                                        <i className="fa fa-solid fa-arrow-up-right-from-square ms-2" />
                                    </a>
                                </li>
                                <li>
                                    <span className="had-contact-list-label">SAM.gov</span>
                                    <span>Active registration. Look up UEI {uei} in SAM.gov.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="row gy-5 had-cert-row-gap">
                        <div className="col-lg-6">
                            <h3 className="had-leader-group-title">Industry Codes</h3>
                            <ul className="had-contact-list">
                                <li>
                                    <span className="had-contact-list-label">NAICS Codes</span>
                                    {isPlaceholder(naics)
                                        ? <span className="had-placeholder">{naics}</span>
                                        : <span>{naics}</span>}
                                </li>
                                <li>
                                    <span className="had-contact-list-label">Product Service Codes (PSC)</span>
                                    {isPlaceholder(psc)
                                        ? <span className="had-placeholder">{psc}</span>
                                        : <span>{psc}</span>}
                                </li>
                            </ul>
                        </div>
                        <div className="col-lg-6">
                            <h3 className="had-leader-group-title">Contracting Contact</h3>
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
                                        : <a href={`tel:${phone}`}>{phoneDisplay}</a>}
                                </li>
                                <li>
                                    <span className="had-contact-list-label">Capability Statement</span>
                                    {isPlaceholder(capabilityStatement)
                                        ? <span className="had-placeholder">{capabilityStatement}</span>
                                        : (
                                            <a href={capabilityStatement} {...EXTERNAL_LINK_PROPS}>
                                                AYDLL Capability Statement (PDF)
                                                <i className="fa fa-solid fa-arrow-up-right-from-square ms-2" />
                                            </a>
                                        )}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <EntityAnswers
                className="te-pt-120 te-pb-120"
                eyebrow="Vendor Vetting"
                heading="Entity questions, answered directly"
                intro="The facts most often needed for market research, vendor vetting, and award actions."
                items={PROCUREMENT_FAQ}
            />

            <HaiBand />
            <FooterV1 />
        </>
    );
};

export default Certifications;
