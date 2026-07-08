/**
 * SensingMotif — a lightweight, on-theme graphic (concentric sensing/awareness
 * rings, range ticks, and contact nodes) rendered as inline SVG. Used to add
 * depth to the hero and to stand in for approved program imagery.
 *
 * On-brief: evokes sensing / persistent awareness / maritime domain — no
 * personnel, weapons, flags, or camouflage. Color comes from `currentColor`
 * (set via CSS); opacity and placement are controlled by the parent class.
 */
type SensingMotifProps = {
    className?: string;
};

const RINGS = [70, 128, 186, 244, 302];
const NODES = [
    { cx: 372, cy: 190, r: 4 },
    { cx: 214, cy: 128, r: 3 },
    { cx: 430, cy: 356, r: 3.5 },
    { cx: 150, cy: 300, r: 3 },
    { cx: 336, cy: 430, r: 3 },
];

const SensingMotif = ({ className = "" }: SensingMotifProps) => {
    return (
        <svg
            className={`had-motif ${className}`}
            viewBox="0 0 600 600"
            fill="none"
            aria-hidden="true"
            focusable="false"
        >
            {/* range rings */}
            <g stroke="currentColor" strokeWidth="1">
                {RINGS.map((r, i) => (
                    <circle
                        key={r}
                        cx="300"
                        cy="300"
                        r={r}
                        className="had-motif-ring"
                        style={{ animationDelay: `${i * 0.9}s` }}
                        opacity={0.5 - i * 0.06}
                    />
                ))}
            </g>
            {/* crosshair / bearing lines */}
            <g stroke="currentColor" strokeWidth="0.75" opacity="0.22">
                <line x1="300" y1="8" x2="300" y2="592" />
                <line x1="8" y1="300" x2="592" y2="300" />
                <line x1="90" y1="90" x2="510" y2="510" opacity="0.6" />
                <line x1="510" y1="90" x2="90" y2="510" opacity="0.6" />
            </g>
            {/* contact nodes */}
            <g fill="currentColor">
                {NODES.map((n, i) => (
                    <circle key={i} cx={n.cx} cy={n.cy} r={n.r} opacity="0.85" />
                ))}
            </g>
            {/* center */}
            <circle cx="300" cy="300" r="5" fill="currentColor" />
        </svg>
    );
};

export default SensingMotif;
