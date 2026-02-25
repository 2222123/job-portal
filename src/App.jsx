import React, { useContext } from 'react';
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ApplyJob from "./pages/ApplyJob"; 
import Applications from "./pages/Applications"; 
import Navbar from "./components/Navbar";
import RecruiterLogin from "./components/RecruiterLogin";
import { AppContext } from './context/AppContext';

const App = () => {

  // AppContext nundi showRecruiterLogin state ni teesukuntunnam
  const { showRecruiterLogin } = useContext(AppContext);

  return (
    <div>
      {/* 1. Recruiter Login Popup - Idi true ainappude kanipisthundi */}
      {showRecruiterLogin && <RecruiterLogin />}

      {/* 2. Global Navbar - Idi anni pages ki common ga untundi */}
      <Navbar /> 

      {/* 3. Page Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        
        {/* URL parameters (:id) use chesi dynamic ga job page open avthundi */}
        <Route path="/apply-job/:id" element={<ApplyJob />} />
        
        <Route path="/applications" element={<Applications />} />
      </Routes>
    </div>
  );
};

export default App;