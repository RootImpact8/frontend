import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Main from './Component/Home/Home'; 
import Diary from './Component/diary/diary'; 
import Info from './Component/info/info'; 
import Details from './Component/diary/Details'; 
import Footer from './Component/Home/footer'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/diary" element={<Diary />} />
        <Route path="/info" element={<Info />} />
        <Route path="/details/:date" element={<Details />} /> 
      </Routes>
      <Footer /> 
    </Router>
  );
}

export default App;
