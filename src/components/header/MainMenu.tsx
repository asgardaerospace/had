import { Link } from "react-router-dom";

type MainMenuProps = {
    toggleSubMenu: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

/**
 * Hemisphere Defense primary navigation.
 * Flat, institutional structure following the site narrative: Mission,
 * Domains, Programs, the flagship Paul Revere Program, Team, Contact.
 * "Domains" anchors to the home domains section; "Paul Revere" routes to the
 * flagship program overview.
 */
const MainMenu = ({ toggleSubMenu }: MainMenuProps) => {
    return (
        <>
            <nav id="main-menu" className="te-main-menu">
                <ul className='te-main-list'>
                    <li><Link to="/about">Mission</Link></li>
                    <li><Link to="/#domains">Domains</Link></li>
                    <li className="te-dropdown">
                        <Link to="/programs" onClick={toggleSubMenu} className='dropdown-expand'>Programs</Link>
                        <ul className="te-submenu">
                            <li className='te-list-item'><Link to="/programs">Program Portfolio</Link></li>
                            <li className='te-list-item'><Link to="/program-details/aydll-idl">Paul Revere Program</Link></li>
                        </ul>
                    </li>
                    <li><Link to="/leadership">Team</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
        </>
    );
};

export default MainMenu;
