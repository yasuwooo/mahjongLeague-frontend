// import { Users } from "../dummyData";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const ProfileBar = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center h-full w-full bg-indigo-300 min-h-screen  m-2 rounded-lg">
      <div className="basis-1/3 w-full h-full flex flex-col">
        <div className="flex items-center justify-end p-2">
          <Link to="/profile/change">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-pencil cursor-pointer"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#ffffff"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4" />
              <path d="M13.5 6.5l4 4" />
            </svg>
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <img
            src={
              `${process.env.REACT_APP_API_URL}/image/file/` + user?.username
            }
            alt="icon"
            className="h-14 w-14 md:h-20 md:w-20 object-cover rounded-full"
          />
        </div>
        <div className="bg-white m-2 rounded-xl text-lg md:text-xl p-1 ">
          {user?.username}
        </div>
        {user?.desc ? (
          <div className="bg-white m-2 rounded-lg text-sm md:text-lg p-1">
            {user?.desc}
          </div>
        ) : (
          <div></div> // 説明欄が入力されてなかったら、何も表示しない
        )}
      </div>
      <div className="basis-2/3 flex flex-col items-center justify-center w-full h-full">
        <hr className="border-white w-11/12 m-4" />
      </div>
    </div>
  );
};

export default ProfileBar;
