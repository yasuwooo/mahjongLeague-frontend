import React, { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";

// フォームデータの型定義
interface User {
  username: string;
  point: string;
}

interface FormData {
  playNumber: number;
  user1: User;
  user2: User;
  user3: User;
  user4: User;
}

const MatchRegister = () => {
  const { csrfToken } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    playNumber: 4,
    user1: {
      username: "",
      point: "0",
    },
    user2: {
      username: "",
      point: "0",
    },
    user3: {
      username: "",
      point: "0",
    },
    user4: {
      username: "",
      point: "0",
    },
  });

  // ユーザーネームが重複・もしくは空欄かどうかチェックする
  const hasDuplicateUsers = (): boolean => {
    const usernames = [
      formData.user1.username,
      formData.user2.username,
      formData.user3.username,
      ...(formData.playNumber === 4 ? [formData.user4.username] : []),
    ];
    const uniqueUsernames = new Set(usernames);
    //Setはユニークな値だけを持つので、そのサイズと元のユーザー名配列の長さを比較することで重複の有無をチェックする
    return uniqueUsernames.size !== usernames.length;
  };

  // ユーザーネームがエラーじゃないか存在するかチェックする
  const hasErrorExsistUsername = (): boolean => {
    if (
      hasError.user1 ||
      hasError.user2 ||
      hasError.user3 ||
      (formData.playNumber === 4 ? hasError.user4 : false)
    ) {
      return true;
    } else {
      return false;
    }
  };

  // 麻雀の合計得点がエラーかどうかチェックする
  const hasErrorPointSum = (): boolean => {
    let pointSum: number =
      Number(formData.user1.point) +
      Number(formData.user2.point) +
      Number(formData.user3.point);
    formData.playNumber === 4 &&
      (pointSum = pointSum + Number(formData.user4.point));
    if (formData.playNumber === 4) {
      return pointSum !== 100000;
    } else {
      return pointSum !== 105000;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 送信前にpoint(string型)をNumber型に変換
    const formDataToSend = {
      ...formData,
      user1: { ...formData.user1, point: Number(formData.user1.point) },
      user2: { ...formData.user2, point: Number(formData.user2.point) },
      user3: { ...formData.user3, point: Number(formData.user3.point) },
      user4:
        formData.playNumber === 4
          ? { ...formData.user4, point: Number(formData.user4.point) }
          : undefined,
    };
    // バリデーションチェック
    // ユーザー名が有効か確かめる
    if (hasErrorExsistUsername()) {
      alert("無効なユーザー名を記入しています");
      return;
    }
    // ユーザーが重複していないか確かめる
    if (hasDuplicateUsers()) {
      alert("ユーザー名が重複、もしくは空白です");
      return;
    }
    // ポイントが有効か確かめる
    if (hasErrorPointSum()) {
      alert("ポイント数の合計が違います");
      return;
    }

    // 試合データを送信
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/match/register`,

        formDataToSend,

        {
          headers: {
            "CSRF-Token": csrfToken,
          },
          withCredentials: true,
        }
      );

      alert(response.data);
      window.location.href = "/schedule";
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          alert(error.response.data);
        }
      } else {
        alert("サーバーに接続できませんでした。もう一度お試しください。");
      }
    }
    console.log("送信:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "playNumber") {
      setFormData((prevData) => ({
        ...prevData,
        playNumber: Number(value),
      }));
    } else if (name.includes("user")) {
      const [userKey, key] = name.split("."); // 例: user1.username を分割

      // pointフィールドの場合は数値のみを受け付けるバリデーション
      if (key === "point") {
        if (/^\d*$/.test(value)) {
          setFormData((prevData) => ({
            ...prevData,
            [userKey]: {
              ...prevData[userKey as keyof Omit<FormData, "playNumber">],
              [key]: value,
            },
          }));
        }
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [userKey]: {
            ...prevData[userKey as keyof Omit<FormData, "playNumber">],
            [key]: value,
          },
        }));
      }
    }
  };

  // GETするURLとして保存しておく
  const [imageUrl, setImageUrl] = useState({
    user1: `${process.env.REACT_APP_API_URL}/image/file/${formData.user1.username}`,
    user2: `${process.env.REACT_APP_API_URL}/image/file/${formData.user2.username}`,
    user3: `${process.env.REACT_APP_API_URL}/image/file/${formData.user3.username}`,
    user4: `${process.env.REACT_APP_API_URL}/image/file/${formData.user4.username}`,
  });

  // 画像読み込みのエラー状態を管理
  const [hasError, setHasError] = useState({
    user1: false,
    user2: false,
    user3: false,
    user4: false,
  });

  // ユーザー名が変更されたら画像URLを更新
  useEffect(() => {
    setImageUrl({
      user1: `${process.env.REACT_APP_API_URL}/image/file/${formData.user1.username}`,
      user2: `${process.env.REACT_APP_API_URL}/image/file/${formData.user2.username}`,
      user3: `${process.env.REACT_APP_API_URL}/image/file/${formData.user3.username}`,
      user4: `${process.env.REACT_APP_API_URL}/image/file/${formData.user4.username}`,
    });
    setHasError({
      user1: false,
      user2: false,
      user3: false,
      user4: false,
    });
  }, [
    formData.user1.username,
    formData.user2.username,
    formData.user3.username,
    formData.user4.username,
  ]);

  // 各ユーザーの画像のエラーハンドラ
  const handleError = (userKey: string) => {
    setHasError((prevState) => ({
      ...prevState,
      [userKey]: true,
    }));
  };

  return (
    <div>
      <div>
        <Topbar />
      </div>
      {/* ラジオボタン */}
      <div className="flex items-center justify-center">
        <form className="mt-20" onSubmit={handleSubmit}>
          <div className="flex ml-2 text-lg">
            <div className="p-2">
              <input
                type="radio"
                id="3P"
                name="playNumber"
                value="3"
                checked={formData.playNumber === 3}
                onChange={handleChange}
              />
              <label htmlFor="3P">3P</label>
            </div>
            <div className="p-2">
              <input
                type="radio"
                id="4P"
                name="playNumber"
                value="4"
                checked={formData.playNumber === 4}
                onChange={handleChange}
              />
              <label htmlFor="4P">4P</label>
            </div>
          </div>

          {/* ユーザー1, 2, 3のフィールド */}

          {["user1", "user2", "user3"].map((userKey, index) => {
            const user =
              formData[userKey as keyof Omit<FormData, "playNumber">];
            const imgUrl = imageUrl[userKey as keyof typeof imageUrl];
            const errorStatus = hasError[userKey as keyof typeof hasError];
            return (
              <div
                key={userKey}
                className="bg-white m-2 rounded-lg text-3xl p-1 flex items-center justify-center"
              >
                {!errorStatus ? (
                  <img
                    src={imgUrl}
                    alt={`プロフィール画像`}
                    className="h-14 w-14 rounded-full object-cover"
                    onError={() => handleError(userKey)}
                  />
                ) : (
                  <img
                    src={`${process.env.REACT_APP_API_URL}/image/file/noExsistedUsername`}
                    alt={`プロフィール画像`}
                    className="h-14 w-14 rounded-full object-cover"
                    onError={() => handleError(userKey)}
                  />
                )}
                <div className="m-1">
                  {!errorStatus ? (
                    <input
                      type="text"
                      name={`${userKey}.username`}
                      value={user.username}
                      onChange={handleChange}
                      className="w-full p-2 rounded-lg border  border-gray-300 "
                      placeholder={`ユーザー${index + 1}名を入力`}
                    />
                  ) : (
                    <input
                      type="text"
                      name={`${userKey}.username`}
                      value={user.username}
                      onChange={handleChange}
                      className="w-full p-2 rounded-lg border  border-red-400 bg-red-200 outline-red-500"
                      placeholder={`ユーザー${index + 1}名を入力`}
                    />
                  )}
                </div>
                <div className="m-1">
                  <input
                    type="text" // テキスト型に変更
                    name={`${userKey}.point`}
                    value={user.point}
                    onChange={handleChange}
                    className="w-full p-2 rounded-lg border border-gray-300"
                    placeholder="ポイントを入力"
                  />
                </div>
              </div>
            );
          })}

          {/* 4Pの場合のみ表示されるユーザー4のフィールド */}
          {formData.playNumber === 4 && (
            <div
              key="user4"
              className="bg-white m-2 rounded-lg text-3xl p-1 flex items-center justify-center"
            >
              {!hasError.user4 ? (
                <img
                  src={imageUrl.user4}
                  alt={"4"}
                  className="h-14 w-14 rounded-full object-cover"
                  onError={() => handleError("user4")}
                />
              ) : (
                <img
                  src={`${process.env.REACT_APP_API_URL}/image/file/noExsistedUsername`}
                  alt={`プロフィール画像`}
                  className="h-14 w-14 rounded-full object-cover"
                  onError={() => handleError("user4")}
                />
              )}
              <div className="m-1">
                {!hasError.user4 ? (
                  <input
                    type="text"
                    name={`user4.username`}
                    value={formData.user4.username}
                    onChange={handleChange}
                    className="w-full p-2 rounded-lg border  border-gray-300 "
                    placeholder={`ユーザー4名を入力`}
                  />
                ) : (
                  <input
                    type="text"
                    name={`user4.username`}
                    value={formData.user4.username}
                    onChange={handleChange}
                    className="w-full p-2 rounded-lg border  border-red-400 bg-red-200 outline-red-500"
                    placeholder={`ユーザー4名を入力`}
                  />
                )}
              </div>
              <div className="m-1">
                <input
                  type="text" // テキスト型に変更
                  name="user4.point"
                  value={formData.user4.point}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg border border-gray-300"
                  placeholder="ポイントを入力"
                />
              </div>
            </div>
          )}

          <div className="flex justify-center items-center">
            <button
              className="bg-green-600 p-2 pl-5 pr-5 rounded-lg text-white text-lg font-bold m-2"
              type="submit"
            >
              送信
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MatchRegister;
