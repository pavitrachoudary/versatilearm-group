/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Mission from './pages/Mission';
import Portfolio from './pages/Portfolio';
import VLandsDeepDive from './pages/VLandsDeepDive';
import OwnmylandDeepDive from './pages/OwnmylandDeepDive';
import Team from './pages/Team';
import Expertise from './pages/Expertise';
import Investors from './pages/Investors';
import Contact from './pages/Contact';
import News from './pages/News';
import Careers from './pages/Careers';
import VLandsPitchDeck from './pages/VLandsPitchDeck';
import OwnmylandPitchDeck from './pages/OwnmylandPitchDeck';
import { VLands3DInteractive } from './components/VLands3DInteractive';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/pitch" element={<Navigate to="/portfolio" replace />} />
        <Route path="/pitch/vlands" element={<VLandsPitchDeck />} />
        <Route path="/pitch/ownmyland" element={<OwnmylandPitchDeck />} />
        <Route path="/portfolio/vlands/3d" element={<VLands3DInteractive initialFullscreen={true} />} />
        <Route
          path="*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mission" element={<Mission />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/portfolio/vlands" element={<VLandsDeepDive />} />
                <Route path="/portfolio/ownmyland" element={<OwnmylandDeepDive />} />
                <Route path="/team" element={<Team />} />
                <Route path="/expertise" element={<Expertise />} />
                <Route path="/investors" element={<Investors />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/news" element={<News />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}
