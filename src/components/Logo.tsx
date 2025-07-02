import { Link } from "react-router";

export default function Logo() {
  return (
    <Link to="/" className="h-[70px]">
      <img src="/logo.png" className="w-full h-full object-contain" alt="" />
    </Link>
  );
}
