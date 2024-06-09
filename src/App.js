import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar/Navbar.js';
import Intro from './Intro/Intro.js';
import TrangChu from './TrangChu/TrangChu.js';
import CongDong from './CongDong/CongDong.js';
import ChienDich from './ChienDich/ChienDich.js';
import Quy from './Quy/Quy.js';
import TaiKhoan from './TaiKhoan/TaiKhoan.js';
import User from './User/User.js';

function App() {
  return (
    <Router basename="/VietNamJourney">
      <div>
        <Navbar />
        <div style={{ height: '3.8rem' }}></div>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/TrangChu" element={<TrangChu />} />
          <Route path="/CongDong" element={<CongDong />} />
          <Route path="/ChienDich" element={<ChienDich />} />
          <Route path="/Quy" element={<Quy />} />
          <Route path="/TaiKhoan" element={<TaiKhoan />} />
          <Route path="/User" element={<User />} />
          {/* Thêm các Route khác ở đây */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;