# FixIt Web Frontend Development Task List

## 1. Project Initialization & Scaffolding
- [ ] Initialize React Vite project with TypeScript
- [ ] Configure `tsconfig.json` and Vite settings (port, aliases)
- [ ] Set up global CSS (RTL support, fonts, design tokens)
- [ ] Install core dependencies (React Router, Axios, React Hook Form, Zod, React Query, Zustand, Framer Motion)
- [ ] Establish initial folder structure (`src/components`, `src/pages`, `src/layouts`, `src/store`, `src/utils`, `src/hooks`, `src/services`, `src/assets`)

## 2. Shared Assets & Base Styles
- [x] Import and organize static assets (images, icons, SVG logo)
- [x] Migrate [shared-base.css](file:///f:/Fixit%20web/shared-base.css) and [theme-light.css](file:///f:/Fixit%20web/theme-light.css) variables into a global styles file [src/styles/global.css](file:///f:/Fixit%20web/frontend/src/styles/global.css)
- [x] Ensure [index.html](file:///f:/Fixit%20web/frontend/index.html) specifies `<html dir="rtl" lang="ar">` and imports the Cairo font

## 3. Shared Components Construction
- [x] Create [GlassCard](file:///f:/Fixit%20web/frontend/src/components/common/GlassCard.tsx#8-15) layout wrapper component
- [x] Create generic [Button](file:///f:/Fixit%20web/frontend/src/components/common/Button.tsx#4-8) and [Input](file:///f:/Fixit%20web/frontend/src/components/common/Input.tsx#4-8) components
- [x] Create [StatusBadge](file:///f:/Fixit%20web/frontend/src/components/shared/StatusBadge.tsx#17-36) component (`pending`, `active`, `completed`, `cancelled`)
- [x] Create [HandymanCard](file:///f:/Fixit%20web/frontend/src/components/shared/HandymanCard.tsx#21-92) component with availability states (clickable/disabled)
- [x] Create floating [Navbar](file:///f:/Fixit%20web/frontend/src/components/layout/Navbar.tsx#5-79) and mobile responsive navigation

## 4. Routing Setup & Layouts
- [x] Define main React Router structure ([src/App.tsx](file:///f:/Fixit%20web/frontend/src/App.tsx), `src/routes/`)
- [x] Create [CustomerLayout](file:///f:/Fixit%20web/frontend/src/components/layout/CustomerLayout.tsx#5-15) (Floating Navbar)
- [x] Create [HandymanLayout](file:///f:/Fixit%20web/frontend/src/components/layout/HandymanLayout.tsx#5-74) (Floating Navbar with different links/theme)
- [x] Create [AdminLayout](file:///f:/Fixit%20web/frontend/src/components/layout/AdminLayout.tsx#4-40) (Dark Sidebar layout)
- [x] Create [AuthLayout](file:///f:/Fixit%20web/frontend/src/components/layout/AuthLayout.tsx#5-45) (Background animation between themes)
- [x] Implement Route Guards ([ProtectedRoute](file:///f:/Fixit%20web/frontend/src/routes/ProtectedRoute.tsx#8-25), [PublicRoute](file:///f:/Fixit%20web/frontend/src/routes/PublicRoute.tsx#4-14), [AuthGateModal](file:///f:/Fixit%20web/frontend/src/components/shared/AuthGateModal.tsx#7-100))

## 5. Auth Pages & Flow
- [x] Build `/login` page
- [x] Build `/forgot-password`, `/verify-otp`, `/reset-password` flow
- [x] Build `/register` multi-step wizard
  - [x] Role switcher (Customer vs Handyman)
  - [x] Customer steps (4)
  - [x] Handyman steps (5)
- [x] Build `/pending-approval` page

## 6. Public Pages
- [x] Build Landing Page (`/`) with Auth Gate Modal trigger
- [x] Implement static shared pages: `/contact`, `/help`, `/legal`

## 7. Customer Portal Pages
- [x] Build Dashboard (`/customer/dashboard`)
- [x] Build Home Page (`/customer/home`)
- [x] Build Category Browse (`/customer/browse`)
- [x] Build Search & Results with filtering (`/customer/search?category=...`)
- [x] Build Public Handyman Profile (`/customer/handyman/:id`)
- [x] Build Service Booking Wizard (`/customer/book/:id`)
- [x] Build Request History (`/customer/history`)
- [x] Build Track Request (`/customer/track/:id`) with 4 dynamic states and Contact Lock logic
- [ ] Build Profile & Settings (`/customer/profile`, `/customer/settings`)
- [ ] Build Notifications (`/customer/notifications`)

## 8. Handyman Portal Pages
- [x] Build Handyman Dashboard (`/handyman/dashboard`)
- [x] Build Job Details pages (New Offer, Active Job, Completed/Cancelled)
- [x] Build Portfolio Manager (`/handyman/portfolio`)
- [x] Build Reviews (`/handyman/reviews`)
- [x] Build Profile Settings (`/handyman/profile`)
- [x] Build Notifications (`/handyman/notifications`)

## 9. Admin Portal Pages
- [x] Build Admin Login (`/admin/login`)
- [x] Build Admin Dashboard (`/admin`)
- [x] Build Handymen Approvals (`/admin/approvals`)
- [x] Build Service Categories Management (`/admin/categories`)
- [x] Build Live Requests Monitor (`/admin/requests`)
- [x] Build Reviews & Complaints Moderation (`/admin/reviews`)
- [x] Build Users Management (`/admin/users`)

## 10. Final Integration & Polish
- [ ] Ensure API integration points are ready (Mock API hooks logic)
- [ ] Test Mobile Responsiveness across all portals
- [ ] Address Edge Cases (Empty states)
