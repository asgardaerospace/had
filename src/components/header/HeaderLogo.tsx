import { Link } from "react-router-dom";

/**
 * HAD wordmark. Text-based placeholder standing in for an approved logo asset.
 * Swap the inner markup for an <img> once brand artwork is provided.
 */
const HeaderLogo = () => {
    return (
        <div className="te-logo had-wordmark-wrap">
            <Link to="/" className="had-wordmark" aria-label="Hemisphere Defense home">
                <span className="had-wordmark-mark">HAD</span>
                <span className="had-wordmark-text">
                    HEMISPHERE<span className="had-wordmark-text-2">DEFENSE</span>
                </span>
            </Link>
        </div>
    );
};

export default HeaderLogo;
