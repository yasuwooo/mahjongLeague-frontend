type userStatProps = {
  userId: string;
  username: string;
  points: number;
  firstPlace: number;
  secondPlace: number;
  thirdPlace: number;
  fourthPlace: number;
};

type userStatsProps = {
  userStats: userStatProps[];
};

const Rank = ({ userStats }: userStatsProps) => {
  return (
    <div className="w-full min-h-screen p-2">
      <h2 className="text-xl md:text-3xl font-bold mb-4">ランキング</h2>
      <div className="text-2xl">
        <div className="">
          <div className="flex items-center justify-between text-xs sm:text-xl font-bold">
            <span className="basis-1/12 ml-3">順位</span>
            <span className="basis-1/12">名前</span>
            <span className="basis-2/12">P</span>
            <span className="basis-2/12">1位</span>
            <span className="basis-2/12">2位</span>
            <span className="basis-2/12">3位</span>
            <span className="basis-2/12 mr-3">4位</span>
          </div>
          <hr className="opacity-80 border-indigo-300" />
        </div>
        {userStats.map((userStat, index) => (
          <div
            key={userStat.userId}
            className="flex items-center justify-between mt-2 mb-2 p-2 bg-indigo-300 rounded-xl text-xs sm:text-lg
            md:text-xl lg:text-2xl "
          >
            <span className="basis-1/12">{index + 1}</span>
            <div className="basis-1/12 flex justify-center lx:justify-start items-center ml-5 ">
              <img
                src={`${process.env.REACT_APP_API_URL}/image/file/${userStat.username}`}
                alt={userStat.username + "'s image"}
                className="h-10 w-10 rounded-full object-cover mr-1"
              />

              <span className="hidden xl:inline">{userStat.username}</span>
            </div>
            <span className="basis-2/12">{userStat.points}</span>
            <span className="basis-2/12">{userStat.firstPlace}</span>
            <span className="basis-2/12">{userStat.secondPlace}</span>
            <span className="basis-2/12">{userStat.thirdPlace}</span>
            <span className="basis-2/12">{userStat.fourthPlace}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rank;
