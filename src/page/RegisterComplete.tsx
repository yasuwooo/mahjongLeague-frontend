import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const RegisterComplete = () => {
  const { csrfToken } = useAuth();
  const [verificationMessage, setVerificationMessage] = useState(""); // サーバーからのメッセージを格納する状態
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
        setVerificationMessage(response.data); // サーバーからのメッセージを保存
      } catch (error) {
        setVerificationMessage("トークンの確認に失敗しました。");
        console.error("トークンの確認に失敗しました:", error);
      }
    };
    verifyAccount();
  }, [csrfToken, token]); // トークンが変わったときに再実行

  return (
    <div className="flex text-2xl items-center justify-center">
      {verificationMessage}
    </div>
  ); // メッセージを表示
};

export default RegisterComplete;
