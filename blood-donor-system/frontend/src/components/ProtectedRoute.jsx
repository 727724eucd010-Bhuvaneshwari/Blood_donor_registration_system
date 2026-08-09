import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedRoute({ roles }) {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("userRole");

  if (!token) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (roles && !roles.includes(role)) return <Navigate to="/dashboard" replace />;

  return <Outlet />;
}

export default ProtectedRoute;
