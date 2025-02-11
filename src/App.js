import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Main from './Component/Home/Home'; 
import Diary from './Component/diary/diary'; 
import Info from './Component/info/info'; 
import Details from './Component/diary/Details'; 
import Footer from './Component/Home/footer'; 

import Login from './Component/Login/login';
import SignUp from './Component/Login/SignUp';


function App() {
  return (
    <Router>
      <div style={{ backgroundColor: "#F6F6F8", minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/diary" element={<Diary />} />
          <Route path="/info" element={<Info />} />
          <Route path="/details/:date" element={<Details />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
