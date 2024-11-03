import React, { useState } from "react";
import Topbar from "../components/Topbar";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";

const ProfileChange = () => {
  const { csrfToken, user } = useAuth();

  const [desc, setDesc] = useState(user?.desc);
  const [icon, setIcon] = useState(
    `${process.env.REACT_APP_API_URL}/image/file/` + user?.username
  );
  const [file, setFile] = useState<File | null>(null); // ファイル状態を追加

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      console.log(`icon preview URL: ${imageUrl}`);
      setIcon(imageUrl);
      setFile(selectedFile); // ファイルを状態に保存
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 説明欄更新
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/changeuserdata`,
        {
          desc: desc,
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
        console.log("アカウントデータ更新エンドポイントに接続不可");
        alert("サーバーに接続できませんでした。もう一度お試しください。");
      }
    }

    // ユーザーアイコン更新
    if (file) {
      const formData = new FormData();
      formData.append("file", file); // ファイルを追加

      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/image/upload`,
          formData,
          {
            headers: {
              "X-CSRF-Token": csrfToken,
              "Content-Type": "multipart/form-data",
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
    } else {
      alert("ファイルが選択されていません。");
    }

    console.log("送信:", { desc, icon });
  };

  return (
    <div>
      <div>
        <Topbar />
      </div>
      <form className="mt-20" onSubmit={handleSubmit}>
        <div className="rounded-s-full flex items-center justify-center">
          <img
            src={icon}
            alt="User Icon"
            className="h-32 w-32 rounded-full object-cover"
          />
        </div>
        <div className="flex items-center justify-center">
          <label
            htmlFor="fileInput"
            className="bg-sky-500 m-3 p-2 rounded-lg text-white font-bold cursor-pointer"
          >
            写真を変更
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
          />
        </div>

        <div className="bg-white m-2 rounded-lg text-xl p-1">
          <input
            type="text"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300"
            placeholder="説明を入力"
          />
        </div>
        <div className="flex justify-center items-center">
          {/* <button
            type="button"
            onClick={handleCancel}
            className="bg-red-500 p-2 rounded-lg text-white text-lg font-bold m-2"
          >
            更新取消
          </button> */}
          <button
            className="bg-green-600 p-2 pl-5 pr-5 rounded-lg text-white text-lg font-bold m-2"
            type="submit"
          >
            送信
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileChange;
