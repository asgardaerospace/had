import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import MainMenu from './MainMenu';
import HeaderLogo from './HeaderLogo';
import SideBarMenu from './SideBarMenu';
import SideBarOverlay from './SideBarOverlay';
import { SITE, EXTERNAL_LINK_PROPS, isPlaceholder } from "../../config/site";

const HeaderV1 = () => {

    const haiReady = !isPlaceholder(SITE.external.hai);

    // Sticky Menu 
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 5) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);



    // SideBar 
    const [isMenuActive, setMenuActive] = useState(false);

    const openMenu = () => {
        setMenuActive(true);
    };

    const closeMenu = () => {
        setMenuActive(false);
    };

    const handleOverlayClick = () => {
        closeMenu();
    };

    // Mobile DropDown 
    const toggleSubMenu = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const listItem = (e.target as HTMLElement).parentElement;
        if (!listItem) return;

        const subMenu = listItem.querySelector('ul.te-submenu') as HTMLElement | null;
        if (subMenu) {
            listItem.classList.toggle('on');
            subMenu.style.maxHeight = subMenu.style.maxHeight === "20000px" ? "0" : "20000px";
        }
    };

    return (

        <>

            {/* Header Start !*/}
            <header className="header-area style-3">
                {/* Header Top Start: HAI corporate linkage, kept visually secondary */}
                <div className="header-top had-header-top">
                    <div className="container">
                        <div className="row ">
                            <div className="col-12">
                                <div className="te-header-top-wrapper">
                                    <div className="header-top-info">
                                        <span className="had-header-top-note">
                                            A Hemisphere Aerospace Investments (HAI) company
                                        </span>
                                    </div>
                                    <div className="header-top-info">
                                        {haiReady ? (
                                            <a href={SITE.external.hai} {...EXTERNAL_LINK_PROPS} className="had-header-top-link">
                                                Visit {SITE.parent.shortName}
                                                <i className="fa fa-solid fa-arrow-up-right-from-square ms-2" />
                                            </a>
                                        ) : (
                                            <span className="had-header-top-link had-placeholder">
                                                {SITE.parent.shortName} website link pending
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Header Top End */}
                {/* Header Nav Menu Start */}
                <div className={`te-header-menu-area te-sticky-header ${isSticky ? "te-sticky_menu" : ""}`}>
                    <div className="container">
                        <div className="container">
                            <div className="row menu-wrapper">
                                <div className="col-xl-3 col-lg-3 col-md-6 col-6 d-flex align-items-center">
                                    <HeaderLogo />
                                </div>
                                <div className="col-xl-9 col-lg-9 col-md-6 col-6 d-flex align-items-center justify-content-end">
                                    <div className="te-menu d-lg-inline-block d-none">
                                        <MainMenu toggleSubMenu={toggleSubMenu} />
                                    </div>
                                    {/* Header Button Start !*/}
                                    <div className="te-header-btn d-none d-xl-flex">
                                        <Link to="/programs" className="te-theme-btn had-header-cta">
                                            Explore Programs
                                            <i className="fa fa-solid fa-arrow-right" />
                                        </Link>
                                    </div>
                                    {/* Header Button End !*/}
                                    {/* Mobile Menu Toggle Button Start !*/}
                                    <div className="te-mobile-menu-bar d-lg-none text-end">
                                        <Link
                                            to="#"
                                            className="te-mobile-menu-toggle-btn"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                openMenu();
                                            }}
                                        >
                                            <i className="fal fa-bars"></i>
                                        </Link>
                                    </div>
                                    {/* Mobile Menu Toggle Button End !*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Header Nav Menu End */}
            </header>
            {/* Header End !*/}

            <SideBarMenu toggleSubMenu={toggleSubMenu} closeMenu={closeMenu} isMenuActive={isMenuActive} />

            <SideBarOverlay isMenuActive={isMenuActive} handleOverlayClick={handleOverlayClick} />

        </>
    );
};

export default HeaderV1;