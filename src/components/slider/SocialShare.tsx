import { Link } from "react-router-dom";

/**
 * Restrained social presence. LinkedIn placeholder only — no consumer-social
 * clutter. Replace the href with the approved HAD LinkedIn URL when available.
 */
const SocialShare = () => {
    return (
        <>
            <Link to="#" aria-label="LinkedIn (link pending)"><i className="fa-brands fa-linkedin-in"></i></Link>
        </>
    );
};

export default SocialShare;
