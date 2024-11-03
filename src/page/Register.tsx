import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";

const Register = () => {
  const { csrfToken } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    passwordCheck: "",
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

    // パスワードとパスワード確認が一致しているかチェック
    if (formData.password !== formData.passwordCheck) {
      alert("パスワードが一致しません。");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/register`,
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "X-CSRF-Token": csrfToken,
          },
          withCredentials: true,
        }
      );
      alert(response.data);
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
      <div className="flex items-center w-11/12 h-11/12 bg-white pt-20 pb-20 md:pt-0 md:pb-0">
        <div className="basis-0 md:basis-1/2 h-full">
          <img
            src="/auth/loginImg.jpg"
            alt="loginImg"
            className="object-cover h-full w-full"
          />
        </div>
        <div className="basis-full md:basis-3/5 h-full w-full flex flex-col items-center justify-center">
          <div className="basis-1/3 flex items-center">
            <span className="text-indigo-900 font-bold text-4xl">
              守田研Mリーグ
            </span>
          </div>
          <form
            onSubmit={handleSubmit}
            className="basis-2/3 h-full w-full flex flex-col items-center justify-center text-xl md:text-2xl"
          >
            <div className="h-full w-full flex flex-col items-center justify-center">
              <div className="mt-4 h-full w-full">
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="pl-4 pr-4 bg-indigo-200 rounded-xl outline-none w-11/12"
                />
              </div>
              <div className="h-full w-full mt-8">
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-4 pr-4 bg-indigo-200 rounded-xl outline-none w-11/12"
                />
              </div>
              <div className="h-full w-full mt-8">
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-4 pr-4 bg-indigo-200 rounded-xl outline-none w-11/12"
                />
              </div>
              <div className="h-full w-full mt-8">
                <input
                  type="password"
                  name="passwordCheck"
                  placeholder="confirm password"
                  value={formData.passwordCheck}
                  onChange={handleChange}
                  className="pl-4 pr-4 bg-indigo-200 rounded-xl outline-none w-11/12"
                />
              </div>
              <div className="mt-8">
                <div>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-950 text-white text-2xl mt-6 pt-2 pb-2 pl-3 pr-3"
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
