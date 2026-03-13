# Backend API (Fixit Web)

دليل سريع لكل ما يحتاجه فريق الباكند للبدء وربط الواجهة. آخر تحديث: 2026-03-13.

## 1) الأساسيات السريعة
- **Base URL (frontend):** `VITE_API_URL` في `.env` (افتراضي `http://localhost:3000/api`).
- **العميل:** axios مهيأ في `src/services/api.ts` مع interceptor لإضافة `Authorization: Bearer <token>`.
- **CORS المطلوب:** السماح لـ `http://localhost:5173` (تطوير) وドومين الإنتاج، مع `credentials: true` وطرق GET/POST/PUT/DELETE/PATCH/OPTIONS.
- **التوثيق:** JWT مع صلاحيات الدور (`customer | handyman | admin`)، مدة صلاحية يوصى بـ 24 ساعة، ودعم refresh token.

## 2) المسؤوليات
- **Backend:** بناء الموديلات، قواعد البيانات، كل الـ endpoints، التحقق من التوكن، إدارة الأخطاء واختبارات Postman/Insomnia.
- **Frontend:** جاهز للاتصال؛ سيحدّث المسارات إن اختلفت الأسماء.

## 3) خريطة الخدمات في الواجهة
```
src/services/
├── api.ts              // Axios client + interceptors
├── auth.service.ts     // مصادقة
├── customer.service.ts // عمليات العميل
├── handyman.service.ts // عمليات الفني
└── admin.service.ts    // عمليات الأدمن
```

## 4) نقاط النهاية المطلوبة
### Auth
| Method | Endpoint                | Auth | الغرض |
| ------ | ----------------------- | ---- | ------ |
| POST   | /auth/login             | No   | تسجيل دخول |
| POST   | /auth/register          | No   | إنشاء حساب (عميل/فني) |
| POST   | /auth/logout            | Yes  | تسجيل خروج |
| POST   | /auth/verify-otp        | No   | تحقق OTP |
| POST   | /auth/forgot-password   | No   | إرسال رابط/OTP استرجاع |
| POST   | /auth/reset-password    | No   | تعيين كلمة مرور جديدة |
| POST   | /auth/refresh-token     | Yes  | تجديد التوكن |

### Customer
| Method | Endpoint                      | Auth | الغرض |
| ------ | ----------------------------- | ---- | ------ |
| GET    | /customers/me                 | Yes  | جلب الملف الشخصي |
| PUT    | /customers/me                 | Yes  | تحديث الملف |
| GET    | /customers/me/requests        | Yes  | سجل الطلبات |
| GET    | /requests/:id                 | Yes  | تفاصيل طلب |
| POST   | /requests                     | Yes  | إنشاء طلب خدمة |
| PUT    | /requests/:id                 | Yes  | تحديث طلب |
| POST   | /requests/:id/cancel          | Yes  | إلغاء |
| GET    | /requests/:id/track           | Yes  | تتبع حالة |
| POST   | /requests/:id/review          | Yes  | تقييم/مراجعة |
| GET    | /customers/me/notifications   | Yes  | إشعارات |

### Handyman
| Method | Endpoint                     | Auth | الغرض |
| ------ | ---------------------------- | ---- | ------ |
| GET    | /handymen/me                 | Yes  | ملف فني |
| PUT    | /handymen/me                 | Yes  | تحديث ملف |
| GET    | /handymen/me/jobs            | Yes  | الوظائف المسندة |
| GET    | /jobs/:id                    | Yes  | تفاصيل وظيفة |
| PUT    | /jobs/:id/status             | Yes  | تغيير الحالة |
| GET    | /handymen/me/portfolio       | Yes  | جلب معرض الأعمال |
| POST   | /handymen/me/portfolio       | Yes  | رفع صورة |
| DELETE | /handymen/me/portfolio/:id   | Yes  | حذف صورة |
| GET    | /handymen/me/reviews         | Yes  | التقييمات |
| GET    | /handymen/me/notifications   | Yes  | إشعارات |
| PUT    | /handymen/me/availability    | Yes  | أوقات العمل |

