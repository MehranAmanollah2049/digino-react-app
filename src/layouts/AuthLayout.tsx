import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
      <div className="w-full h-lvh flex items-start justify-center">
        <div className="w-[90%] min-h-full py-8 flex items-center justify-between flex-col sm:w-[370px] sm:justify-center">
          <Outlet />
        </div>
      </div>
  )
}
