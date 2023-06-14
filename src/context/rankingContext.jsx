import { createContext, useState } from "react";

const RankingContext = createContext();


export function RankingProvider({ children }) {
  const persistedRank = JSON.parse(localStorage.getItem("rank"));
  const [rank, setRank] = useState(persistedRank);

  function saveRank(rankData) {
    if (rank === null) {
      setRank([rankData]);
      localStorage.setItem("rank", JSON.stringify([rankData]));
    } else {
      setRank((prevRank) => [...prevRank, rankData]);
      localStorage.setItem("rank", JSON.stringify([...rank, rankData]));
    }
  }

  return (
    <RankingContext.Provider value={{ rank, saveRank }}>
      {children}
    </RankingContext.Provider>
  );
}

export default RankingContext;

