import React from 'react';

const leaderboardData = [
  { id: 1, name: '@sher234', score: 8122, image: '/images/user1.png', crown: true },
  { id: 2, name: '@dorisklein', score: 8032, image: '/images/user2.png' },
  { id: 3, name: '@lord_0980', score: 7884, image: '/images/user3.png' },
  { id: 4, name: '@adam56', score: 7881 },
  { id: 5, name: '@princess__', score: 6971 },
  { id: 6, name: '@julian-23', score: 6943 },
  { id: 7, name: '@star008', score: 6940 },
];

const Leaderboard = () => {
  return (
    <div className="bg-[#00220f] min-h-screen px-4 py-6 text-white font-sans">
      <div className="bg-[#013c20] rounded-3xl p-4 shadow-md">
        <h2 className="text-center text-lg font-bold mb-4">Leaderboard</h2>
        
        {/* Tabs */}
        <div className="flex justify-around mb-4">
          <button className="text-white text-sm">Today</button>
          <button className="bg-[#045d30] text-white text-sm px-4 py-1 rounded-full">Week</button>
          <button className="text-white text-sm">Month</button>
        </div>

        {/* Top 3 */}
        <div className="flex justify-around items-end mt-6 mb-4">
          {/* 2nd */}
          <div className="flex flex-col items-center">
            <img src={leaderboardData[1].image} className="w-14 h-14 rounded-full border-4 border-[#32ff94]" />
            <span className="text-sm mt-1">{leaderboardData[1].name}</span>
            <span className="text-[#32ff94] text-xs">{leaderboardData[1].score}</span>
          </div>
          {/* 1st */}
          <div className="flex flex-col items-center">
            <img src={leaderboardData[0].image} className="w-20 h-20 rounded-full border-4 border-[#32ff94]" />
            <img src="/images/crown.png" className="w-6 absolute mt-[-30px]" />
            <span className="text-sm mt-2">{leaderboardData[0].name}</span>
            <span className="text-[#32ff94] text-xs">{leaderboardData[0].score}</span>
          </div>
          {/* 3rd */}
          <div className="flex flex-col items-center">
            <img src={leaderboardData[2].image} className="w-14 h-14 rounded-full border-4 border-[#32ff94]" />
            <span className="text-sm mt-1">{leaderboardData[2].name}</span>
            <span className="text-[#32ff94] text-xs">{leaderboardData[2].score}</span>
          </div>
        </div>

        {/* Rest of List */}
        <div className="mt-4 space-y-2">
          {leaderboardData.slice(3).map((user, index) => (
            <div key={user.id} className="flex justify-between items-center bg-[#014d2a] rounded-xl px-4 py-2">
              <span className="text-sm font-semibold">{index + 4}</span>
              <span className="text-sm">{user.name}</span>
              <span className="text-[#32ff94] text-sm">{user.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
