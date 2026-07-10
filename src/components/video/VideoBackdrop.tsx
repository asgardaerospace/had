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
    /**
     * Seamless loop. Instead of the browser's hard cut back to frame 0, a second
     * player is dissolved in over the loop seam so the repeat has no visible jump.
     * Uses two stacked <video> elements, so reserve it for a focal video (the hero).
     */
    crossfadeLoop?: boolean;
    /** Length of the loop crossfade in seconds (only with crossfadeLoop). */
    crossfadeDuration?: number;
};

/**
 * Decorative looping video background.
 *
 * - The poster paints instantly; the MP4 streams in, then plays muted + looped.
 * - Lazy by default: the video is only fetched and played once scrolled into
 *   view (IntersectionObserver) and is paused when off-screen; keeps the page
 *   light and avoids several videos decoding at once.
 * - Respects prefers-reduced-motion: the video is never loaded; the poster
 *   image alone is shown. Purely decorative (aria-hidden); meaning lives in the
 *   adjacent copy.
 * - crossfadeLoop: two stacked players hand off across the loop point with an
 *   opacity dissolve, so a video whose last frame differs from its first still
 *   repeats without a visible cut.
 */
const VideoBackdrop = ({
    src,
    poster,
    className = "",
    objectPosition,
    eager = false,
    playbackRate = 1,
    crossfadeLoop = false,
    crossfadeDuration = 0.8,
}: VideoBackdropProps) => {
    const wrapRef = useRef<HTMLDivElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const aRef = useRef<HTMLVideoElement | null>(null);
    const bRef = useRef<HTMLVideoElement | null>(null);
    const frontRef = useRef<"a" | "b">("a");
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
                        // Crossfade mode: resume whichever player is currently in front.
                        if (crossfadeLoop) {
                            (frontRef.current === "a" ? aRef.current : bRef.current)?.play().catch(() => { });
                        }
                    } else {
                        videoRef.current?.pause();
                        // Crossfade mode: pause both players while off-screen.
                        if (crossfadeLoop) { aRef.current?.pause(); bRef.current?.pause(); }
                    }
                });
            },
            { threshold: 0.2 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, [reduced, eager, crossfadeLoop]);

    // Single-player mode: keep playbackRate + playback in sync.
    useEffect(() => {
        if (crossfadeLoop) return;
        if (active && !reduced && videoRef.current) {
            videoRef.current.playbackRate = playbackRate;
            videoRef.current.play().catch(() => { });
        }
    }, [active, reduced, playbackRate, crossfadeLoop]);

    // Crossfade-loop driver: dissolve the tail of the playing clip into a fresh
    // copy so the seam never shows. The incoming player fades in on top of the
    // outgoing one (which stays fully opaque behind it), so the mix keeps full
    // opacity throughout, so there is no darkening dip.
    useEffect(() => {
        if (!crossfadeLoop || !active || reduced) return;
        const a = aRef.current;
        const b = bRef.current;
        if (!a || !b) return;
        const fade = crossfadeDuration;

        // Front = visible player (z 2, opacity 1). Back = ready player (z 1, opacity 0).
        frontRef.current = "a";
        a.playbackRate = playbackRate;
        b.playbackRate = playbackRate;
        a.style.zIndex = "2"; a.style.opacity = "1";
        b.style.zIndex = "1"; b.style.opacity = "0";
        try { a.currentTime = 0; } catch { /* not seekable yet */ }
        try { b.currentTime = 0; } catch { /* not seekable yet */ }
        b.pause();
        a.play().catch(() => { });

        let timer = 0;

        const onTimeUpdate = () => {
            const front = frontRef.current === "a" ? a : b;
            const back = frontRef.current === "a" ? b : a;
            const d = front.duration;
            if (!d || Number.isNaN(d) || d < fade * 2) return;
            if (front.currentTime < d - fade) return;

            // Bring the back player in over the top, dissolving from 0 -> 1.
            try { back.currentTime = 0; } catch { /* ignore */ }
            back.playbackRate = playbackRate;
            back.style.zIndex = "2";
            back.style.opacity = "1";
            back.play().catch(() => { });
            // The outgoing player drops behind and keeps playing its tail, still
            // fully opaque, until the incoming one has fully covered it.
            front.style.zIndex = "1";
            const fadingOut = front;
            frontRef.current = frontRef.current === "a" ? "b" : "a";
            window.clearTimeout(timer);
            timer = window.setTimeout(() => {
                fadingOut.style.opacity = "0";
                fadingOut.pause();
                try { fadingOut.currentTime = 0; } catch { /* ignore */ }
            }, fade * 1000);
        };

        // Safety net: if a clip is too short to crossfade it would otherwise
        // freeze on its last frame (no native loop here). Hard-restart it.
        const onEnded = (e: Event) => {
            const front = frontRef.current === "a" ? a : b;
            if (e.target === front) {
                try { front.currentTime = 0; } catch { /* ignore */ }
                front.play().catch(() => { });
            }
        };

        a.addEventListener("timeupdate", onTimeUpdate);
        b.addEventListener("timeupdate", onTimeUpdate);
        a.addEventListener("ended", onEnded);
        b.addEventListener("ended", onEnded);
        return () => {
            a.removeEventListener("timeupdate", onTimeUpdate);
            b.removeEventListener("timeupdate", onTimeUpdate);
            a.removeEventListener("ended", onEnded);
            b.removeEventListener("ended", onEnded);
            window.clearTimeout(timer);
        };
    }, [crossfadeLoop, active, reduced, playbackRate, crossfadeDuration]);

    const base: React.CSSProperties = objectPosition ? { objectPosition } : {};

    return (
        <div ref={wrapRef} className={`had-video-backdrop ${className}`} aria-hidden="true">
            <img
                className="had-video-poster"
                src={poster}
                alt=""
                aria-hidden="true"
                loading={eager ? "eager" : "lazy"}
                style={base}
            />

            {!reduced && active && !crossfadeLoop && (
                <video
                    ref={videoRef}
                    className="had-video-el"
                    poster={poster}
                    muted
                    loop
                    playsInline
                    preload="auto"
                    autoPlay
                    style={base}
                    onLoadedMetadata={(e) => { e.currentTarget.playbackRate = playbackRate; }}
                    onCanPlay={(e) => { e.currentTarget.playbackRate = playbackRate; }}
                >
                    <source src={src} type="video/mp4" />
                </video>
            )}

            {!reduced && active && crossfadeLoop && (
                <>
                    <video
                        ref={aRef}
                        className="had-video-el"
                        poster={poster}
                        muted
                        playsInline
                        preload="auto"
                        style={{ ...base, opacity: 1, zIndex: 2, transition: `opacity ${crossfadeDuration}s linear` }}
                        onLoadedMetadata={(e) => { e.currentTarget.playbackRate = playbackRate; }}
                        onCanPlay={(e) => { e.currentTarget.playbackRate = playbackRate; }}
                    >
                        <source src={src} type="video/mp4" />
                    </video>
                    <video
                        ref={bRef}
                        className="had-video-el"
                        poster={poster}
                        muted
                        playsInline
                        preload="auto"
                        style={{ ...base, opacity: 0, zIndex: 1, transition: `opacity ${crossfadeDuration}s linear` }}
                        onLoadedMetadata={(e) => { e.currentTarget.playbackRate = playbackRate; }}
                        onCanPlay={(e) => { e.currentTarget.playbackRate = playbackRate; }}
                    >
                        <source src={src} type="video/mp4" />
                    </video>
                </>
            )}
        </div>
    );
};

export default VideoBackdrop;
