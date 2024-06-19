import Navbar from './component/Navbar/Navbar.js';
import { Routes, Route } from 'react-router-dom';
import Intro from './pages/Intro/Intro.js';
import TrangChu from './pages/TrangChu/TrangChu.js';
import CongDong from './pages/CongDong/CongDong.js';
import ChienDich from './pages/ChienDich/ChienDich.js';
import Quy from './pages/Quy/Quy.js';
import TaiKhoan from './pages/TaiKhoan/TaiKhoan.js';
import User from './pages/User/User.js';
import PageDetail from './pages/ChienDich/page/PageDetail/PageDetail.js';
import CreateCampaign from './pages/ChienDich/page/CreateCampaign/CreateCampaign.js';
import Manager from './pages/ChienDich/page/Manager/Manager.js';

function App() {
  return (
    <div>
      <Navbar />
      <div style={{ height: '3.7rem' }}></div>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/TrangChu" element={<TrangChu />} />
        <Route path="/CongDong" element={<CongDong />} />
        <Route path="/ChienDich" element={<ChienDich />} />
        <Route path="/Quy" element={<Quy />} />
        <Route path="/TaiKhoan" element={<TaiKhoan />} />
        <Route path="/User" element={<User />} />

        <Route path="/campaign-detail" element={<PageDetail />} />
        <Route path="/CreateCampaign" element={<CreateCampaign />} />
      </Routes>
    </div>
  );
}

export default App;