import { Navigate, Outlet } from "react-router-dom";
import StorageService from "core/services/StorageService";

const ProtectedRoute = () => {
  const isAuthenticated = !!StorageService.getItem("auth_token");

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
