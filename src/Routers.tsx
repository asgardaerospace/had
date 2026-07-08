import { Route, Routes } from 'react-router-dom';
import Home from './pages/homePages/Home1';
import About from './pages/innerPages/About';
import Programs from './pages/innerPages/Programs';
import ProgramDetails from './pages/innerPages/ProgramDetails';
import Approach from './pages/innerPages/Approach';
import Leadership from './pages/innerPages/Leadership';
import LeadershipDetails from './pages/innerPages/TeamDetails';
import Contact from './pages/innerPages/Contact';

/**
 * Hemisphere Defense (HAD) corporate + program-portfolio routes.
 * Individual programs (e.g. AYDLL / IDL) have dedicated external websites;
 * this site introduces them and routes visitors outward.
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
            </Routes>
        </>
    );
};

export default Routers;
