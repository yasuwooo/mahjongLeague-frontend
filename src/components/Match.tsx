import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import dayjs from "dayjs";

// 試合情報の型
type MatchProps = {
  match: {
    _id: string;
    playOffTime: string;
    playNumber: number;
    user1: {
      userId: string;
      point: number;
    };
    user2: {
      userId: string;
      point: number;
    };
    user3: {
      userId: string;
      point: number;
    };
    user4: {
      userId: string;
      point: number;
    } | null;
  };
};

const Match = ({ match }: MatchProps) => {
  console.log("Raw playOffTime:", match.playOffTime);
  console.log("Is valid date:", dayjs(match.playOffTime).isValid());
  const { csrfToken } = useAuth();

  // ユーザー情報を取得する非同期関数を定義
  const [usersData, setUsersData] = useState<any[]>([]);

  // 試合に参加したユーザーのデータを非同期で取得するにはuseEffectを使うのだ
  useEffect(() => {
    const fetchUserData = async (userId: string, point: number) => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/match/${userId}`,
          {
            headers: {
              "X-CSRF-Token": csrfToken,
            },
            withCredentials: true,
          }
        );
        return {
          user: response.data,
          point: point,
        };
      } catch (error) {
        console.log(error);
        return null;
      }
    };

    const fetchAllUsersData = async () => {
      const usersDataPromises = [
        fetchUserData(match.user1.userId, match.user1.point),
        fetchUserData(match.user2.userId, match.user2.point),
        fetchUserData(match.user3.userId, match.user3.point),
      ];

      if (match.user4 !== null) {
        usersDataPromises.push(
          fetchUserData(match.user4.userId, match.user4.point)
        );
      }

      const usersDataResult = await Promise.all(usersDataPromises);
      setUsersData(usersDataResult);
    };

    fetchAllUsersData();
  }, [match]);

  // 全てのリクエストを実行し、ユーザー情報を取得する

  return (
    <div
      className={`${
        match.playNumber === 4 ? "bg-indigo-400" : "bg-indigo-200"
      } text-lg rounded-lg `}
    >
      <div>
        <div className="text-2xl p-1">
          <div>{dayjs(match.playOffTime).format("YYYY/MM/DD")}</div>
        </div>
        <div className="flex items-center justify-center">
          <hr className="w-11/12" />
        </div>
        <div>
          {usersData.map((userData, index) =>
            userData && userData.user ? (
              <div key={index}>
                <div className="flex items-center justify-between pt-2 pb-2 pl-2 bg-white rounded-xl m-2">
                  <div className="flex items-center justify-center">
                    <img
                      src={`${process.env.REACT_APP_API_URL}/image/file/${userData.user.username}`}
                      alt={userData.user.username + "'s image"}
                      className="text-xl h-10 w-10  object-cover rounded-full"
                    />
                    <span className="pl-3">{userData.user.username}</span>
                  </div>
                  <span className="pr-3">{userData.point}P</span>
                </div>
              </div>
            ) : (
              <div key={index}>
                <div className="flex items-center justify-between pt-2 pb-2 pl-2 bg-white rounded-xl m-2">
                  <div className="flex items-center justify-center">
                    <img
                      src={"/images/person/noAvatar.png"}
                      alt="noAvatar"
                      className="h-10 w-10  object-cover rounded-full"
                    />
                    <span className="pl-3">----</span>
                  </div>
                  <span className="pr-3">----P</span>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Match;
