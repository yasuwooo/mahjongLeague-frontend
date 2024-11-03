import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";
import Ranking from "./page/Ranking";
import Schedule from "./page/Schedule";
import Profile from "./page/Profile";
import ProfileChange from "./page/ProfileChange";
import MatchRegister from "./page/MatchRegister";
import ChangePassword from "./page/ChangePassword";
import PasswordForget from "./page/PasswordForget";
import NotFound404 from "./page/NotFound404";
import axios from "axios";
import RegisterComplete from "./page/RegisterComplete";
import PrivateRoute from "./context/PrivateRoute";
function App() {
  axios.defaults.withCredentials = true;

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* ホームページ */}
          <Route path="/" element={<Home />} />
          {/* 日程・結果 */}
          <Route path="/schedule" element={<Schedule />} />
          {/* ランキング */}
          <Route path="/ranking" element={<Ranking />} />
          {/* 試合登録 */}
          <Route path="/match" element={<PrivateRoute />}>
            <Route path="/match" element={<MatchRegister />} />
          </Route>
          {/* アカウント仮作成 */}
          <Route path="/auth/register" element={<Register />} />
          {/* アカウント作成 */}
          <Route path="/auth/register/:token" element={<RegisterComplete />} />
          {/* ログイン */}
          <Route path="/auth/login" element={<Login />} />
          {/* パスワード変更時にメールを指定するページ */}
          <Route path="/auth/changepassword" element={<PasswordForget />} />
          {/* パスワード変更 */}
          <Route
            path="/auth/changepassword/:token"
            element={<ChangePassword />}
          />
          {/* プロフィール */}
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          {/* プロフィール変更 */}
          <Route path="/profile/change" element={<PrivateRoute />}>
            <Route index element={<ProfileChange />} />
          </Route>
          {/* その他のすべてのルートに対する404ページ */}
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
