import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
      <div className="w-full h-dvh flex items-start justify-center">
        <div className="w-[90%] min-h-[100%] py-8 flex items-center justify-between flex-col sm:w-[370px] sm:justify-center">
          <Outlet />
        </div>
      </div>
  )
}
