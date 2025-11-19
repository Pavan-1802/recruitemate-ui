import { Navigate } from "react-router";
import Sidebar from "./Sidebar";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = Boolean(localStorage.getItem("token"));
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  return (
    <div className="h-screen bg-slate-100 flex">
      <Sidebar />
      <div className="flex-1 overflow-auto">
      {children}
      </div>
    </div>
  );
}
