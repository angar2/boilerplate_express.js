import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import NavBar from "./components/views/NavBar/NavBar";
import Footer from "./components/views/Footer/Footer";
import UploadVideoPage from "./components/views/UploadVideoPage/UploadVideoPage";
import DetailVideoPage from "./components/views/DetailVideoPage/DetailVideoPage";
import Auth from './hoc/auth';

function App() {

  const AuthLandingPage = Auth(LandingPage, null);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthRegisterPage = Auth(RegisterPage, false);
  const AuthUploadVideoPage = Auth(UploadVideoPage, true);
  const AuthDetailVideoPage = Auth(DetailVideoPage, true);

  return (
    <Router>
      <NavBar />
      <div style={{ paddingTop: '70px', minHeight: 'calc(100vh - 80px)' }}>
        <Routes>
          <Route path="/*" element={<AuthLandingPage />}/>
          <Route path="/login" element={<AuthLoginPage />}/>
          <Route path="/register" element={<AuthRegisterPage />}/>
          <Route path="/video/upload" element={<AuthUploadVideoPage />}/>
          <Route path="/video/:videoId" element={<AuthDetailVideoPage />}/>
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
