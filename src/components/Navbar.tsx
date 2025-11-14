import { Link, useNavigate } from "react-router";
import { Calendar, Folder, Briefcase } from "lucide-react";

const sidebarItems = [
  { label: "Interviews", to: "/interviews", icon: Calendar },
  { label: "Resumes", to: "/on-hold-resumes", icon: Folder },
  { label: "Jobs", to: "/jobs", icon: Briefcase },
  // { label: "Settings", to: "/settings", icon: Settings },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };
  return (
    <aside
      className="sidebar bg-slate-100 text-slate-800 shadow-sm"
      style={{
        width: "220px",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        left: 0,
        top: 0,
        zIndex: 100,
      }}
    >
      <img src="/logo.svg" alt="" className="w-30 mx-auto"/>
      <nav style={{ flex: 1 }}>
        <ul className="mt-4" style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {sidebarItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.to}
                className="flex items-center px-6 py-3 hover:bg-slate-200 transition-colors"
                style={{ color: "#333", textDecoration: "none", fontSize: "1.1rem" }}
              >
                <span style={{ marginRight: "12px", fontSize: "1.3rem" }}><item.icon /></span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <button
        onClick={handleLogout}
        className="m-6 px-4 py-2 bg-slate-700 text-white rounded-md"
      >
        Logout
      </button>
    </aside>
  );
}