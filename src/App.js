import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Main from './Component/Home/Home'; 
import Diary from './Component/diary/diary'; 
import Info from './Component/info/info'; 
import InfoNext1 from './Component/info/info_next1';
import InfoNext2 from './Component/info/info_next2';
import Details from './Component/diary/Details';
import Footer from './Component/Home/footer'; 
import Diary_crops from "./Component/diary_crops/diary_crops";

import Login from './Component/Login/login';
import SignUp from './Component/Login/SignUp';
import Detail from './Component/Home/Detail';

import Address from './Component/Home/address';

import Test from './Component/Home/test';

import Loading from './Component/sub/loading';



function App() {
  return (
    <Router>
      <div style={{ backgroundColor: "#F0F0F0", minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/diary" element={<Diary />} />
          <Route path="/info" element={<Info />} />
          <Route path="/InfoNext1" element={<InfoNext1 />} />
          <Route path="/InfoNext2" element={<InfoNext2 />} />
          <Route path="/details/:date" element={<Details />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/Detail" element={<Detail />} />
          <Route path="/address" element={<Address />} />
          <Route path="/diary/crops" element={<Diary_crops />} />

          <Route path="/Test" element={<Test />} />
          <Route path="/Loading" element={<Loading />} />

        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
