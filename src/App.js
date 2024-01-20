import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
// import Login from "./components/login-component";
import ProfileComponent from "./components/profile-component";
import Home from "./components/home";
import RegisterComponent from "./components/register-component";
import OnepostComponent from "./components/onepost-component";
import EditprofileComponent from "./components/editprofile-component";
import ManagEmemberComponent from "./components/managEmember-component";
import "./styles/style.css";
import AuthService from "./services/auth.service";
import WelcomepageComponent from "./components/welcomepage-component";
import { useEffect, useState } from "react";

function App() {
  let [_id, set_id] = useState(""); //用戶_ID

  useEffect(() => {
    if (AuthService.getCurrentUser()) {
      set_id(AuthService.getCurrentUser().user._id);
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout _id={_id} set_id={set_id} />}>
          <Route path="/" element={<WelcomepageComponent />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/profile/:_id"
            element={<ProfileComponent user_id={_id} setuser_id={set_id} />}
          />
          <Route path="/profile/edit/:_id" element={<EditprofileComponent />} />
          <Route path="/home/:_id" element={<OnepostComponent />} />
          <Route path="/manage-member" element={<ManagEmemberComponent />} />
          <Route path="/register" element={<RegisterComponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