### Admin
| Method | Endpoint                      | Auth          | الغرض |
| ------ | ----------------------------- | ------------- | ------ |
| GET    | /admin/dashboard              | Admin         | مؤشرات |
| GET    | /admin/handymen/pending       | Admin         | طلبات فني معلّقة |
| POST   | /admin/handymen/:id/approve   | Admin         | اعتماد فني |
| POST   | /admin/handymen/:id/reject    | Admin         | رفض فني |
| GET    | /admin/requests               | Admin         | كل الطلبات |
| GET    | /admin/users                  | Admin         | إدارة المستخدمين |
| GET    | /admin/categories             | Admin         | قائمة الفئات |
| POST   | /admin/categories             | Admin         | إنشاء فئة |
| PUT    | /admin/categories/:id         | Admin         | تعديل فئة |
| DELETE | /admin/categories/:id         | Admin         | حذف فئة |
| GET    | /admin/reviews                | Admin         | مراجعات |
| POST   | /admin/reviews/:id/flag       | Admin         | وسم مراجعة |

## 5) نماذج البيانات (واجهات مقترحة)
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

interface Customer extends User {
  role: "customer";
  savedAddresses: { id: string; label: string; address: string }[];
  memberSince: string;
  totalRequests: number;
  completedRequests: number;
  averageRating: number;
  tier: "standard" | "silver" | "gold" | "platinum";
}

interface Handyman extends User {
  role: "handyman";
  specialization: string;
  yearsOfExperience: number;
  certifications: string[];
  approvalStatus: "pending" | "approved" | "rejected";
  averageRating: number;
  reviewCount: number;
  portfolio: { id: string; image: string; title: string }[];
  workingHours: { startTime: string; endTime: string; daysOff: string[] };
  serviceArea: { district: string; radius: number };
}

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

## 6) الأمن والجودة
- **JWT Payload:** `{ sub, role, email, iat, exp }`.
- **كلمات المرور:** ≥8 أحرف، 1 حرف كبير، 1 حرف صغير، 1 رقم.
- **تنسيق الأخطاء (مثال):**
```json
{ "error": "INVALID_CREDENTIALS", "message": "البريد أو كلمة المرور غير صحيحة", "statusCode": 401 }
```
- **كود CORS (Express مثال):**
```js
app.use(cors({
  origin: ["http://localhost:5173", "https://production.fixit.com"],
  credentials: true,
}));
```
- التزم بحالات HTTP القياسية: 200/201/400/401/403/404/500.

## 7) أمثلة طلب/استجابة
### تسجيل دخول
```
POST /api/auth/login
{ "email": "user@example.com", "password": "password123", "rememberMe": true }
→ { "token": "...", "user": { id, email, firstName, lastName, role, avatar, verified } }
```

### إنشاء طلب خدمة
```
POST /api/requests  (Bearer token)
{ handymanId, category, title, description, images, scheduledDate, location, price, estimatedDuration }
→ { id, customerId, handymanId, status, totalAmount, createdAt, ... }
```

## 8) سير عمل متكامل (مختصر)
1) بحث عميل عن فني: `GET /api/handymen/search?category=&district=`.
2) حجز: `POST /api/requests`.
3) قبول الفني: `PUT /api/jobs/:id/status {status:"accepted"}`.
4) تتبع العميل: `GET /api/requests/:id/track` (وويب سوكِت اختياري).
5) إنهاء وتقييم: `PUT /api/jobs/:id/status {status:"completed"}` ثم `POST /api/requests/:id/review`.

## 9) خطة تنفيذ مقترحة
- **الأسبوع 1:** إعداد Express/DB، موديل المستخدم، JWT، CORS، CRUD أساسي.
- **الأسبوع 2:** Endpoints العميل/الفني، إدارة الطلبات، التقييمات، موافقة الفنيين.
- **الأسبوع 3:** إشعارات لحظية، رفع صور، خرائط/موقع، دفع إلكتروني، بريد إلكتروني.
- **الأسبوع 4:** فحص إدخال، rate limiting، اختبارات وحدة وتكامل، تدقيق أمني.

## 10) اختبار إلزامي (قبل ربط الواجهة)
- بيانات صحيحة/خاطئة/ناقصة، بدون توكن، توكن منتهي/غير صالح، صلاحيات دور خاطئة.
- أحجام كبيرة، أخطاء قاعدة بيانات، ردود فارغة.
- جهّز مجموعة Postman/Insomnia وشاركها مع الفريق.

## 11) نقاط تكامل مع الواجهة
1) ثبت الـ Base URL في `.env`.
2) حافظ على أسماء endpoints كما هي لتجنب تعديل الخدمات.
3) أعد responses بنفس الحقول (خصوصاً `token` و `user.role`).
4) أعد رسائل أخطاء واضحة باللغتين (إن أمكن) لتظهر في التوستات.

— انتهى —
