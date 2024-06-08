import Navbar from './Navbar/Navbar.js';
import { Routes, Route } from 'react-router-dom';
import Intro from './Intro/Intro.js'
import TrangChu from './TrangChu/TrangChu.js'
import CongDong from './CongDong/CongDong.js'
import ChienDich from './ChienDich/ChienDich.js'
import Quy from './Quy/Quy.js'
import TaiKhoan from './TaiKhoan/TaiKhoan.js'

function App() {
  return (
    <div>
      <Navbar />
      <div style={{ height: '4rem' }}></div>
      <Routes>
      <Route path="/" element={<Intro />} />
      <Route path="/TrangChu" element={<TrangChu />} />
      <Route path="/CongDong" element={<CongDong />} />
      <Route path="/ChienDich" element={<ChienDich />} />
      <Route path="/Quy" element={<Quy />} />
      <Route path="/TaiKhoan" element={<TaiKhoan />} />
        {/* Thêm các Route khác ở đây */}
      </Routes>
    </div>
    
  );
}

export default App;