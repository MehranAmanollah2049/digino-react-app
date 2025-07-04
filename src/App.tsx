import { Outlet, useLocation, useNavigation } from "react-router";
import PrevUrlProvider from "./context/PrevUrlProvider";
import useUser from "./stores/auth/useUser";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import CategoryProvider from "./context/CategoryProvider";

export default function App() {

  const { fetchUser } = useUser();

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <PrevUrlProvider>
      <CategoryProvider>
        <Toaster />
        <div className="w-full min-h-screen relative overflow-clip">
          <Outlet />
        </div>
      </CategoryProvider>
    </PrevUrlProvider>
  )
}