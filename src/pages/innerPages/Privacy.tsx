import HeaderV1 from "../../components/header/HeaderV1";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import LegalDoc, { type LegalSection } from "../../components/legal/LegalDoc";
import FooterV1 from "../../components/footer/FooterV1";
import Seo from "../../components/seo/Seo";
import { breadcrumbSchema, webPageSchema } from "../../components/seo/schema";
import { metaForPath } from "../../config/seo";
import { SITE } from "../../config/site";

/*
 * This policy is written to match the site's actual behavior, verified by
 * audit: no cookies, no analytics, no advertising or tracking technologies,
 * and one third-party processor (Web3Forms, contact form delivery only).
 * If the site's behavior changes (new analytics, embeds, scripts, or
 * processors), this policy and privacy/inventory.json must change with it.
 * See privacy/PRIVACY-NOTES.md at the repo root.
 */

const intro = [
    "This Privacy Policy explains what information Hemisphere Defense (HAD) collects through this website, how it is used, and the choices available to you.",
    "This website is a corporate informational site. It does not require an account, it does not set cookies, and it does not use analytics, advertising, or tracking technologies.",
];

const sections: LegalSection[] = [
    {
        heading: "Information You Provide",
        blocks: [
            { type: "p", text: "The only personal information this website collects is what you choose to send us:" },
            {
                type: "ul",
                items: [
                    "Contact form: if you submit an inquiry, we collect your name, email address, the type of inquiry, your message, and, if you choose to provide it, your organization.",
                    "Direct contact: if you email or call us using the contact details published on the site, we receive the information you include in that communication.",
                ],
            },
            { type: "p", text: "We use this information only to respond to your inquiry and route it to the appropriate team. Providing it is voluntary; if you prefer not to use the form, you can reach us by email or phone." },
        ],
    },
    {
        heading: "Information Collected Automatically",
        blocks: [
            { type: "p", text: "The website itself does not run analytics and does not record your browsing activity. Like nearly all websites, the infrastructure that hosts the site may generate standard server logs when pages and files are requested. These logs can include the IP address, request time, requested page, browser type, and referring page, and are used only to operate and secure the site." },
        ],
    },
    {
        heading: "Cookies and Tracking",
        blocks: [
            { type: "p", text: "This website does not set cookies. It also does not use:" },
            {
                type: "ul",
                items: [
                    "Analytics or audience measurement tools.",
                    "Advertising, marketing, or social media pixels.",
                    "Session replay, heatmaps, or fingerprinting.",
                    "Third-party embeds that track visitors (all fonts, images, and video on the site are served with the site itself).",
                ],
            },
            { type: "p", text: "Because there is no non-essential tracking, the site does not need and does not show a cookie consent banner. If this ever changes, this policy will be updated and consent will be requested where required before any non-essential technology runs." },
        ],
    },
    {
        heading: "How We Share Information",
        blocks: [
            { type: "p", text: "We do not sell personal information, and we do not share it for targeted advertising. Information is shared only in these limited circumstances:" },
            {
                type: "ul",
                items: [
                    "Form delivery: contact form submissions are transmitted to Web3Forms (web3forms.com), a form delivery service that forwards your submission to our inbox. Web3Forms receives the contents of your submission for the sole purpose of delivering it to us.",
                    "Hosting: the site is served by our hosting infrastructure, which processes requests (including IP addresses) to deliver pages.",
                    "Within the Hemisphere Aerospace Investments (HAI) structure, where relevant to your inquiry.",
                    "When required by law, regulation, legal process, or a governmental request, or to protect the rights, property, or safety of Hemisphere Defense, our users, or others.",
                ],
            },
        ],
    },
    {
        heading: "Sale, Sharing, and Opt-Out Signals",
        blocks: [
            { type: "p", text: "We do not sell personal information, we do not share it for cross-context behavioral or targeted advertising, and we do not use it for profiling that produces legal or similarly significant effects. Because none of that processing occurs, there is nothing for an opt-out to disable: browsers sending an opt-out preference signal such as Global Privacy Control receive the same tracking-free experience as every other visitor. If our practices ever change, we will update this policy and honor applicable opt-out signals before any such processing begins." },
        ],
    },
    {
        heading: "Data Security",
        blocks: [
            { type: "p", text: "The site is served over HTTPS, and contact form submissions are transmitted over an encrypted connection. We take reasonable administrative, technical, and physical measures designed to protect the information we receive. No method of transmission or storage is completely secure, and we cannot guarantee absolute security." },
        ],
    },
    {
        heading: "Data Retention",
        blocks: [
            { type: "p", text: "Contact form submissions are delivered to our email inbox and retained as ordinary business correspondence for as long as needed to handle your inquiry and meet our legal and record-keeping obligations. You may ask us to delete correspondence containing your information using the contact details below." },
        ],
    },
    {
        heading: "Your Rights and Choices",
        blocks: [
            { type: "p", text: "Depending on where you live, you may have the right to request access to, correction of, or deletion of personal information we hold about you, or to object to or restrict certain processing. Because this site collects personal information only through the contact form and direct correspondence, requests are handled manually by our team." },
            { type: "p", text: "To make a request, email us at the address below with enough detail for us to locate your correspondence. We will respond consistent with applicable law. If we deny a request, you may appeal by replying to our response, and where applicable law provides, you may also contact your local data protection or consumer protection authority." },
        ],
    },
    {
        heading: "Third-Party Links",
        blocks: [
            { type: "p", text: "The site links to third-party websites, including separate program websites, the Hemisphere Aerospace Investments (HAI) website, and government registry pages. Following those links takes you off this site, and this policy no longer applies. We are not responsible for the privacy practices of those sites and encourage you to review their policies." },
        ],
    },
    {
        heading: "Children's Privacy",
        blocks: [
            { type: "p", text: "This website is intended for a professional audience and is not directed to children. We do not knowingly collect personal information from children. If you believe a child has submitted personal information through the site, contact us and we will delete it." },
        ],
    },
    {
        heading: "International Visitors",
        blocks: [
            { type: "p", text: "This website is operated from the United States, and information submitted through it is processed in the United States, where data protection laws may differ from those in your jurisdiction. The site is directed at a United States audience and does not monitor the behavior of visitors in any jurisdiction." },
        ],
    },
    {
        heading: "Changes to This Policy",
        blocks: [
            { type: "p", text: "We may update this Privacy Policy from time to time, and any update will describe the site's practices as they actually are. Changes become effective when posted, and the date above reflects the most recent revision." },
        ],
    },
    {
        heading: "Contact Us",
        blocks: [
            { type: "p", text: "If you have questions about this Privacy Policy, or want to exercise any of the rights described above, contact us at:" },
            { type: "ul", items: [SITE.name, SITE.contact.address, SITE.contact.generalEmail] },
        ],
    },
];

const Privacy = () => {
    const meta = metaForPath("/privacy");
    return (
        <>
            <Seo
                path="/privacy"
                schema={[
                    webPageSchema({ path: "/privacy", name: meta.title, description: meta.description }),
                    breadcrumbSchema([{ name: "Privacy Policy", path: "/privacy" }]),
                ]}
            />
            <HeaderV1 />
            <BreadCrumb
                image="breadcrumb-bg.jpg"
                eyebrow="Legal"
                pageTitle="Privacy Policy"
                subtitle="How Hemisphere Defense handles information collected through this website."
                breadcrumb="Privacy Policy"
            />
            <LegalDoc updated="August 25, 2026" intro={intro} sections={sections} />
            <FooterV1 />
        </>
    );
};

export default Privacy;
