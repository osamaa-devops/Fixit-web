import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles?: ("customer" | "handyman" | "admin")[];
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  // Mock auth state (to be replaced with Zustand later)
  const isAuthenticated = true;
  const userRole: "customer" | "handyman" | "admin" = "customer";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // Redirect to appropriate dashboard
    const roleRedirects: Record<'customer' | 'handyman' | 'admin', string> = {
      admin: '/admin',
      handyman: '/handyman/dashboard',
      customer: '/customer/home',
    };
    return <Navigate to={roleRedirects[userRole]} replace />;
  }

  return <Outlet />;
}
