import { Navigate, Outlet, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles?: ("customer" | "handyman" | "admin")[];
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const location = useLocation();
  
  // Mock auth state - يتم تحديد الدور بناءً على المسار
  const isAuthenticated = true;
  
  // تحديد الدور بناءً على مسار الرابط الحالي
  let userRole: "customer" | "handyman" | "admin" = "customer";
  
  if (location.pathname.startsWith("/admin")) {
    userRole = "admin";
  } else if (location.pathname.startsWith("/handyman")) {
    userRole = "handyman";
  } else if (location.pathname.startsWith("/customer")) {
    userRole = "customer";
  }

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
