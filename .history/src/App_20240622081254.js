import Navbar from './component/Navbar/Navbar.js';
import { Routes, Route } from 'react-router-dom';
import Intro from './pages/Intro/Intro.js';

import TrangChu from './pages/TrangChu/TrangChu.js';
import CoNew1 from './pages/TrangChu/News/New1/New1.jsx';
import CoNew2 from './pages/TrangChu/News/New2/New2.jsx';
import CoNew3 from './pages/TrangChu/News/New3/New3.jsx';


import CongDong from './pages/CongDong/CongDong.js';
import ChienDich from './pages/ChienDich/ChienDich.js';
import Quy from './pages/Quy/Quy.js';
import TaiKhoan from './pages/TaiKhoan/TaiKhoan.js';
import User from './pages/User/User.js';
import PageDetail from './pages/ChienDich/page/PageDetail/PageDetail.js';
import CreateCampaign from './pages/ChienDich/page/CreateCampaign/CreateCampaign.js';
import Manager from './pages/ChienDich/page/Manager/Manager.js';
import UpdateCampaign from './pages/ChienDich/page/UpdateCampaign/UpdateCampaign.js';
import Footer from './component/Footer/Footer.js'

import ScrollToTop from './component/Utilities/ScrollToTop.jsx';



function App() {
  return (
    <div>
      <Navbar />
      <div style={{ height: '3.7rem' }}></div>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Intro />} />

        <Route path="/TrangChu" element={<TrangChu />} />
        <Route path="/TrangChu/New1" element={<CoNew1 />} />
        <Route path="/TrangChu/New2" element={<CoNew2 />} />
        <Route path="/TrangChu/New3" element={<CoNew3 />} />


        <Route path="/CongDong" element={<CongDong />} />
        <Route path="/ChienDich" element={<ChienDich />} />
        <Route path="/Quy" element={<Quy />} />
        <Route path="/TaiKhoan" element={<TaiKhoan />} />
        <Route path="/User" element={<User />} />

        <Route path="/campaign-detail" element={<PageDetail />} />
        <Route path="/CreateCampaign" element={<CreateCampaign />} />
        <Route path="/UpdateCampaign" element={<UpdateCampaign />} />
        <Route path="/Manager" element={<Manager />} />
      </Routes>
    </div>
  );
}

export default App;