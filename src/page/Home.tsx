import React from "react";
import Topbar from "../components/Topbar";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Home = () => {
  const { isLoggedIn } = useAuth();
  return (
    <div>
      <Topbar />
      <section className="flex flex-col md:flex-row mt-40">
        <div className="basis-2/3 p-5">
          <img
            src="/images/home/mahjong.jpg"
            alt="majong"
            className="rounded-lg object-cover"
          />
        </div>
        <div className="basis-1/3">
          <div className="h-full flex items-center justify-center">
            <div>
              <div className="text-8xl md:text-6xl">Since 1998</div>
              <div className="text-2xl md:text-lg text-gray-600 mt-6">
                私たちは長い伝統と歴史を有しています
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col lg:flex-row mt-24">
        <div className="basis-2/3">
          <div className="h-full flex items-center justify-center">
            <div>
              <div className="text-6xl">コンプライアンスの遵守</div>
              <div className="text-2xl lg:text-lg text-gray-600 mt-6">
                私たちは今までも、これからも、社交儀礼の範囲内の行動を行います
              </div>
            </div>
          </div>
        </div>
        <div className="basis-1/3 p-5 flex justify-center">
          <img
            src="/images/home/compliance.jpg"
            alt="compliance"
            className="rounded-lg object-cover"
          />
        </div>
      </section>

      <section className="flex flex-col md:flex-row mt-24 ">
        <div className="basis-1/2 p-5 flex justify-center">
          <img
            src="/images/home/campaslife.jpg"
            alt="campaslife"
            className="rounded-lg object-cover"
          />
        </div>
        <div className="basis-1/2">
          <div className="h-full flex items-center justify-center">
            <div>
              <div className="text-4xl">円滑で順風満帆な大学生活の推進</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mt-80 mb-60">
          <div className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl mb-4">
            扉は常に開かれています
          </div>
          <div className="text-lg sm:text-2xl lg:text-3xl text-gray-600 mt-6">
            守田研Mリーグはいかなるバックグラウンドを持つ人も差別しません
          </div>
          <div className="mt-10">
            {isLoggedIn ? (
              <Link
                to="/ranking"
                className="rounded-md bg-indigo-950 text-white text-2xl  pt-2 pb-2 pl-3 pr-3"
              >
                結果を見る
              </Link>
            ) : (
              <Link
                to="/auth/login"
                className="rounded-md bg-indigo-950 text-white text-2xl  pt-2 pb-2 pl-3 pr-3"
              >
                参加する
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
