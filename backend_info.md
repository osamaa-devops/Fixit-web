# 🔗 FIXIT WEB - Backend Integration Guide

**Document For:** Backend Developer / API Team  
**Created:** March 12, 2026  
**Status:** Frontend Ready - Awaiting API Endpoints

---

## 📌 RESPONSIBILITY BREAKDOWN

| Task                     | Responsibility      | Details                                                   |
| ------------------------ | ------------------- | --------------------------------------------------------- |
| Frontend UI/Components   | ✅ **Frontend Dev** | DONE - Ready to use                                       |
| API Design & Development | 🔄 **Backend Dev**  | IN YOUR HANDS                                             |
| Database Schema          | 🔄 **Backend Dev**  | Create tables/collections                                 |
| Authentication (JWT)     | 🔄 **Backend Dev**  | Issue & validate tokens                                   |
| API Endpoints            | 🔄 **Backend Dev**  | Implement services                                        |
| Frontend-API Connection  | ✅ **Frontend Dev** | Will wire hooks to endpoints                              |
| Error Handling           | Both                | Frontend: catches errors, Backend: sends proper responses |
| Testing                  | Both                | Unit tests (backend), E2E tests (frontend)                |

---

## 🎯 YOUR JOB (Backend Dev)

1. **Create API endpoints** matching the specifications below
2. **Setup authentication** (JWT tokens)
3. **Configure CORS** to allow frontend requests
4. **Create database models** for all entities
5. **Implement business logic** for each service
6. **Setup error handling** with proper HTTP status codes
7. **Test endpoints** with Postman/Insomnia before frontend connects

---

## 🏗️ CURRENT ARCHITECTURE

### Frontend Service Layer (Ready to Connect)

The frontend has pre-built services in `src/services/`:

```
src/services/
├── api.ts                 ← Axios client setup (interceptors ready)
├── auth.service.ts        ← Authentication endpoints
├── customer.service.ts    ← Customer-specific endpoints
├── handyman.service.ts    ← Handyman-specific endpoints
└── admin.service.ts       ← Admin-specific endpoints
```

**API Base URL Configuration:**

```typescript
// src/services/api.ts
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";
```

**Environment Setup (You need to set this):**

```bash
# .env file (FRONTEND)
VITE_API_URL=http://your-backend-url:3000/api
```

---

## 🔑 AUTHENTICATION FLOW

### 1. **Login (Customer/Handyman)**

**Frontend Call:**

```typescript
// Uses: src/services/auth.service.ts → login()
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "rememberMe": true
}
```

**Backend Response (Success):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_123",
    "email": "user@example.com",
    "firstName": "أحمد",
    "lastName": "محمود",
    "role": "customer",
    "avatar": "https://...",
    "verified": true
  }
}
```

**Backend Response (Error):**

```json
{
  "error": "Invalid credentials",
  "message": "البريد أو كلمة المرور غير صحيحة"
}
```

HTTP Status: `400` or `401`

---

### 2. **Registration (Customer/Handyman)**

**Frontend Call:**

```typescript
POST /api/auth/register
Content-Type: application/json

{
  "role": "customer",
  "firstName": "أحمد",
  "lastName": "محمود",
  "email": "ahmed@example.com",
  "password": "SecurePass123!",
  "phone": "+20 101 234 5678",

  // For Handyman only:
  "specialization": "سباكة",
  "yearsOfExperience": 5,
  "certifications": ["ISO-123", "cert-456"]
}
```

**Backend Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_456",
    "email": "ahmed@example.com",
    "firstName": "أحمد",
    "lastName": "محمود",
    "role": "customer",
    "verified": false,
    "approvalStatus": "pending" // For handymen
  }
}
```

---

### 3. **Token Usage**

**Frontend automatically adds token to all requests:**

```typescript
// From src/services/api.ts
// Authorization header added automatically by interceptor:
Authorization: Bearer <token from localStorage>
```

**You need to:**

1. Verify token on each request
2. Return `401 Unauthorized` if token is invalid/expired
3. Support token refresh mechanism

---

### 4. **Logout**

**Frontend Call:**

```typescript
POST / api / auth / logout;
Authorization: Bearer<token>;
```

**Expected Response:**

```json
{
  "message": "تم تسجيل الخروج بنجاح"
}
```

---

## 📋 API ENDPOINTS NEEDED

### ✅ AUTH ENDPOINTS

