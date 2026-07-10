import { useEffect, useRef, useState } from "react";

type VideoBackdropProps = {
    /** Web-optimized MP4 (H.264, faststart, muted-safe). */
    src: string;
    /** Poster still shown instantly and to reduced-motion users. */
    poster: string;
    className?: string;
    /** CSS object-position for both poster and video (e.g. "center right"). */
    objectPosition?: string;
    /** Hero use: load immediately instead of waiting for viewport intersection. */
    eager?: boolean;
    /** Playback speed. < 1 slows the motion for a subtle, cinematic drift. */
    playbackRate?: number;
};

/**
 * Decorative looping video background.
 *
 * - The poster paints instantly; the MP4 streams in, then plays muted + looped.
 * - Lazy by default: the video is only fetched and played once scrolled into
 *   view (IntersectionObserver) and is paused when off-screen — keeps the page
 *   light and avoids several videos decoding at once.
 * - Respects prefers-reduced-motion: the video is never loaded; the poster
 *   image alone is shown. Purely decorative (aria-hidden); meaning lives in the
 *   adjacent copy.
 */
const VideoBackdrop = ({ src, poster, className = "", objectPosition, eager = false, playbackRate = 1 }: VideoBackdropProps) => {
    const wrapRef = useRef<HTMLDivElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [active, setActive] = useState(false);
    const [reduced, setReduced] = useState(false);

    // Track reduced-motion preference (and honor live changes).
    useEffect(() => {
        const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
        setReduced(mq.matches);
        const onChange = () => setReduced(mq.matches);
        mq.addEventListener?.("change", onChange);
        return () => mq.removeEventListener?.("change", onChange);
    }, []);

    // Decide when the <video> is allowed to mount and play.
    useEffect(() => {
        if (reduced) { setActive(false); return; }
        if (eager) { setActive(true); return; }
        const el = wrapRef.current;
        if (!el || typeof IntersectionObserver === "undefined") { setActive(true); return; }
        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActive(true);
                        videoRef.current?.play().catch(() => { });
                    } else {
                        videoRef.current?.pause();
                    }
                });
            },
            { threshold: 0.2 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, [reduced, eager]);

    useEffect(() => {
        if (active && !reduced && videoRef.current) {
            videoRef.current.playbackRate = playbackRate;
            videoRef.current.play().catch(() => { });
        }
    }, [active, reduced, playbackRate]);

    const style = objectPosition ? ({ objectPosition } as React.CSSProperties) : undefined;

    return (
        <div ref={wrapRef} className={`had-video-backdrop ${className}`} aria-hidden="true">
            <img
                className="had-video-poster"
                src={poster}
                alt=""
                aria-hidden="true"
                loading={eager ? "eager" : "lazy"}
                style={style}
            />
            {!reduced && active && (
                <video
                    ref={videoRef}
                    className="had-video-el"
                    poster={poster}
                    muted
                    loop
                    playsInline
                    preload="auto"
                    autoPlay
                    style={style}
                    onLoadedMetadata={(e) => { e.currentTarget.playbackRate = playbackRate; }}
                    onCanPlay={(e) => { e.currentTarget.playbackRate = playbackRate; }}
                >
                    <source src={src} type="video/mp4" />
                </video>
            )}
        </div>
    );
};

export default VideoBackdrop;
