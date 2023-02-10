import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import NavBar from "./components/views/NavBar/NavBar";
import Footer from "./components/views/Footer/Footer";
import VideoUploadPage from "./components/views/VideoUploadPage/VideoUploadPage";
import Auth from './hoc/auth';

function App() {

  const AuthLandingPage = Auth(LandingPage, null);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthRegisterPage = Auth(RegisterPage, false);
  const AuthVideoUploadPage = Auth(VideoUploadPage, true);

  return (
    <Router>
      <NavBar />
      <div>
        <Routes>
          <Route path="/*" element={<AuthLandingPage />}/>
          <Route path="/login" element={<AuthLoginPage />}/>
          <Route path="/register" element={<AuthRegisterPage />}/>
          <Route path="/video/upload" element={<AuthVideoUploadPage />}/>
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