| Method | Endpoint                | Purpose           | Auth | Data                               |
| ------ | ----------------------- | ----------------- | ---- | ---------------------------------- |
| POST   | `/auth/login`           | Login user        | No   | email, password                    |
| POST   | `/auth/register`        | Register new user | No   | role, email, password, phone, etc. |
| POST   | `/auth/logout`          | Logout user       | Yes  | -                                  |
| POST   | `/auth/verify-otp`      | Verify OTP        | No   | email, otp                         |
| POST   | `/auth/forgot-password` | Send reset email  | No   | email                              |
| POST   | `/auth/reset-password`  | Reset password    | No   | email, token, newPassword          |
| POST   | `/auth/refresh-token`   | Refresh JWT token | Yes  | -                                  |

---

### ✅ CUSTOMER ENDPOINTS

| Method | Endpoint                      | Purpose                    | Auth |
| ------ | ----------------------------- | -------------------------- | ---- |
| GET    | `/customers/me`               | Get profile                | Yes  |
| PUT    | `/customers/me`               | Update profile             | Yes  |
| GET    | `/customers/me/requests`      | Get request history        | Yes  |
| GET    | `/requests/:id`               | Get request details        | Yes  |
| POST   | `/requests`                   | Create new service request | Yes  |
| PUT    | `/requests/:id`               | Update request             | Yes  |
| POST   | `/requests/:id/cancel`        | Cancel request             | Yes  |
| GET    | `/requests/:id/track`         | Track in-progress request  | Yes  |
| POST   | `/requests/:id/review`        | Submit review/rating       | Yes  |
| GET    | `/customers/me/notifications` | Get notifications          | Yes  |

---

### ✅ HANDYMAN ENDPOINTS

| Method | Endpoint                     | Purpose                | Auth |
| ------ | ---------------------------- | ---------------------- | ---- |
| GET    | `/handymen/me`               | Get profile            | Yes  |
| PUT    | `/handymen/me`               | Update profile         | Yes  |
| GET    | `/handymen/me/jobs`          | Get assigned jobs      | Yes  |
| GET    | `/jobs/:id`                  | Get job details        | Yes  |
| PUT    | `/jobs/:id/status`           | Update job status      | Yes  |
| GET    | `/handymen/me/portfolio`     | Get portfolio images   | Yes  |
| POST   | `/handymen/me/portfolio`     | Upload portfolio image | Yes  |
| DELETE | `/handymen/me/portfolio/:id` | Delete portfolio image | Yes  |
| GET    | `/handymen/me/reviews`       | Get reviews            | Yes  |
| GET    | `/handymen/me/notifications` | Get notifications      | Yes  |
| PUT    | `/handymen/me/availability`  | Set working hours      | Yes  |

---

### ✅ ADMIN ENDPOINTS

| Method | Endpoint                      | Purpose                    | Auth        |
| ------ | ----------------------------- | -------------------------- | ----------- |
| GET    | `/admin/dashboard`            | Dashboard KPIs             | Yes (admin) |
| GET    | `/admin/handymen/pending`     | Pending handyman approvals | Yes (admin) |
| POST   | `/admin/handymen/:id/approve` | Approve handyman           | Yes (admin) |
| POST   | `/admin/handymen/:id/reject`  | Reject handyman            | Yes (admin) |
| GET    | `/admin/requests`             | All service requests       | Yes (admin) |
| GET    | `/admin/users`                | Manage users               | Yes (admin) |
| GET    | `/admin/categories`           | Manage categories          | Yes (admin) |
| POST   | `/admin/categories`           | Create category            | Yes (admin) |
| PUT    | `/admin/categories/:id`       | Update category            | Yes (admin) |
| DELETE | `/admin/categories/:id`       | Delete category            | Yes (admin) |
| GET    | `/admin/reviews`              | Review moderation          | Yes (admin) |
| POST   | `/admin/reviews/:id/flag`     | Flag review                | Yes (admin) |

---

## 📊 DATA MODELS & INTERFACES

### **User (Abstract)**

```typescript
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatar?: string;
  address?: string;
  verified: boolean;
  role: "customer" | "handyman" | "admin";
  createdAt: string;
  updatedAt: string;
}
```

### **Customer**

```typescript
interface Customer extends User {
  role: "customer";
  savedAddresses: Array<{
    id: string;
    label: string;
    address: string;
  }>;
  memberSince: string;
  totalRequests: number;
  completedRequests: number;
  averageRating: number;
  tier: "standard" | "silver" | "gold" | "platinum";
}
```

### **Handyman**

