import HeaderV1 from '../../components/header/HeaderV1';
import SliderV1 from '../../components/slider/SliderV1';
import CapabilityAreas from '../../components/capability/CapabilityAreas';
import AboutV1 from '../../components/about/AboutV1';
import FeaturedProgram from '../../components/program/FeaturedProgram';
import PhilosophyPrinciples from '../../components/philosophy/PhilosophyPrinciples';
import LeadershipTeaser from '../../components/leadership/LeadershipTeaser';
import HaiBand from '../../components/hai/HaiBand';
import ContactCta from '../../components/cta/ContactCta';
import FooterV1 from '../../components/footer/FooterV1';

/**
 * Hemisphere Defense — corporate home.
 * Removed from the template default: testimonials, client-logo "brands",
 * blog/news, appointment/quote forms, and fabricated stat counters
 * (see contradiction audit).
 */
const Home = () => {
    return (
        <>
            <HeaderV1 />
            <SliderV1 />
            <CapabilityAreas style="te-pt-120 te-pb-120" />
            <AboutV1 style="background-gray-700 te-pt-120 te-pb-120" />
            <FeaturedProgram />
            <PhilosophyPrinciples />
            <LeadershipTeaser />
            <HaiBand />
            <ContactCta />
            <FooterV1 />
        </>
    );
};

export default Home;
