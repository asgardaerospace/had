import HeaderV1 from '../../components/header/HeaderV1';
import HeroV1 from '../../components/hero/HeroV1';
import MissionBand from '../../components/mission/MissionBand';
import AboutV1 from '../../components/about/AboutV1';
import DomainSectors from '../../components/domains/DomainSectors';
import FeaturedProgram from '../../components/program/FeaturedProgram';
import PhilosophyPrinciples from '../../components/philosophy/PhilosophyPrinciples';
import StatementBand from '../../components/visual/StatementBand';
import LeadershipTeaser from '../../components/leadership/LeadershipTeaser';
import HaiBand from '../../components/hai/HaiBand';
import ContactCta from '../../components/cta/ContactCta';
import FooterV1 from '../../components/footer/FooterV1';

/**
 * Hemisphere Defense: corporate home.
 *
 * Scroll sequence follows the Paul Revere narrative: cinematic hero →
 * mission thesis → who we are → Land/Air/Sea domains → flagship Paul Revere
 * Program → operating philosophy → dual-era statement → team → HAI → contact.
 *
 * Removed from the template default: testimonials, client-logo "brands",
 * blog/news, appointment/quote forms, and fabricated stat counters. The
 * generic capability grid now lives on the About page.
 */
const Home = () => {
    return (
        <>
            <HeaderV1 />
            <HeroV1 />
            <MissionBand />
            <AboutV1 style="background-gray-700 te-pt-120 te-pb-120" />
            <DomainSectors />
            <FeaturedProgram />
            <PhilosophyPrinciples id="philosophy" />
            <StatementBand />
            <LeadershipTeaser />
            <HaiBand />
            <ContactCta />
            <FooterV1 />
        </>
    );
};

export default Home;
