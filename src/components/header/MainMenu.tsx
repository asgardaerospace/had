import { Link } from "react-router-dom";

type MainMenuProps = {
    toggleSubMenu: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

/**
 * Hemisphere Aerospace Defense primary navigation.
 *
 * Four groups, each answering one question a visitor arrives with: who are
 * you, what do you build, what are you working on, how do I reach you. Every
 * page on the site is reachable within one level.
 *
 * Two corrections from the template layout:
 *
 * 1. About is linked. It was previously left out of every menu on the theory
 *    that it would still be indexed and reached by direct URL. The opposite is
 *    true: with no internal link anywhere on the site it received no crawl
 *    priority and no internal authority, which made the company's own
 *    entity-definition page the least discoverable page on the site.
 *
 * 2. Domains points at /domains rather than the /#domains fragment on the home
 *    page. A fragment cannot rank as its own result or carry its own title.
 */
const MainMenu = ({ toggleSubMenu }: MainMenuProps) => {
    return (
        <>
            <nav id="main-menu" className="te-main-menu">
                <ul className='te-main-list'>
                    <li className="te-dropdown">
                        <Link to="/about" onClick={toggleSubMenu} className='dropdown-expand'>Company</Link>
                        <ul className="te-submenu">
                            <li className='te-list-item'><Link to="/about">About Hemisphere Defense</Link></li>
                            <li className='te-list-item'><Link to="/leadership">Leadership &amp; Team</Link></li>
                            <li className='te-list-item'><Link to="/certifications">Certifications &amp; Registrations</Link></li>
                        </ul>
                    </li>
                    <li className="te-dropdown">
                        <Link to="/capabilities" onClick={toggleSubMenu} className='dropdown-expand'>Capabilities</Link>
                        <ul className="te-submenu">
                            <li className='te-list-item'><Link to="/capabilities">Capability Areas</Link></li>
                            <li className='te-list-item'><Link to="/domains">Land, Air &amp; Sea</Link></li>
                            <li className='te-list-item'><Link to="/approach">Our Approach</Link></li>
                            <li className='te-list-item'><Link to="/insights">Insights</Link></li>
                        </ul>
                    </li>
                    <li className="te-dropdown">
                        <Link to="/programs" onClick={toggleSubMenu} className='dropdown-expand'>Programs</Link>
                        <ul className="te-submenu">
                            <li className='te-list-item'><Link to="/programs">Program Portfolio</Link></li>
                            <li className='te-list-item'><Link to="/programs/paul-revere-program">Paul Revere Program</Link></li>
                        </ul>
                    </li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
        </>
    );
};

export default MainMenu;
