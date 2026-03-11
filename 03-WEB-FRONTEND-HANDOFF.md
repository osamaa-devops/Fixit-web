# FixIt Web — Frontend Developer Handoff
> **Date:** March 2026 · **Scope:** `/mockups/web/` — 54 HTML mockup files  
> **Stack Assumption:** Any modern framework (Next.js, Nuxt, React, Vue) or plain HTML/CSS/JS  
> **Direction:** RTL (Arabic) — all layouts are right-to-left

---

## 1. Project Overview

FixIt is a marketplace for on-demand home maintenance services in Egypt. It connects **customers** who need repair/maintenance work with verified **handymen** (craftsmen). An **admin** panel handles approvals and moderation.

### Three Portals
| Portal | Primary Color | Description |
|---|---|---|
| **Customer** | 🟠 Orange `#FF6B35` | Browse, book, track requests |
| **Handyman** | 🩵 Teal `#4db8a8` | Receive jobs, manage work |
| **Admin** | 🟠 Orange `#FF6B35` | Platform management |

---

## 2. Design System

### 2.1 CSS Architecture

All pages import two shared CSS files **before** their own inline styles:

```html
<link rel="stylesheet" href="shared-base.css">
<link rel="stylesheet" href="theme-light.css">
```

> ⚠️ **Order matters** — `theme-light.css` overrides base variables. Page-level `<style>` overrides both.

---

### 2.2 Design Tokens (CSS Variables)

#### Colors
```css
/* Primary — Customer Brand (Orange) */
--color-primary:        #FF6B35;
--color-primary-dark:   #e85a2a;        /* hover state */
--color-primary-soft:   hsla(18,100%,61%,0.1); /* bg tints */
--color-primary-light:  hsl(18,100%,95%);

/* Secondary — Handyman Brand (Teal) */
--color-secondary:      #4db8a8;
--color-secondary-dark: #3aa394;

/* Semantic */
--color-success:        #10b981;   /* green — completed, available */
--color-warning:        #f59e0b;   /* amber — busy, pending */
--color-danger:         #ef4444;   /* red — cancelled, error */

/* Surfaces & Text */
--color-bg-light:         #f8fafc;
--color-surface:          #ffffff;
--color-border:           #e2e8f0;
--color-text-primary:     #0f172a;
--color-text-secondary:   #475569;
--color-text-tertiary:    #94a3b8;
```

#### Shadows
```css
--shadow-sm:       0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md:       0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg:       0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl:       0 20px 25px -5px rgb(0 0 0 / 0.1);
--shadow-premium:  0 25px 50px -12px rgb(0 0 0 / 0.15);
```

#### Transitions
```css
--transition-fast:   0.2s cubic-bezier(0.4, 0, 0.2, 1);
--transition-smooth: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
```

---

### 2.3 Typography

