import { Route, Routes } from 'react-router-dom';
import Home from './pages/homePages/Home1';
import About from './pages/innerPages/About';
import Programs from './pages/innerPages/Programs';
import ProgramDetails from './pages/innerPages/ProgramDetails';
import Approach from './pages/innerPages/Approach';
import Leadership from './pages/innerPages/Leadership';
import LeadershipDetails from './pages/innerPages/TeamDetails';
import Contact from './pages/innerPages/Contact';
import Privacy from './pages/innerPages/Privacy';
import Terms from './pages/innerPages/Terms';

/**
 * Hemisphere Defense (HAD) corporate + program-portfolio routes.
 * Individual programs (e.g. the Paul Revere Program, built around the AYDLL
 * platform) have dedicated external websites; this site introduces them and
 * routes visitors outward.
 */
const Routers = () => {
    return (
        <>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/about' element={<About />}></Route>
                <Route path='/programs' element={<Programs />}></Route>
                <Route path='/program-details/:id' element={<ProgramDetails />}></Route>
                <Route path='/approach' element={<Approach />}></Route>
                <Route path='/leadership' element={<Leadership />}></Route>
                <Route path='/leadership/:id' element={<LeadershipDetails />}></Route>
                <Route path='/contact' element={<Contact />}></Route>
                <Route path='/privacy' element={<Privacy />}></Route>
                <Route path='/terms' element={<Terms />}></Route>
            </Routes>
        </>
    );
};

export default Routers;
