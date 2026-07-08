import MainMenu from './MainMenu';
import { Link } from "react-router-dom";
import HeaderLogo from './HeaderLogo';
import { SITE, isPlaceholder } from "../../config/site";

type SideBarMenuProps = {
    isMenuActive: boolean;
    closeMenu: () => void;
    toggleSubMenu: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

const SideBarMenu = ({ isMenuActive, closeMenu, toggleSubMenu }: SideBarMenuProps) => {
    return (
        <>
            <div className={`te-menu-sidebar-area ${isMenuActive ? 'active' : ''}`}>
                <div className="te-menu-sidebar-wrapper">
                    <div className="te-menu-sidebar-close">
                        <button className="te-menu-sidebar-close-btn" id="menu_sidebar_close_btn" onClick={closeMenu}>
                            <i className="fal fa-times"></i>
                        </button>
                    </div>
                    <div className="te-menu-sidebar-content">
                        <div className="te-menu-sidebar-logo">
                            <HeaderLogo />
                        </div>
                        <div className="te-mobile-nav-menu d-lg-none">
                            <MainMenu toggleSubMenu={toggleSubMenu} />
                        </div>
                        <div className="te-menu-sidebar-content">
                            <div className="te-menu-sidebar-single-widget">
                                <h5 className="te-menu-sidebar-title">Contact</h5>
                                <div className="te-header-contact-info">
                                    <span className={isPlaceholder(SITE.contact.address) ? "had-placeholder" : ""}>
                                        <i className="fa-solid fa-location-dot"></i>{SITE.contact.address}
                                    </span>
                                    <span className={isPlaceholder(SITE.contact.generalEmail) ? "had-placeholder" : ""}>
                                        <i className="fa-solid fa-envelope"></i>{SITE.contact.generalEmail}
                                    </span>
                                    <span className={isPlaceholder(SITE.contact.phone) ? "had-placeholder" : ""}>
                                        <i className="fa-solid fa-phone"></i>{SITE.contact.phone}
                                    </span>
                                </div>
                                <Link to="/contact" className="te-theme-btn mt-3">Contact HAD</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SideBarMenu;