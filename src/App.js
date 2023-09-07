import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./components/login-component";
import ProfileComponent from "./components/profile-component";
import Home from "./components/home";
import RegisterComponent from "./components/register-component";
import OnepostComponent from "./components/onepost-component";
import EditprofileComponent from "./components/editprofile-component";
import "./styles/style.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="profile/:_id" element={<ProfileComponent />} />
          <Route path="profile/edit/:_id" element={<EditprofileComponent />} />
          <Route path="home/:_id" element={<OnepostComponent />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<RegisterComponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
