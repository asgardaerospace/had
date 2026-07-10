import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Route-change scroll manager.
 * - No hash: jump to top on navigation (default SPA behavior).
 * - With hash (e.g. "/#domains"): scroll the target section into view once it
 *   exists. Retries briefly so it still works on a cold deep-link that has to
 *   wait out the app preloader before the section mounts. Respects
 *   reduced-motion. Enables the "Domains" nav item and hero CTAs to anchor into
 *   home-page sections from any route.
 */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const id = hash.replace('#', '');
      let tries = 0;
      let timer: number;
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
          return;
        }
        // Section not mounted yet (e.g. preloader still showing) — retry.
        if (tries++ < 25) timer = window.setTimeout(tryScroll, 120);
      };
      timer = window.setTimeout(tryScroll, 60);
      return () => window.clearTimeout(timer);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null; // This component doesn't render any UI.
};

export default ScrollToTop;
