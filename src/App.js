import Navbar from './component/Navbar/Navbar.js';
import { Routes, Route } from 'react-router-dom';
import Intro from './pages/Intro/Intro.js'
import TrangChu from './pages/TrangChu/TrangChu.js'
import CongDong from './pages/CongDong/CongDong.js'
import ChienDich from './pages/ChienDich/ChienDich.js'
import Quy from './pages/Quy/Quy.js'
import TaiKhoan from './pages/TaiKhoan/TaiKhoan.js'
import User from './pages/User/User.js'

function App() {
  return (
    <div>
      <Navbar />
      <div style={{ height: '3.8rem' }}></div>
      <Routes>
      <Route path="/VietNamJourney/" element={<Intro />} />
      <Route path="/VietNamJourney/TrangChu" element={<TrangChu />} />
      <Route path="/VietNamJourney/CongDong" element={<CongDong />} />
      <Route path="/VietNamJourney/ChienDich" element={<ChienDich />} />
      <Route path="/VietNamJourney/Quy" element={<Quy />} />
      <Route path="/VietNamJourney/TaiKhoan" element={<TaiKhoan />} />
      <Route path="/VietNamJourney/User" element={<User />} />
      {/* Thêm các Route khác ở đây */}
      </Routes>
    </div>
    
  );
}

export default App;