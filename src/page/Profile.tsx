import { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import ProfileBar from "../components/ProfileBar";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import Match from "../components/Match";

type MatchData = {
  _id: string; // MongoDBのObjectIdは文字列として扱います
  playOffTime: string; // ISOフォーマットの文字列で日時が渡される
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

function Profile() {
  const { csrfToken } = useAuth();
  const [allMatches, setAllMatches] = useState<MatchData[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/match/you`,
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
          const dateA = new Date(a.playOffTime);
          const dateB = new Date(b.playOffTime);
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
    <div className="bg-white">
      <div>
        <Topbar />
      </div>
      <div>
        <div className="w-full flex items-start justify-center">
          <div className="basis-3/12 flex items-center justify-center">
            <ProfileBar />
          </div>
          <div className="basis-9/12 ">
            <div className="">
              <div className="grid grid-row md:grid-cols-2 gap-2 m-2">
                {allMatches.map((match) => (
                  <Match match={match} key={match._id} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
