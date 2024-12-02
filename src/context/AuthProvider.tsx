import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// AuthContext の型定義
interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  csrfToken: string;
  user: {
    email: string;
    icon: string;
    username: string;
    desc: string;
  } | null;
  setUser: React.Dispatch<React.SetStateAction<AuthContextType["user"]>>;
}

// AuthContext の作成
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider の Props 型定義
interface AuthProviderProps {
  children: React.ReactNode;
}

// AuthProvider コンポーネント
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // ローカルストレージから初期状態を読み込み
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const [csrfToken, setCsrfToken] = useState(""); // csrf-token
  const [user, setUser] = useState<AuthContextType["user"]>(() => {
    // ローカルストレージからuser情報を読み込み
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/csrf-token`,
          {
            withCredentials: true,
          }
        );
        // トークンの取得に成功したことをログ出力
        console.log(
          "CSRFトークンの取得に成功しました: ",
          response.data["X-CSRF-Token"]
        );
        // CSRFトークンを状態に保存
        setCsrfToken(response.data["X-CSRF-Token"]);
      } catch (error) {
        console.error("CSRFトークンの取得に失敗しました");
      }
    };

    fetchCsrfToken();
  }, []);

  // 認証状態のチェック用のuseEffect
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/login/check-auth`,
          {
            headers: {
              "X-CSRF-Token": csrfToken, // CSRF トークンを正しいヘッダー名で追加
            },
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          console.log("ユーザーはログインしています");
          setIsLoggedIn(true);
          localStorage.setItem("isLoggedIn", "true");
        }
      } catch (error) {
        console.log("ユーザーはログインしていません");
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn");
      }
    };

    checkAuthStatus();
  }, []);

  // ユーザープロフィールの取得用のuseEffect
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/profile`,

          {
            headers: {
              "X-CSRF-Token": csrfToken, // CSRF トークンを正しいヘッダー名で追加
            },
            withCredentials: true,
          }
        );
        setUser(userProfile.data);
        localStorage.setItem("user", JSON.stringify(userProfile.data));
        console.log("ユーザーのデータを受け取りました", userProfile.data);
      } catch (error) {
        console.log("ユーザーのプロフィール取得に失敗しました");
        setUser(null);
        localStorage.removeItem("user");
      }
    };

    if (isLoggedIn) {
      fetchUserProfile(); // isLoggedInがtrueのときのみ実行
    }
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, csrfToken, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// useAuth フック
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
