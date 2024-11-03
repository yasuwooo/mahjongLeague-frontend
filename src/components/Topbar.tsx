import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Topbar = () => {
  const { isLoggedIn, user } = useAuth();

  return (
    <div className="bg-indigo-950 p-3 text-white">
      <div className="font-bold flex items-center justify-between text-sm sm:text-xl">
        <div>
          {/* ホーム */}
          <Link to="/">
            <span className="text-indigo-950 bg-white pl-2 pr-2 rounded-lg cursor-pointer">
              守田研Mリーグ
            </span>
          </Link>
        </div>
        {/* 試合・結果 */}
        <Link
          to="/schedule"
          className="flex items-center justify-center cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-calendar-week hidden md:block"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            strokeWidth="1"
            stroke="#ffffff"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z" />
            <path d="M16 3v4" />
            <path d="M8 3v4" />
            <path d="M4 11h16" />
            <path d="M8 14v4" />
            <path d="M12 14v4" />
            <path d="M16 14v4" />
          </svg>
          <div>結果</div>
        </Link>
        {/* 順位 */}
        <Link
          to="/ranking"
          className="flex items-center justify-center cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-123 hidden md:block"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            strokeWidth="1"
            stroke="#ffffff"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M3 10l2 -2v8" />
            <path d="M9 8h3a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-2a1 1 0 0 0 -1 1v2a1 1 0 0 0 1 1h3" />
            <path d="M17 8h2.5a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1 -1.5 1.5h-1.5h1.5a1.5 1.5 0 0 1 1.5 1.5v1a1.5 1.5 0 0 1 -1.5 1.5h-2.5" />
          </svg>
          <div>順位</div>
        </Link>
        {/* ログイン */}
        <div className="pr-3">
          {isLoggedIn ? (
            <Link
              to="/profile"
              className="flex items-center justify-center cursor-pointer"
            >
              <img
                src={
                  `${process.env.REACT_APP_API_URL}/image/file/` +
                  user?.username
                }
                alt="icon"
                className="h-10 w-10 object-cover rounded-full"
              />
            </Link>
          ) : (
            <Link
              to="/auth/login"
              className="flex items-center justify-center cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-login-2 hidden md:block"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                strokeWidth="1"
                stroke="#ffffff"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" />
                <path d="M3 12h13l-3 -3" />
                <path d="M13 15l3 -3" />
              </svg>
              <span>ログイン</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
