import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/loginContext";
import { Game } from "./pages/Game";
import { Rank } from "./pages/Rank";
import  Login  from "./pages/Login";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/home",
      element: <Game />,
    },
    {
      path: "/ranking",
      element: <Rank />,
    },
  ]);
  return (
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
  );
}
