import { Link } from "react-router-dom";

/**
 * HAD brand lockup: the approved shield emblem + the company wordmark.
 * The emblem is a transparent-background PNG cropped from the supplied logo;
 * the "HEMISPHERE DEFENSE" text keeps the full name legible at header sizes.
 */
const HeaderLogo = () => {
    return (
        <div className="te-logo had-wordmark-wrap">
            <Link to="/" className="had-wordmark" aria-label="Hemisphere Defense home">
                <img
                    src="/images/logo/had-emblem.png"
                    alt=""
                    className="had-wordmark-emblem"
                    width={52}
                    height={49}
                />
                <span className="had-wordmark-text">
                    HEMISPHERE<span className="had-wordmark-text-2">DEFENSE</span>
                </span>
            </Link>
        </div>
    );
};

export default HeaderLogo;