**Font:** [Cairo](https://fonts.google.com/specimen/Cairo) — Google Fonts (Arabic + Latin)

```html
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
```

| Usage | Weight | Size |
|---|---|---|
| Hero headings | 900 | 3–3.5rem |
| Page titles | 950 | 2–2.5rem |
| Card titles | 950 | 1.1–1.25rem |
| Body text | 700–800 | 0.9–1rem |
| Labels / meta | 700 | 0.75–0.88rem |

> **Note:** `font-weight: 950` is used throughout — this is intentionally heavy. In production, map to `900` or use a variable font.

---

### 2.4 Spacing & Layout

| Token | Value | Use |
|---|---|---|
| Container max-width | `1280–1400px` | Main content wrapper |
| Container width | `90–95%` | Fluid padding |
| Section gap | `60–100px` | Between major sections |
| Card radius | `24–32px` | Glass cards |
| Button radius | `12–20px` | Varies by context |
| Input radius | `12–18px` | Form inputs |
| Grid gap | `24–40px` | Card grids |

---

### 2.5 Glassmorphism — The Core Visual Pattern

Used on **all** page backgrounds in the authenticated customer/handyman views:

```css
/* Light glass card */
background: rgba(255, 255, 255, 0.7);
backdrop-filter: blur(25px);
-webkit-backdrop-filter: blur(25px);
border: 1px solid rgba(255, 255, 255, 0.4);
border-radius: 24–32px;
box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);

/* Page background */
background: radial-gradient(circle at top left, #fdfbfb 0%, #ebedee 100%);
```

> **Performance note:** `backdrop-filter: blur()` is GPU-intensive. Limit nesting depth.

---

### 2.6 Standard Navbar (Authenticated Pages)

Every authenticated page uses a **floating glassmorphism navbar**:

```css
.web-navbar {
  position: fixed;
  top: 20px; left: 20px; right: 20px;
  height: 70px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(25px);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.08);
  z-index: 1000;
}
```

Navbar contains:
- **Brand logo:** `FixIt.` (orange dot, font-weight 950)
- **Nav links:** الرئيسية / تصفح الفنيين / طلباتي / المساعدة
- **Actions:** Notification bell → `web-customer-notifications.html`, Profile avatar → `web-customer-profile.html`

> The body needs `padding-top: 100px` to clear the floating navbar.

---

## 3. Screen Inventory

### 3.1 Auth Screens (5 files)

| File | Route | Description |
|---|---|---|
| `web-auth-login.html` | `/login` | Email + password, remember me, social hints |
| `web-auth-register.html` | `/register?role=customer\|handyman` | Multi-step wizard, role switcher, progress bar |
| `web-auth-forgot-password.html` | `/forgot-password` | Email input step |
| `web-auth-verify-otp.html` | `/verify-otp` | 6-digit OTP entry with countdown |
| `web-auth-reset-password.html` | `/reset-password` | New password + confirm |
| `web-auth-handyman-approval-pending.html` | `/pending-approval` | Post-registration waiting screen for handymen |

#### Registration Wizard — Important Details
- **Role switching** (`أنا عميل` / `أنا فني`) is a tab inside the wizard, **directly above** the progress bar
- Customer: **4 steps** — البيانات الشخصية → إثبات الهوية → الموقع → تأمين الحساب
- Handyman: **5 steps** — above + البيانات المهنية
- URL param: `?role=customer` or `?role=handyman` pre-selects the tab
- Theme switches: customer = orange palette, handyman = teal palette
- Background animates between the two palettes on role switch

---

### 3.2 Landing Page (1 file)

| File | Description |
|---|---|
| `web-landing-page.html` | Public marketing page. Not logged in. Auth gate modal blocks all booking actions. |

**Sections in order:**
1. Floating navbar (no auth actions — just login/register links)
2. Hero banner (gradient dark orange) with search bar + CTA buttons
3. Trust stats bar (4 metrics)
4. How it works (3 steps)
5. Handyman grid (3 cards with availability status)
6. Testimonials
7. App download section
8. Footer

**Auth Gate Modal:** When a non-logged-in user clicks any action (احجز, تصفح…), a modal appears prompting login/register. Uses `openAuthModal(title, subtitle, emoji)` JS function.

---

### 3.3 Customer Screens (11 files)

| File | Route | Description |
|---|---|---|
| `web-customer-home.html` | `/home` | Dashboard home — hero, categories grid, top handymen |
| `web-customer-browse-categories.html` | `/browse` | Category cards → links to search results |
| `web-customer-search-results.html` | `/search` | Handyman list with sidebar filters |
| `web-customer-handyman-profile.html` | `/handyman/:id` | Public profile with reviews, portfolio, booking CTA |
| `web-customer-book-service.html` | `/book/:id` | Multi-step booking wizard |
| `web-customer-dashboard.html` | `/dashboard` | Active requests + history summary |
| `web-customer-request-history.html` | `/history` | Full request history |
| `web-customer-notifications.html` | `/notifications` | Notification list |
| `web-customer-profile.html` | `/profile` | Personal profile settings |
| `web-customer-settings.html` | `/settings` | App preferences, help, legal links |
| `web-customer-track-request.html` | `/track/:id` | See §3.3.1 for states |

#### 3.3.1 Track Request — 4 State Files

This is the most critical customer flow. Each state is a **separate file** but real implementation uses one component with dynamic state:

| File | State | Timeline | Contact Visible? |
|---|---|---|---|
| `web-customer-track-request-pending.html` | ⏳ في الانتظار | Step 1 active (orange) | ❌ **Locked** — blurred avatar |
| `web-customer-track-request.html` | 🚗 الفني في الطريق | Steps 1+2 done, Step 3 active (blue) | ✅ **Unlocked** — phone + call button |
| `web-customer-track-request-completed.html` | ✅ مكتمل | All 4 steps done (green) | ✅ — review section shown |
| `web-customer-track-request-cancelled.html` | ✕ ملغي | Step 1 done, rest greyed out | ➖ — N/A |

> **Critical UX Rule:** The customer **cannot see the handyman's phone number or contact details** until the handyman **accepts** the request. In the pending state, the handyman card shows a blurred avatar, blurred name, and a 🔒 locked call button with the message: *"بيانات التواصل ستظهر فور قبوله للطلب"*.

**Page Layout (all 4 states):**
```
Fixed Navbar (70px)
├── Sidebar (380px, sticky top:110px)
│   ├── Request #FIX-XXXX + Status Badge
│   └── Timeline (4 steps)
└── Main Content (flex:1)
    ├── Status notice card
    ├── Handyman card (locked/unlocked)
    ├── Request details
    └── Action buttons
```

---

### 3.4 Handyman Screens (8 files)

| File | Route | Description |
|---|---|---|
| `web-handyman-dashboard.html` | `/h/dashboard` | Job board — incoming, active, history |
| `web-handyman-job-details-new.html` | `/h/job/:id` | New job offer — accept or decline |
| `web-handyman-job-details-active.html` | `/h/job/:id/active` | Active job — mark complete |
| `web-handyman-job-details-completed.html` | `/h/job/:id/done` | Completed job — view details |
| `web-handyman-job-details-cancelled.html` | `/h/job/:id/cancelled` | Cancelled job view |
| `web-handyman-own-reviews.html` | `/h/reviews` | Handyman's own ratings & reviews |
| `web-handyman-portfolio-manager.html` | `/h/portfolio` | Upload/manage portfolio images |
| `web-handyman-profile-settings.html` | `/h/profile` | Edit profile, specialties, work hours |
| `web-handyman-notifications.html` | `/h/notifications` | Notification list |

#### Handyman Job State Flow
```
New (اطلب قبول/رفض)
  ↓ Accept
Active (جاري العمل — timer, mark complete)
  ↓ Complete
Completed (view summary, earnings)

New → Decline → Cancelled
```

---

### 3.5 Admin Screens (7 files)

| File | Route | Description |
|---|---|---|
| `web-admin-login.html` | `/admin/login` | Admin-only login |
| `web-admin-dashboard.html` | `/admin` | Overview stats + charts |
| `web-admin-handymen-approvals.html` | `/admin/approvals` | Review pending handyman registrations |
| `web-admin-categories.html` | `/admin/categories` | Add/edit service categories |
| `web-admin-requests-monitor.html` | `/admin/requests` | Live request monitoring |
| `web-admin-reviews-complaints.html` | `/admin/reviews` | Review moderation |
| `web-admin-users-manage.html` | `/admin/users` | Customer & handyman accounts |

> Admin uses its own dark sidebar layout — different from the customer/handyman floating navbar.

---

### 3.6 Shared / Static Screens (5 files)

| File | Route | Description |
|---|---|---|
| `web-shared-help-support.html` | `/help` | FAQ accordion |
| `web-shared-contact-us.html` | `/contact` | Contact form |
| `web-shared-legal.html` | `/legal` | Privacy + Terms |
| `web-shared-empty-states.html` | `/empty-states` | Dev reference — all empty state components |
| `web-landing-page.html` | `/` | Public landing page (see §3.2 above) |

---

## 4. Navigation Flows

### 4.1 Customer Flow
```
Landing Page → Login/Register
  ↓
Home (/home)
  ├── Categories → Browse Categories → Search Results → Handyman Profile → Book Service
  ├── Dashboard → Active Request Cards
  │   ├── → Track Request (Pending)
  │   ├── → Track Request (On The Way / Active)
  │   └── → Request History → Track Request (Completed / Cancelled)
  ├── Notifications
  ├── Profile
  └── Settings → Help / Legal / Contact

Track Request Flow:
  Pending → [Handyman Accepts] → Active → [Work Done] → Completed
  Pending → [Customer/No one cancels] → Cancelled
```

### 4.2 Handyman Flow
```
Register → Pending Approval → [Admin approves] → Dashboard
  ├── Job Details (New) → Accept → Active → Complete → Completed
  ├── Own Reviews
  ├── Portfolio Manager
  ├── Profile Settings
  └── Notifications
```

### 4.3 Navbar Active States
Each page sets the correct `active` class on the nav link:
- Home page → `الرئيسية` active
- Browse/Search → `تصفح الفنيين` active
- Dashboard/Track/History → `طلباتي` active
- Help/Contact → `المساعدة` active

---

## 5. Component Library

### 5.1 Handyman Card (Customer-facing)

Used in: Home page, Search Results, Landing Page.

**Two states — the status must always be shown:**

```html
<!-- AVAILABLE (clickable) -->
<a href="/handyman/123" class="handyman-card">
  <div class="hm-stats-row">
    <div class="hm-stat-item">
      <span class="stat-label">الحالة</span>
      <span class="stat-value" style="color:#22c55e">● متاح الآن</span>
    </div>
  </div>
  <button class="btn-book">احجز الآن</button>
</a>

<!-- BUSY (NOT clickable — div not a) -->
<div class="handyman-card busy">
  <div class="busy-badge">⏳ مشغول حالياً</div>
  <!-- ... same card content ... -->
  <button class="btn-book-disabled" disabled>⛔ مشغول حالياً — غير متاح</button>
</div>
```

```css
/* Busy card styles */
.handyman-card.busy {
  opacity: 0.6;
  cursor: not-allowed;
  filter: grayscale(0.4);
  pointer-events: none; /* add in production */
}
.handyman-card.busy:hover {
  transform: none;
  box-shadow: original;
}
.busy-badge {
  position: absolute;
  top: 16px; left: 16px;
  background: rgba(245,158,11,.12);
  color: #d97706;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 800;
  border: 1px solid rgba(245,158,11,.25);
}
```

---

### 5.2 Request Timeline (Track screens)

```html
<div class="timeline">
  <div class="timeline-item completed">
    <div class="t-dot"></div>
    <div class="t-content">
      <h4>تم إرسال الطلب</h4>
      <p class="t-date">اليوم، 10:30 صباحاً</p>
    </div>
  </div>
  <div class="timeline-item active">...</div>  <!-- current step -->
  <div class="timeline-item">...</div>          <!-- pending step -->
  <div class="timeline-item cancelled">...</div><!-- if cancelled -->
</div>
```

```css
/* State colors */
.timeline-item.completed .t-dot { background: var(--color-success); }
.timeline-item.active .t-dot    { background: var(--color-primary); animation: pulse; }
.timeline-item.cancelled .t-dot { background: #fca5a5; }
/* Default .t-dot = grey (pending) */
```

---

### 5.3 Status Badges

```html
<!-- Inline status chips used in request cards, req-id rows, etc. -->
<span class="status-badge active">الفني في الطريق</span>
<span class="status-badge pending">في الانتظار</span>
<span class="status-badge completed">مكتمل</span>
<span class="status-badge cancelled">ملغي</span>
```

| State | Background | Text Color |
|---|---|---|
| active / on-the-way | `rgba(59,130,246,.1)` | `#2563eb` |
| pending | `rgba(245,158,11,.1)` | `#d97706` |
| completed | `rgba(16,185,129,.1)` | `#059669` |
| cancelled | `rgba(239,68,68,.08)` | `#dc2626` |

---

### 5.4 Glass Card

```css
.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  border-radius: 24px;
  padding: 28px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
}
```

---

### 5.5 Progress Bar (Registration wizard)

```html
<div class="mini-progress" id="progressContainer">
  <!-- 4 or 5 dots generated by JS -->
</div>
```

```css
.mini-progress { display: flex; gap: 8px; margin-bottom: 32px; }
.progress-dot { height: 4px; flex: 1; background: rgba(255,255,255,0.1); border-radius: 10px; }
.progress-dot.active { background: var(--color-primary); } /* or --color-secondary for handyman */
```

---

## 6. Key Business Rules (UX Rules to Implement)

### 6.1 Contact Lock
> ❗ **Never** show the handyman's phone number before they accept the request.

| Request State | Handyman Card | Call Button |
|---|---|---|
| Pending | Blurred avatar + blurred name bars | 🔒 Locked, disabled |
| Accepted / On The Way | Full name + photo + "✓ قبل الطلب" green badge | ✅ Active phone link |
| In Progress | Same as accepted | ✅ Active |
| Completed | Full details shown | ✅ Active (optional) |
| Cancelled | N/A | N/A |

### 6.2 Handyman Availability

**In all customer-facing list views** (home, search, landing page), handymen have a visible status:
- `● متاح الآن` → green, clickable card
- `● مشغول` → amber, non-clickable card (rendered as `<div>`, not `<a>`)

In the **search results**, a filter checkbox exists: `فنيين معتمدين فقط` (verified only). The frontend should hide busy results or dim them per the filter.

### 6.3 Request History Navigation

Each card in `web-customer-request-history.html` links to the appropriate track screen:
- Active/On-the-way → `/track/:id` (main screen)  
- Pending → `/track/:id?state=pending`
- Completed → `/track/:id/completed`
- Cancelled → `/track/:id/cancelled`

### 6.4 Category → Search Results Link

Clicking a category card on the Browse page sends the user to:
```
web-customer-search-results.html?category=سباكة
```
The search results page reads this URL param and:
1. Updates the heading to: `تم العثور على X فني في 🚰 سباكة`
2. Pre-selects the category filter dropdown
3. Adds an orange category badge next to the location badge

---

## 7. Responsive Breakpoints

| Screen | Breakpoint | Change |
|---|---|---|
| Desktop | ≥1024px | Two-column layout (sidebar + content) |
| Tablet | <1024px | Brand panel hidden (auth pages), single column |
| Mobile | <768px | Stack everything, side nav → hamburger |

Current mockups are **desktop-first**. The `@media (max-width: 1024px)` breakpoints exist and hide the brand panel on auth screens.

---

## 8. Assets

### Images & Icons
All assets in `/mockups/web/`:

| File | Use |
|---|---|
| `fixit-logo.svg` | Brand logo — use in navbar and auth pages |
| `ac_category_icon.png` | AC/HVAC category card |
| `carpentry_category_icon.png` | Carpentry |
| `cleaning_category_icon.png` | Cleaning |
| `electrical_category_icon.png` | Electrical |
| `painting_category_icon.png` | Painting |
| `plumbing_category_icon.png` | Plumbing |
| `plumbing_work_1.png` | Portfolio sample |
| `plumbing_work_2.png` | Portfolio sample |
| `fixit_mobile_app_professional_mockup.png` | App download section hero |

### External Resources Used in Mockups
- **Avatars:** `https://i.pravatar.cc/100?img=X` — replace with real user photos
- **Handyman portraits:** `https://images.unsplash.com/photo-...` — replace with real photos
- **Google Fonts:** Cairo — keep this in production

---

## 9. File Naming Convention

```
web-[portal]-[feature]-[state].html

Examples:
web-customer-track-request-pending.html   → customer portal, track feature, pending state
web-handyman-job-details-active.html      → handyman portal, job-details, active state
web-admin-handymen-approvals.html         → admin portal, handymen approvals
web-auth-register.html                    → shared auth flow
web-shared-help-support.html              → shared across portals
```

---

## 10. Implementation Checklist

> Use this when converting mockups to production code.

- [ ] Extract all CSS variables to a global `tokens.css` (already in `shared-base.css` + `theme-light.css`)
- [ ] Build the **floating navbar** as a shared component (single source of truth)
- [ ] Build the **glass card** as a base component
- [ ] Implement the **handyman card** with `isAvailable` prop controlling click state
- [ ] Implement the **track request** as a single page with 4 dynamic states driven by request status
- [ ] Enforce **contact lock** at the API level — never send phone/contact info in pending state response
- [ ] Wire up `?category=X` URL param logic on search results page
- [ ] Add `pointer-events: none` on `.handyman-card.busy` (the mockup uses a `<div>` to block clicks)
- [ ] Replace all `https://i.pravatar.cc` and Unsplash placeholder images
- [ ] Confirm Cairo font weight `950` — use a variable font or map to `900`
- [ ] Implement `backdrop-filter` fallback for older browsers
- [ ] All pages are RTL — set `<html dir="rtl" lang="ar">`
- [ ] The registration page reads `?role=customer|handyman` from URL — implement this routing logic

---

## 11. Complete File Reference

```
mockups/web/
│
├── SHARED CSS
│   ├── shared-base.css          ← Design tokens, resets, base components
│   ├── theme-light.css          ← Light theme overrides
│   └── icons.css                ← Icon helpers
│
├── AUTH
│   ├── web-auth-login.html
│   ├── web-auth-register.html
│   ├── web-auth-forgot-password.html
│   ├── web-auth-verify-otp.html
│   ├── web-auth-reset-password.html
│   └── web-auth-handyman-approval-pending.html
│
├── LANDING
│   └── web-landing-page.html
│
├── CUSTOMER (11)
│   ├── web-customer-home.html
│   ├── web-customer-browse-categories.html
│   ├── web-customer-search-results.html
│   ├── web-customer-handyman-profile.html
│   ├── web-customer-book-service.html
│   ├── web-customer-dashboard.html
│   ├── web-customer-request-history.html
│   ├── web-customer-notifications.html
│   ├── web-customer-profile.html
│   ├── web-customer-settings.html
│   └── web-customer-track-request.html         ← On the way / active state
│   └── web-customer-track-request-pending.html ← Searching for handyman
│   └── web-customer-track-request-completed.html
│   └── web-customer-track-request-cancelled.html
│
├── HANDYMAN (9)
│   ├── web-handyman-dashboard.html
│   ├── web-handyman-job-details-new.html
│   ├── web-handyman-job-details-active.html
│   ├── web-handyman-job-details-completed.html
│   ├── web-handyman-job-details-cancelled.html
│   ├── web-handyman-own-reviews.html
│   ├── web-handyman-portfolio-manager.html
│   ├── web-handyman-profile-settings.html
│   └── web-handyman-notifications.html
│
├── ADMIN (7)
│   ├── web-admin-login.html
│   ├── web-admin-dashboard.html
│   ├── web-admin-handymen-approvals.html
│   ├── web-admin-categories.html
│   ├── web-admin-requests-monitor.html
│   ├── web-admin-reviews-complaints.html
│   └── web-admin-users-manage.html
│
├── SHARED PAGES (5)
│   ├── web-shared-help-support.html
│   ├── web-shared-contact-us.html
│   ├── web-shared-legal.html
│   └── web-shared-empty-states.html   ← Dev reference for all empty states
│
└── ASSETS
    ├── fixit-logo.svg
    ├── *_category_icon.png (6 files)
    ├── plumbing_work_1.png
    ├── plumbing_work_2.png
    └── fixit_mobile_app_professional_mockup.png
```

---

*Handoff prepared March 2026 — FixIt Platform v1.0 Web*