```typescript
interface Handyman extends User {
  role: "handyman";
  specialization: string;
  yearsOfExperience: number;
  certifications: string[];
  approvalStatus: "pending" | "approved" | "rejected";
  averageRating: number;
  reviewCount: number;
  portfolio: Array<{
    id: string;
    image: string;
    title: string;
  }>;
  workingHours: {
    startTime: string;
    endTime: string;
    daysOff: string[];
  };
  serviceArea: {
    district: string;
    radius: number;
  };
}
```

### **ServiceRequest**

```typescript
interface ServiceRequest {
  id: string;
  customerId: string;
  handymanId?: string;
  category: string;
  title: string;
  description: string;
  status: "pending" | "accepted" | "active" | "completed" | "cancelled";
  location: string;
  scheduledDate: string;
  price: number;
  estimatedDuration: string;
  images?: string[];
  rating?: number;
  review?: string;
  totalAmount: number;
  createdAt: string;
  completedAt?: string;
}
```

### **Review**

```typescript
interface Review {
  id: string;
  requestId: string;
  customerId: string;
  handymanId: string;
  rating: number; // 1-5
  comment: string;
  isFlagged: boolean;
  flagReason?: string;
  createdAt: string;
}
```

---

## 🔐 SECURITY REQUIREMENTS

### 1. **JWT Token Setup**

```typescript
// Token should include:
{
  sub: userId,
  role: 'customer' | 'handyman' | 'admin',
  email: userEmail,
  iat: issuedAt,
  exp: expiresAt (24 hours recommended)
}
```

### 2. **Password Requirements**

The frontend validates:

```
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number
```

### 3. **CORS Configuration**

**You must configure CORS in your backend:**

```
Allowed Origins: http://localhost:5173 (dev), https://yourproduction.com
Allowed Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS
Allowed Headers: Content-Type, Authorization
Allow Credentials: true
```

**Example (Express.js):**

```javascript
const cors = require("cors");

app.use(
  cors({
    origin: ["http://localhost:5173", "https://production.fixit.com"],
    credentials: true,
  }),
);
```

### 4. **Error Responses**

**Always return proper HTTP status codes:**

```
200 OK              - Success
201 Created         - Resource created
400 Bad Request     - Invalid data
401 Unauthorized    - No/invalid token
403 Forbidden       - No permission
404 Not Found       - Resource not found
500 Internal Error  - Server error
```

**Error response format:**

```json
{
  "error": "INVALID_CREDENTIALS",
  "message": "البريد أو كلمة المرور غير صحيحة",
  "statusCode": 401
}
```

---

## 📝 REQUEST/RESPONSE EXAMPLES

### Example 1: Create Service Request

**Frontend sends:**

```typescript
// From: src/services/customer.service.ts → createRequest()
POST /api/requests
Authorization: Bearer {token}
Content-Type: application/json

{
  "handymanId": "handyman_123",
  "category": "plumbing",
  "title": "إصلاح تسريب مياه",
  "description": "تسريب من الحنفية في المطبخ",
  "images": ["url1", "url2"],
  "scheduledDate": "2026-03-15",
  "location": "مدينة نصر، القاهرة",
  "price": 250,
  "estimatedDuration": "1 ساعة"
}
```

**Backend returns:**

```json
{
  "id": "req_123",
  "customerId": "cust_456",
  "handymanId": "handyman_123",
  "category": "plumbing",
  "title": "إصلاح تسريب مياه",
  "description": "تسريب من الحنفية في المطبخ",
  "status": "pending",
  "location": "مدينة نصر، القاهرة",
  "price": 250,
  "estimatedDuration": "1 ساعة",
  "totalAmount": 250,
  "createdAt": "2026-03-12T10:30:00Z"
}
```

---

### Example 2: Get Handyman Profile (for AdminApprovals page)

**Frontend sends:**

```typescript
GET /api/handymen/pending
Authorization: Bearer {admin_token}
```

**Backend returns:**

```json
[
  {
    "id": "handyman_115",
    "firstName": "أحمد",
    "lastName": "علي محمد",
    "email": "ahmed@email.com",
    "phone": "010xxxxxxxx",
    "specialization": "سباكة وتأسيس",
    "yearsOfExperience": 8,
    "certifications": ["ISO-123"],
    "approvalStatus": "pending",
    "appliedAt": "2026-03-07T15:20:00Z"
  }
]
```

---

## 🚀 FRONTEND WILL CONNECT LIKE THIS

**Example: Customer Login Integration**

