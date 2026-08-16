import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="mx-auto max-w-7xl px-4 py-20 text-center text-navy-500">Loading…</div>;
  }

  if (!user) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}
