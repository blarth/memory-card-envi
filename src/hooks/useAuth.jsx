import { useContext } from "react";
import AuthContext from "../context/loginContext";

export default function useAuth() {
  return useContext(AuthContext);
}
