import { Link, useNavigate, useLocation } from "react-router";
import { Briefcase, FileText, CalendarDays, UserPlus, LogOut } from "lucide-react";

const sidebarItems = [
  { label: "Job Listings", to: "/", icon: Briefcase },
  { label: "Resumes On Hold", to: "/on-hold-resumes", icon: FileText },
  { label: "Interviews", to: "/interview-calendar", icon: CalendarDays },
  { label: "Schedule Meeting", to: "/schedule-interviews", icon: UserPlus },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside
      className="sidebar bg-slate-100 text-slate-800 shadow-sm border-r border-slate-200"
      style={{
        width: "220px",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        left: 0,
        top: 0,
      }}
    >
      <div className="px-6 py-6">
        <img src="/logo.svg" alt="Logo" className="w-32 mx-auto"/>
      </div>

      <nav style={{ flex: 1 }} className="px-3">
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.to);
            
            return (
              <li key={item.label} className="mb-1">
                <Link
                  to={item.to}
                  className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                    active 
                      ? "bg-slate-700 text-white shadow-sm" 
                      : "text-slate-700 hover:bg-slate-200"
                  }`}
                  style={{ textDecoration: "none" }}
                >
                  <Icon 
                    size={20} 
                    className={`mr-3 ${active ? "text-white" : "text-slate-600"}`}
                  />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-3 border-t border-slate-300">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center px-4 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors duration-200"
        >
          <LogOut size={18} className="mr-2" />
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}