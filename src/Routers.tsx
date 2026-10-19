import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import Home from './pages/homePages/Home1';
import About from './pages/innerPages/About';
import Capabilities from './pages/innerPages/Capabilities';
import Domains from './pages/innerPages/Domains';
import Programs from './pages/innerPages/Programs';
import ProgramDetails from './pages/innerPages/ProgramDetails';
import Approach from './pages/innerPages/Approach';
import Leadership from './pages/innerPages/Leadership';
import LeadershipDetails from './pages/innerPages/TeamDetails';
import Insights from './pages/innerPages/Insights';
import InsightDetails from './pages/innerPages/InsightDetails';
import Certifications from './pages/innerPages/Certifications';
import Contact from './pages/innerPages/Contact';
import Privacy from './pages/innerPages/Privacy';
import Terms from './pages/innerPages/Terms';
import NotFound from './pages/innerPages/NotFound';
import ProgramsData from './jsonData/programs/ProgramsData.json';
import LeadershipData from './jsonData/leadership/LeadershipData.json';

/**
 * Hemisphere Aerospace Defense corporate + program-portfolio routes.
 *
 * URL policy
 * ----------
 * Canonical URLs are descriptive and name the entity:
 *   /programs/paul-revere-program   (was /program-details/aydll-idl)
 *   /leadership/john-b-sawyer       (was /leadership/exec-1)
 *
 * The old template-generated paths still resolve, but redirect to the
 * canonical slug so no existing link, bookmark, or capability-statement
 * reference breaks. These client-side redirects are the fallback; the
 * authoritative ones are permanent redirects at the edge, in vercel.json, so
 * search engines see a real permanent redirect rather than a JS hop.
 *
 * vercel.json cannot carry comments (its schema rejects unknown properties),
 * so the policy is documented here instead. Those eight rules are generated
 * from the id and slug fields in src/jsonData; regenerate them if either
 * changes, and keep every redirect destination a real prerendered route.
 *
 * Anything unmatched renders a real 404 page carrying meta robots noindex,
 * instead of the previous behaviour where an unknown URL returned HTTP 200
 * with only the header and footer, creating an indexable soft 404.
 */

type ProgramRecord = { id: string; slug: string };
type LeaderRecord = { id: string; slug: string };
type LeaderGroup = { members: LeaderRecord[] };

/** Resolve a legacy :id to its canonical slug, or null if it is unknown. */
const legacyProgramSlug = (id?: string) =>
    (ProgramsData as ProgramRecord[]).find((p) => p.id === id)?.slug ?? null;

const legacyLeaderSlug = (id?: string) =>
    (LeadershipData as LeaderGroup[])
        .flatMap((g) => g.members)
        .find((m) => m.id === id)?.slug ?? null;

/** /program-details/:id -> /programs/:slug, else 404. */
const LegacyProgramRedirect = () => {
    const { id } = useParams();
    const slug = legacyProgramSlug(id);
    return slug ? <Navigate to={`/programs/${slug}`} replace /> : <NotFound />;
};

/** /leadership/exec-1 -> /leadership/john-b-sawyer, else 404. */
const LeadershipRoute = () => {
    const { slug } = useParams();
    const legacy = legacyLeaderSlug(slug);
    // A legacy id was used and it maps to a different canonical slug.
    if (legacy && legacy !== slug) return <Navigate to={`/leadership/${legacy}`} replace />;
    return <LeadershipDetails />;
};

const Routers = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/capabilities' element={<Capabilities />} />
            <Route path='/domains' element={<Domains />} />

            <Route path='/programs' element={<Programs />} />
            <Route path='/programs/:slug' element={<ProgramDetails />} />
            {/* Legacy template path, retained as a redirect. */}
            <Route path='/program-details/:id' element={<LegacyProgramRedirect />} />

            <Route path='/approach' element={<Approach />} />
            <Route path='/leadership' element={<Leadership />} />
            <Route path='/leadership/:slug' element={<LeadershipRoute />} />
            <Route path='/insights' element={<Insights />} />
            <Route path='/insights/:slug' element={<InsightDetails />} />
            <Route path='/certifications' element={<Certifications />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/privacy' element={<Privacy />} />
            <Route path='/terms' element={<Terms />} />

            <Route path='/404' element={<NotFound />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
};

export default Routers;
