import { Outlet } from "react-router";
import PrevUrlProvider from "./context/PrevUrlProvider";
import useUser from "./stores/auth/useUser";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

export default function App() {

  const { fetchUser } = useUser();

  useEffect(() => {
    fetchUser()
  } , [])

  return (
    <PrevUrlProvider>
      <Toaster />
      <Outlet />
    </PrevUrlProvider>
  )
}