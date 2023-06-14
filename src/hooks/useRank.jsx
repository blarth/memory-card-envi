import { useContext } from "react";
import RankingContext from "../context/rankingContext";

export default function useRank() {
  return useContext(RankingContext);
}
