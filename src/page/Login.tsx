import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Login = () => {
  const { csrfToken, setIsLoggedIn } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        {
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "X-CSRF-Token": csrfToken, // 取得したCSRFトークンをヘッダーに追加
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setIsLoggedIn(true);
      }
      alert(response.data);

      window.location.href = "/"; //　ページ"/"に遷移したと同時に再読み込みする
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          alert(error.response.data);
        }
      } else {
        alert("サーバーに接続できませんでした。もう一度お試しください。");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-indigo-300">
      <div className="flex items-center w-11/12 h-11/12 bg-white  pt-20 lg:pt-0 pb-20  lg:pb-0">
        <div className="basis-0 lg:basis-2/5 h-full">
          <img
            src="/auth/loginImg.jpg"
            alt="loginImg"
            className="object-cover h-full w-full"
          />
        </div>
        <div className="basis-full lg:basis-3/5 h-full w-full  flex flex-col items-center justify-center ">
          <div className="basis-1/4 h-full flex items-center">
            <span className="text-indigo-900 font-bold text-4xl">
              守田研Mリーグ
            </span>
          </div>
          <form
            onSubmit={handleSubmit}
            className="basis-2/4 h-full w-full flex flex-col items-center justify-center text-xl sm:text-2xl"
          >
            <div className="flex flex-col items-center justify-center w-full">
              <div className="mt-4 w-11/12">
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-4 pr-4 w-full bg-indigo-200 rounded-xl outline-none"
                />
              </div>
              <div className="mt-8 w-11/12">
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-4 pr-4 w-full bg-indigo-200 rounded-xl outline-none "
                />
              </div>
              <div className="mt-8">
                <button
                  type="submit"
                  className="rounded-md bg-indigo-950 text-white text-2xl mt-6 pt-2 pb-2 pl-3 pr-3"
                >
                  Login
                </button>
              </div>
            </div>
          </form>

          <div className="basis-1/4 w-full">
            <div className="flex items-center justify-center">
              <hr className="mt-6 w-11/12" />
            </div>
            <div className="mt-6  text-center">
              <Link to="/auth/changepassword">パスワードを忘れましたか?</Link>
            </div>
            <div className="mt-6 text-indigo-500 text-center">
              <Link to="/auth/register">新しくアカウントを作る</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
