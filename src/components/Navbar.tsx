import { Link, useNavigate } from "react-router";
export default function Navbar() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/auth");
    }
  return (
    <nav className="bg-slate-100 sticky text-slate-800 flex justify-between shadow-sm p-4">
      <Link to={"/"} className="text-xl font-bold">RecruitMate</Link>
      <button onClick={handleLogout} className="px-2 py-1 bg-slate-700 text-white rounded-md">Logout</button>
    </nav>
  );
}