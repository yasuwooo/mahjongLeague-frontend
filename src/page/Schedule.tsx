import React, { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import Match from "../components/Match";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";

type MatchData = {
  _id: string; // MongoDBのObjectIdは文字列として扱います
  playOfTime: string; // ISOフォーマットの文字列で日時が渡される
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

const Schedule = () => {
  const { isLoggedIn, csrfToken } = useAuth();
  const [allMatches, setAllMatches] = useState<MatchData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/match`,
          {
            headers: {
              "X-CSRF-Token": csrfToken,
            },
            withCredentials: true,
          }
        );

        // Axiosのレスポンスのdataプロパティから試合データを取得
        const allMatches: MatchData[] = response.data;

        // 全試合を新しい順でソート
        const sortedAllMatches = [...allMatches].sort((a, b) => {
          const dateA = new Date(a.playOfTime);
          const dateB = new Date(b.playOfTime);
          return dateB.getTime() - dateA.getTime(); // 新しい順にソート
        });

        setAllMatches(sortedAllMatches);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchMatches();
  }, [csrfToken]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <Topbar />
      <div className="m-8">
        {isLoggedIn ? (
          <Link
            to="/match"
            className="text-xl font-bold text-white bg-indigo-700 p-3 rounded-lg"
          >
            試合結果を入力
          </Link>
        ) : (
          <Link
            to="/auth/login"
            className="text-xl font-bold text-white bg-indigo-700 p-3 rounded-lg"
          >
            試合結果を入力
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 gap-1 m-1 sm:grid-cols-2 sm:gap-2 sm:m-2)">
        {allMatches.map((match) => (
          <Match match={match} key={match._id} />
        ))}
      </div>
    </div>
  );
};

export default Schedule;
