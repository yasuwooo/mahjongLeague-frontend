import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";

const ChangePassword = () => {
  const { csrfToken } = useAuth();
  const { token } = useParams();

  const [formData, setFormData] = useState({
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
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/changepassword/verify/${token}`,
        {
          email: formData.password,
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
      <div className="flex items-center w-2/3 h-5/6">
        <div className="basis-1/2 h-full">
          <img
            src="/auth/loginImg.jpg"
            alt="loginImg"
            className="object-cover h-full w-full"
          />
        </div>
        <div className="basis-1/2 h-full bg-white flex flex-col items-center justify-center">
          <div className="basis-1/3 flex items-center">
            <span className="text-indigo-900 font-bold text-4xl">
              守田研Mリーグ
            </span>
          </div>
          <form
            onSubmit={handleSubmit}
            className="basis-2/3 h-full flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center justify-center">
              <div className="mt-8">
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-4 pr-4 bg-indigo-200 rounded-xl outline-none text-2xl"
                />
              </div>
              <div className="mt-8">
                <input
                  type="password"
                  name="password"
                  placeholder="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-4 pr-4 bg-indigo-200 rounded-xl outline-none text-2xl"
                />
              </div>
              <div className="mt-8">
                <input
                  type="password"
                  name="passwordCheck"
                  placeholder="confirm password"
                  value={formData.passwordCheck}
                  onChange={handleChange}
                  className="pl-4 pr-4 bg-indigo-200 rounded-xl outline-none text-2xl"
                />
              </div>
              <div className="mt-8">
                <div>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-950 text-white text-2xl mt-6 pt-2 pb-2 pl-3 pr-3"
                  >
                    Change Password
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

export default ChangePassword;
