import HeaderV1 from "../../components/header/HeaderV1";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import LegalDoc, { type LegalSection } from "../../components/legal/LegalDoc";
import FooterV1 from "../../components/footer/FooterV1";
import { SITE } from "../../config/site";

const intro = [
    "This Privacy Policy explains how Hemisphere Defense (HAD) collects, uses, and protects information in connection with this website. Hemisphere Defense operates within the Hemisphere Aerospace Investments (HAI) structure.",
    "By using this website, you agree to the practices described in this policy.",
];

const sections: LegalSection[] = [
    {
        heading: "Information We Collect",
        blocks: [
            { type: "p", text: "We collect information in two ways: information you provide directly and information collected automatically as you use the site." },
            {
                type: "ul",
                items: [
                    "Information you provide: when you submit an inquiry through our contact form, we collect your name, email address, organization, and the contents of your message.",
                    "Information collected automatically: our servers and analytics tools may record technical data such as your IP address, browser type, device information, referring pages, and the pages you view.",
                ],
            },
        ],
    },
    {
        heading: "How We Use Information",
        blocks: [
            { type: "p", text: "We use the information we collect to:" },
            {
                type: "ul",
                items: [
                    "Respond to your inquiries and route them to the appropriate team.",
                    "Operate, maintain, secure, and improve the website.",
                    "Monitor and analyze usage and trends.",
                    "Comply with applicable legal obligations and enforce our terms.",
                ],
            },
        ],
    },
    {
        heading: "Cookies and Analytics",
        blocks: [
            { type: "p", text: "The site may use cookies and similar technologies to remember preferences and understand how the site is used. You can control cookies through your browser settings. Disabling cookies may affect some site functionality." },
        ],
    },
    {
        heading: "How We Share Information",
        blocks: [
            { type: "p", text: "We do not sell your personal information. We may share information in the following limited circumstances:" },
            {
                type: "ul",
                items: [
                    "With service providers who perform functions on our behalf, such as hosting and analytics, subject to appropriate confidentiality obligations.",
                    "Within the Hemisphere Aerospace Investments (HAI) structure that Hemisphere Defense operates within, where relevant to your inquiry.",
                    "When required by law, regulation, legal process, or a governmental request.",
                    "To protect the rights, property, or safety of Hemisphere Defense, our users, or others.",
                ],
            },
        ],
    },
    {
        heading: "Data Security",
        blocks: [
            { type: "p", text: "We take reasonable administrative, technical, and physical measures designed to protect the information we collect. No method of transmission or storage is completely secure, and we cannot guarantee absolute security." },
        ],
    },
    {
        heading: "Data Retention",
        blocks: [
            { type: "p", text: "We retain information for as long as necessary to fulfill the purposes described in this policy, unless a longer retention period is required or permitted by law." },
        ],
    },
    {
        heading: "Your Choices and Rights",
        blocks: [
            { type: "p", text: "Depending on your location, you may have rights to access, correct, or request deletion of your personal information, or to object to or restrict certain processing. To make a request, contact us using the details below. We will respond consistent with applicable law." },
        ],
    },
    {
        heading: "Third-Party Links",
        blocks: [
            { type: "p", text: "The site may link to third-party websites, including separate program websites and the Hemisphere Aerospace Investments (HAI) website. We are not responsible for the privacy practices or content of those sites, and we encourage you to review their policies." },
        ],
    },
    {
        heading: "Children's Privacy",
        blocks: [
            { type: "p", text: "This website is intended for a professional audience and is not directed to children. We do not knowingly collect personal information from children." },
        ],
    },
    {
        heading: "International Users",
        blocks: [
            { type: "p", text: "This website is operated from the United States. If you access the site from outside the United States, you understand that your information may be processed in the United States, where data protection laws may differ from those in your jurisdiction." },
        ],
    },
    {
        heading: "Changes to This Policy",
        blocks: [
            { type: "p", text: "We may update this Privacy Policy from time to time. Changes become effective when posted, and the date above reflects the most recent revision." },
        ],
    },
    {
        heading: "Contact Us",
        blocks: [
            { type: "p", text: "If you have questions about this Privacy Policy or our handling of your information, contact us at:" },
            { type: "ul", items: [SITE.name, SITE.contact.address, SITE.contact.generalEmail] },
        ],
    },
];

const Privacy = () => {
    return (
        <>
            <HeaderV1 />
            <BreadCrumb
                image="breadcrumb-bg.jpg"
                eyebrow="Legal"
                pageTitle="Privacy Policy"
                subtitle="How Hemisphere Defense handles information collected through this website."
                breadcrumb="Privacy Policy"
            />
            <LegalDoc updated="July 10, 2026" intro={intro} sections={sections} />
            <FooterV1 />
        </>
    );
};

export default Privacy;
