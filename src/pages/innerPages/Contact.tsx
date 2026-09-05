import BreadCrumb from '../../components/breadcrumb/BreadCrumb';
import ContactContent from '../../components/contact/ContactContent';
import FooterV1 from '../../components/footer/FooterV1';
import Seo from "../../components/seo/Seo";
import { breadcrumbSchema, webPageSchema } from "../../components/seo/schema";
import { metaForPath } from "../../config/seo";
import HeaderV1 from "../../components/header/HeaderV1";

const Contact = () => {
    const meta = metaForPath("/contact");
    return (
        <>
            <Seo
                path="/contact"
                schema={[
                    webPageSchema({ path: "/contact", name: meta.title, description: meta.description }),
                    breadcrumbSchema([{ name: "Contact", path: "/contact" }]),
                ]}
            />
            <HeaderV1 />
            <BreadCrumb
                image="lantern-network.jpg"
                objectPosition="center 40%"
                eyebrow="Get in Touch"
                pageTitle="Contact"
                subtitle="Program, partnership, and general inquiries."
                breadcrumb="Contact"
            />
            <ContactContent />
            <FooterV1 />
        </>
    );
};

export default Contact;