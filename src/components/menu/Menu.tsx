import { Link } from "react-router";
import Logo from "../Logo";
import Loading from "../Loading";
import useUser from "../../stores/auth/useUser";

export default function Menu() {

  const { user, loading, logout_loading, isLoggedIn , logOut } = useUser();

  return (
    <nav className="w-full h-[85px] flex items-center justify-center">
      <div className="w-custom h-full flex items-center justify-between">
        {isLoggedIn()}
        <Logo />
        {(loading || logout_loading) ? (
          <Loading />
        ) : isLoggedIn() ? (
          <span onClick={logOut}>{user?.name}</span>
        ) : (
          <Link to="/auth" className="btn-dark">ورود و ثبت نام</Link>
        )}
      </div>
    </nav>
  )
}