```typescript
// Frontend code (already ready):
import { authService } from "@/services/auth.service";
import { useToast } from "@/hooks/useToast";

export function LoginPage() {
  const toast = useToast();

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await authService.login({
        email,
        password,
      });

      // Stores token in localStorage
      localStorage.setItem("auth_token", response.token);

      // Navigate based on role
      if (response.user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (response.user.role === "handyman") {
        navigate("/handyman/dashboard");
      } else {
        navigate("/customer/home");
      }

      toast.success("تم تسجيل الدخول بنجاح");
    } catch (error) {
      toast.error(error.message || "فشل التسجيل");
    }
  };
}
```

**Token is automatically sent with all requests via interceptor:**

```typescript
// From src/services/api.ts (already configured):
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

---

## 🔄 COMPLETE FLOW EXAMPLE: Service Request

### 1. **Customer Searches & Finds Handyman**

```
Customer Views: /customer/browse
Frontend fetches: GET /api/handymen/search?category=plumbing&district=nasser
Backend returns: List of handymen with ratings
```

### 2. **Customer Books Service**

```
Customer submits form on: /customer/book/:handyman_id
Frontend sends: POST /api/requests (with details)
Backend creates request, notifies handyman
```

### 3. **Handyman Accepts Job**

```
Handyman views: /handyman/dashboard
Frontend fetches: GET /api/handymen/me/jobs
Handyman clicks "Accept"
Frontend sends: PUT /api/jobs/:id/status {status: 'accepted'}
Backend updates status, notifies customer
```

### 4. **Customer Tracks Job**

```
Customer views: /customer/track/:job_id
Frontend fetches: GET /api/requests/:id/track
Backend returns: status, handyman location, ETA
Real-time updates (WebSocket recommended)
```

### 5. **Job Completed & Review**

```
Handyman marks done: PUT /api/jobs/:id/status {status: 'completed'}
Customer writes review: POST /api/requests/:id/review {rating, comment}
Backend stores review, updates handyman rating
```

---

## 📌 IMPLEMENTATION CHECKLIST

### Phase 1: Basic Setup (Week 1)

- [ ] Setup Node.js/Express backend
- [ ] Configure database (MongoDB/PostgreSQL)
- [ ] Create user model and auth endpoints
- [ ] Implement JWT authentication
- [ ] Setup CORS headers
- [ ] Create basic CRUD endpoints

### Phase 2: Core Features (Week 2)

- [ ] Customer service endpoints
- [ ] Handyman service endpoints
- [ ] Service request management
- [ ] Review/rating system
- [ ] Admin approval system

### Phase 3: Advanced Features (Week 3)

- [ ] Real-time notifications (WebSocket)
- [ ] Image upload service
- [ ] Geolocation/map integration
- [ ] Payment gateway
- [ ] Email service

### Phase 4: Security & Testing (Week 4)

- [ ] Input validation & sanitization
- [ ] Rate limiting
- [ ] Unit tests
- [ ] Integration tests
- [ ] Security audit

---

## 🧪 TESTING CHECKLIST

**Test each endpoint with:**

- ✅ Valid data
- ✅ Invalid data
- ✅ Missing fields
- ✅ Unauthorized access (no token)
- ✅ Expired token
- ✅ Invalid token
- ✅ Wrong role access
- ✅ Empty responses
- ✅ Large payloads
- ✅ Database errors

**Use Postman/Insomnia collections to test before frontend connects.**

---

## 🔗 INTEGRATION POINTS

Once you create the endpoints, frontend dev (you if same person, or someone else) will:

1. **Update API_BASE_URL** in environment variables
2. **Update service files** if endpoint names differ
3. **Add error handling** in components using new data
4. **Test full flows** with real data

---

## 📞 COMMUNICATION

**Before starting implementation, confirm:**

1. Is the responsibility split (frontend dev ≠ backend dev)?
2. If same person: Do backend first, then wire frontend
3. If different: Agree on API contract (endpoint names, response formats)
4. Setup testing environment (staging API for frontend to test)

---

## 🎯 SUMMARY

| Who              | What                            | When                |
| ---------------- | ------------------------------- | ------------------- |
| **Backend Dev**  | Create & test all API endpoints | Now                 |
| **Frontend Dev** | Wire endpoints to components    | After backend ready |
| **QA**           | Full E2E testing                | After both done     |
| **DevOps**       | Deploy to production            | Final stage         |

---

**Backend Status:** 🔄 **READY TO START** (API design documented)  
**Frontend Status:** ✅ **READY TO CONNECT** (services prepared)  
**Overall:** 🟡 **AWAITING BACKEND IMPLEMENTATION**

Generated: March 12, 2026
