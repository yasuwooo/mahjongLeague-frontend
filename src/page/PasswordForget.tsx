import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";

const PasswordForget = () => {
  const { csrfToken } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
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
        `${process.env.REACT_APP_API_URL}/changepassword`,
        {
          email: formData.email,
        },
        {
          headers: {
            "X-CSRF-Token": csrfToken, // 取得したCSRFトークンをヘッダーに追加
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
      <div className="flex items-center w-11/12 h-11/12 bg-white">
        <div className="basis-0 sm:basis-2/5 h-full">
          <img
            src="/auth/loginImg.jpg"
            alt="loginImg"
            className="object-cover h-full w-full"
          />
        </div>
        <div className="basis-full sm:basis-3/5 h-full bg-white flex flex-col items-center justify-center pt-20 sm:pt-0 pb-20 sm:pb-20">
          <div className=" basis-1/4 flex  items-center">
            <span className="text-indigo-900 font-bold text-4xl">
              守田研Mリーグ
            </span>
          </div>
          <form
            onSubmit={handleSubmit}
            className="basis-2/4 h-full w-full flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center justify-center w-full">
              <div className="mt-4 w-full">
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="pl-4 pr-4 bg-indigo-200 rounded-xl outline-none text-xl sm:text-2xl w-11/12"
                  onChange={handleChange}
                ></input>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  className="rounded-md bg-indigo-950 text-white text-2xl mt-6 pt-2 pb-2 pl-3 pr-3"
                >
                  Change Password
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordForget;
