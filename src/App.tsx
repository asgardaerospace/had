import 'bootstrap/dist/css/bootstrap.min.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import 'react-modal-video/css/modal-video.css'
import 'animate.css/animate.min.css';
import '../src/assets/css/fontawesome.min.css';
import '../src/assets/css/custom.css';
import '../src/assets/css/style.css';
import '../src/assets/css/had-overrides.css';
import Routers from './Routers';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ScrollToTop } from 'react-simple-scroll-up';

/**
 * Hemisphere Aerospace Defense application shell.
 *
 * Two deliberate changes from the template:
 *
 * 1. No preloader. The template gated the first render behind a fixed 1200ms
 *    setTimeout, which added 1.2 seconds to Largest Contentful Paint on every
 *    cold load and, more seriously, meant a prerendered page would have
 *    serialized the spinner instead of the page content. Content now renders
 *    immediately.
 *
 * 2. No global page metadata. Title, description, canonical, Open Graph, and
 *    JSON-LD are set per route by <Seo>, driven from config/seo.ts. This
 *    Helmet carries only the document-level defaults that are genuinely the
 *    same on every page.
 *
 * Bootstrap's JS bundle is imported on the client only: it touches `document`
 * at module scope and would throw during the prerender pass.
 */
function App() {
  useEffect(() => {
    // @ts-expect-error bootstrap's UMD bundle ships no type declarations.
    import('bootstrap/dist/js/bootstrap.bundle');
  }, []);

  return (
    <>
      <Helmet>
        <html lang="en" />
        <meta name="theme-color" content="#0E1C33" />
        <link rel="shortcut icon" href="/images/logo/favicon.png" />
      </Helmet>
      <ScrollToTop symbol={<i className="fa-solid fa-arrow-up"></i>} />
      <Routers />
    </>
  )
}

export default App
