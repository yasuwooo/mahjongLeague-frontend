import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const RegisterComplete = () => {
  const { csrfToken } = useAuth();
  const { token } = useParams();

  // コンポーネントがマウントされたときにのみアカウントの確認を行う
  useEffect(() => {
    // アカウントの確認を行う
    const verifyAccount = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/register/verify/${token}`,
          {
            withCredentials: true,
            headers: {
              "X-CSRF-Token": csrfToken,
            },
          }
        );
        alert(response.data);
        window.location.href = "/auth/login";
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
    verifyAccount();
  }, []); // トークンが変わったときに再実行

  return <div className="flex text-2xl items-center justify-center"></div>; // メッセージを表示
};

export default RegisterComplete;
