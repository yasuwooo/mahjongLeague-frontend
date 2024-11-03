import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";

const TestUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const { csrfToken } = useAuth();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("ファイルを選択してください");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "${process.env.REACT_APP_API_URL}/image/upload",
        formData,
        {
          withCredentials: true, // クッキーを送信するために追加
          headers: {
            "X-CSRF-Token": csrfToken,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data && response.data.file) {
        alert("アップロード成功: " + response.data.file.filename);
      } else {
        alert("アップロードに失敗しました。サーバーからの応答が不正です。");
      }
    } catch (error) {
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
    <div className="flex flex-col items-center mt-10">
      <img
        src={`${process.env.REACT_APP_API_URL}/image/file/noExsistedUsername`}
        alt="画像だワン！！！"
      />
      <input type="file" name="file" onChange={handleFileChange} />
      <button
        onClick={handleUpload}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        アップロード
      </button>
    </div>
  );
};

export default TestUpload;
