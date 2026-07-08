import { Link } from "react-router-dom";

type MainMenuProps = {
    toggleSubMenu: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

/**
 * Hemisphere Defense primary navigation.
 * Flat, institutional structure. Programs carries a submenu so additional
 * defense programs can be added over time without redesigning the nav.
 */
const MainMenu = ({ toggleSubMenu }: MainMenuProps) => {
    return (
        <>
            <nav id="main-menu" className="te-main-menu">
                <ul className='te-main-list'>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li className="te-dropdown">
                        <Link to="/programs" onClick={toggleSubMenu} className='dropdown-expand'>Programs</Link>
                        <ul className="te-submenu">
                            <li className='te-list-item'><Link to="/programs">Program Portfolio</Link></li>
                            <li className='te-list-item'><Link to="/program-details/aydll-idl">AYDLL / IDL</Link></li>
                        </ul>
                    </li>
                    <li><Link to="/approach">Approach</Link></li>
                    <li><Link to="/leadership">Leadership</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </nav>
        </>
    );
};

export default MainMenu;
