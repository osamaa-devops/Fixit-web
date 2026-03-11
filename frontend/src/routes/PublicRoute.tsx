
import { Navigate, Outlet } from 'react-router-dom';

export function PublicRoute() {
  // Mock auth state (to be replaced with Zustand)
  const isAuthenticated = false; 

  if (isAuthenticated) {
    return <Navigate to="/customer/home" replace />;
  }

  return <Outlet />;
}
