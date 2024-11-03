import React, { useEffect, useState } from "react";
import Topbar from "../components/Topbar";
import Rank from "../components/Rank";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";

type RankingData = {
  userId: string;
  username: string;
  points: number;
  firstPlace: number;
  secondPlace: number;
  thirdPlace: number;
  fourthPlace: number;
};

const Ranking: React.FC = () => {
  const { csrfToken } = useAuth();
  const [ranking, setRanking] = useState<RankingData[]>([]);
  useEffect(() => {
    const fetchRankingData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/ranking`,
          {
            headers: {
              "X-CSRF-Token": csrfToken,
            },
            withCredentials: true,
          }
        );

        // Axiosのレスポンスのdataプロパティから試合データを取得
        const rankingArray: RankingData[] = response.data;

        setRanking(rankingArray);
      } catch (err) {
        console.log(err);
      }
    };

    fetchRankingData();
  }, [csrfToken]);

  return (
    <div>
      <div>
        <Topbar />
      </div>
      <div>
        <Rank userStats={ranking} />
      </div>
    </div>
  );
};

export default Ranking;
