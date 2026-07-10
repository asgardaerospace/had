import HeaderV1 from "../../components/header/HeaderV1";
import BreadCrumb from "../../components/breadcrumb/BreadCrumb";
import LegalDoc, { type LegalSection } from "../../components/legal/LegalDoc";
import FooterV1 from "../../components/footer/FooterV1";
import { SITE } from "../../config/site";

const intro = [
    "These Terms of Use govern your access to and use of this website operated by Hemisphere Defense (HAD), which operates within the Hemisphere Aerospace Investments (HAI) structure. Please read them carefully.",
    "By accessing or using this website, you agree to be bound by these Terms of Use. If you do not agree, do not use the site.",
];

const sections: LegalSection[] = [
    {
        heading: "Use of the Site",
        blocks: [
            { type: "p", text: "You may use this website for lawful, informational purposes only. You agree not to misuse the site, interfere with its operation, attempt to gain unauthorized access to any systems, or use the site in any manner that could damage, disable, or impair it." },
        ],
    },
    {
        heading: "Informational Purpose",
        blocks: [
            { type: "p", text: "The content on this website is provided for general informational purposes about Hemisphere Defense and its activities. It does not constitute an offer, solicitation, recommendation, or commitment of any kind, and it should not be relied upon as the basis for any decision. Detailed information about specific programs may be maintained on separate websites." },
        ],
    },
    {
        heading: "Intellectual Property",
        blocks: [
            { type: "p", text: "The website and its contents, including text, graphics, logos, images, and design, are owned by or licensed to Hemisphere Defense and are protected by applicable intellectual property laws. You may view and print content for your own informational use. You may not copy, reproduce, distribute, modify, or create derivative works without prior written permission, except as permitted by law." },
        ],
    },
    {
        heading: "Trademarks",
        blocks: [
            { type: "p", text: "Hemisphere Defense, Hemisphere Aerospace Investments, and related names, logos, and program names are marks of their respective owners. Nothing on the site grants any license or right to use any mark without prior written permission." },
        ],
    },
    {
        heading: "Export Control and Compliance",
        blocks: [
            { type: "p", text: "This website contains general corporate information only and is not intended to provide controlled technical data. You are responsible for complying with all applicable laws and regulations, including United States export control and sanctions laws, in connection with your use of the site." },
        ],
    },
    {
        heading: "Third-Party Links",
        blocks: [
            { type: "p", text: "The site may contain links to third-party websites, including separate program websites and the Hemisphere Aerospace Investments (HAI) website. These links are provided for convenience only. We do not control and are not responsible for the content, policies, or practices of third-party sites." },
        ],
    },
    {
        heading: "Disclaimer of Warranties",
        blocks: [
            { type: "p", text: "The website and its content are provided on an as is and as available basis, without warranties of any kind, whether express or implied, including warranties of merchantability, fitness for a particular purpose, non-infringement, and accuracy. We do not warrant that the site will be uninterrupted, error-free, or free of harmful components." },
        ],
    },
    {
        heading: "Limitation of Liability",
        blocks: [
            { type: "p", text: "To the fullest extent permitted by law, Hemisphere Defense, its affiliates, and their respective personnel will not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of data, use, or goodwill, arising out of or related to your use of, or inability to use, the website." },
        ],
    },
    {
        heading: "Indemnification",
        blocks: [
            { type: "p", text: "You agree to indemnify and hold harmless Hemisphere Defense and its affiliates from any claims, damages, liabilities, and expenses arising out of your use of the website or your violation of these Terms." },
        ],
    },
    {
        heading: "Changes to the Site and Terms",
        blocks: [
            { type: "p", text: "We may modify, suspend, or discontinue any part of the website at any time. We may also revise these Terms from time to time. Changes become effective when posted, and your continued use of the site constitutes acceptance of the revised Terms." },
        ],
    },
    {
        heading: "Governing Law",
        blocks: [
            { type: "p", text: "These Terms are governed by the laws of the State of Texas, United States, without regard to its conflict of laws principles. Any dispute arising out of or relating to the site or these Terms will be subject to the exclusive jurisdiction of the state and federal courts located in Texas." },
        ],
    },
    {
        heading: "Contact Us",
        blocks: [
            { type: "p", text: "Questions about these Terms of Use may be directed to:" },
            { type: "ul", items: [SITE.name, SITE.contact.address, SITE.contact.generalEmail] },
        ],
    },
];

const Terms = () => {
    return (
        <>
            <HeaderV1 />
            <BreadCrumb
                image="breadcrumb-bg.jpg"
                eyebrow="Legal"
                pageTitle="Terms of Use"
                subtitle="The terms that govern your use of this website."
                breadcrumb="Terms of Use"
            />
            <LegalDoc updated="July 10, 2026" intro={intro} sections={sections} />
            <FooterV1 />
        </>
    );
};

export default Terms;
