import { Link } from "react-router";

export default function Logo() {
  return (
    <Link to="/" className="w-[80px] h-full">
      <img src="/logo.png" className="w-full h-full object-contain" alt="" />
    </Link>
  );
}
