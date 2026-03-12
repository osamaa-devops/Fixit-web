import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { AuthLayout } from './components/layout/AuthLayout';
import { CustomerLayout } from './components/layout/CustomerLayout';
import { HandymanLayout } from './components/layout/HandymanLayout';
import { AdminLayout } from './components/layout/AdminLayout';

// Guards
import { ProtectedRoute } from './routes/ProtectedRoute';
import { PublicRoute } from './routes/PublicRoute';

// Pages
import {
  LandingPage, LoginPage, RegisterPage, ForgotPasswordPage, VerifyOTPPage, ResetPasswordPage,
  PendingApprovalPage, ContactUsPage, HelpSupportPage, LegalPage,
  CustomerHome, CustomerBrowse, CustomerSearch, CustomerDashboard,
  CustomerBook, CustomerTrack, CustomerHistory, CustomerProfile, CustomerSettings, CustomerNotifications,
  HandymanProfile,
  HandymanDashboard, HandymanJobs, HandymanSettings, HandymanPortfolio, HandymanReviews, HandymanNotifications,
  AdminLogin, AdminDashboard, AdminApprovals, AdminUsers, AdminRequests, AdminCategories, AdminReviews,
} from './pages';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Marketing Route */}
        <Route path="/" element={<LandingPage />} />

        {/* Public Auth Routes */}
        <Route element={<PublicRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/verify-otp" element={<VerifyOTPPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            
          </Route>
          <Route path="/pending-approval" element={<PendingApprovalPage />} />
          {/* Admin Login - Standalone */}
          <Route path="/admin/login" element={<AdminLogin />} />
        </Route>

        {/* Public Shared Info Routes */}
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/help" element={<HelpSupportPage />} />
        <Route path="/legal" element={<LegalPage />} />

        {/* Customer Portal (Protected) */}
        <Route element={<ProtectedRoute allowedRoles={['customer']} />}>
          <Route path="/customer" element={<CustomerLayout />}>
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<CustomerHome />} />
            <Route path="dashboard" element={<CustomerDashboard />} />
            <Route path="browse" element={<CustomerBrowse />} />
            <Route path="search" element={<CustomerSearch />} />
            <Route path="handyman/:id" element={<HandymanProfile />} />
            <Route path="book/:id" element={<CustomerBook />} />
            <Route path="track/:id" element={<CustomerTrack />} />
            <Route path="history" element={<CustomerHistory />} />
            <Route path="profile" element={<CustomerProfile />} />
            <Route path="settings" element={<CustomerSettings />} />
            <Route path="notifications" element={<CustomerNotifications />} />
          </Route>
        </Route>

        {/* Handyman Portal (Protected) */}
        <Route element={<ProtectedRoute allowedRoles={['handyman']} />}>
          <Route path="/handyman" element={<HandymanLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<HandymanDashboard />} />
            <Route path="jobs" element={<HandymanJobs />} />
            <Route path="job/:id" element={<HandymanJobs />} />
            <Route path="portfolio" element={<HandymanPortfolio />} />
            <Route path="reviews" element={<HandymanReviews />} />
            <Route path="profile" element={<HandymanSettings />} />
            <Route path="notifications" element={<HandymanNotifications />} />
          </Route>
        </Route>

        {/* Admin Portal (Protected) */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="approvals" element={<AdminApprovals />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="requests" element={<AdminRequests />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="reviews" element={<AdminReviews />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
