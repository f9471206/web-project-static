import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/home-components";
import PostComponent from "./components/post-component";
import TweetComponents from "./components/tweet-components";
import ProfileComponents from "./components/profile-components";
import "./styles/style.css";
import { useState } from "react";

function App() {
  const [data, setData] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            path="/"
            element={<Home data={data} setData={setData} />}
          ></Route>
          <Route
            path="/:_tag"
            element={<Home data={data} setData={setData} />}
          ></Route>
          {/* 個別文章 */}
          <Route path="/post/:_id" element={<PostComponent />}></Route>
          {/* 發表貼文 */}
          <Route path="/tweet" element={<TweetComponents />}></Route>
          {/* 編輯文章 */}
          <Route path="/tweet-edit/:_id" element={<TweetComponents />}></Route>
          {/* 個人資料 */}
          <Route
            path="/user-profile/:_id"
            element={<ProfileComponents />}
          ></Route>
          <Route
            path="/user-profile/:_id/:_replys"
            element={<ProfileComponents />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
