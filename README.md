# 🎓 Acadex

> **A multi-tenant School Management SaaS** — one platform where a super admin onboards schools, and each school runs admissions, attendance, grading, fees and analytics from its own secure, isolated workspace.

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/Auth-JWT%20%2B%20bcrypt-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

**Acadex** is a full-stack, multi-tenant SaaS for schools. A **Super Admin** registers schools onto the platform; each school then gets its own **School Admin, Teacher and Student** portals with fully isolated data (row-level `school_id` scoping). Built on PostgreSQL with a secure, parameterized data layer, JWT + bcrypt authentication, and real-time analytics dashboards.

<p align="center">
  <img src="preview.png" alt="Acadex preview" width="100%"/>
</p>

## ✨ Features

**Platform (Super Admin)**
- Onboard/register new schools (tenants) with branding, plan (Free / Pro / Enterprise) and status
- Cross-tenant KPIs: total schools, students, teachers, revenue collected
- Suspend / reactivate schools; platform-wide audit log

**School Admin**
- Dashboard with live KPIs, fee-status donut chart, students-by-class bar chart, and recent admissions
- Student directory with instant search; faculty directory; class sections with enrolment counts
- Fee management — collected vs outstanding, per-student receipts and payment status
- Announcements targeted to All / Teachers / Students

**Teacher & Student portals**
- Teacher: assigned classes/subjects, student roster, role-targeted announcements
- Student: personal grades, attendance percentage, and fee status at a glance

**Platform-wide**
- 🔒 **Multi-tenancy** — every record carries a `school_id`; all queries are tenant-scoped so a school can only ever see its own data
- 🔐 **Security** — JWT authentication, bcrypt-hashed passwords, role-based route guards, and **fully parameterized SQL** (no injection)

## 🏗️ Architecture

```
Super Admin ──registers──▶ School (tenant)
                              ├── School Admin ──▶ students, teachers, classes, fees, announcements
                              ├── Teacher       ──▶ classes, roster, grading, attendance
                              └── Student        ──▶ grades, attendance, fees
```
Shared PostgreSQL database with **row-level isolation** via `school_id` (ideal for cost-efficient scaling on serverless Postgres such as Neon).

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, React Router, Tailwind CSS 4, Recharts, Axios, lucide-react |
| Backend | Node.js, Express, `pg` (parameterized queries) |
| Database | PostgreSQL (Neon serverless) |
| Auth | JWT (`jsonwebtoken`) + bcrypt (`bcryptjs`), role-based middleware |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A PostgreSQL database. The easiest free option is **[Neon](https://neon.tech)** — create a project and copy the connection string.

### 1. Backend
```bash
cd backend
npm install

# Create backend/.env
#   DATABASE_URL=postgresql://user:password@host/db?sslmode=require
#   JWT_SECRET=your_long_random_secret
#   PORT=5000

npm run migrate   # create tables (db/schema.sql)
npm run seed      # seed 2 demo schools + users + data
npm start         # API on http://localhost:5000
```

### 2. Frontend
```bash
cd frontend
npm install
npm run dev       # app on http://localhost:3000
# optional: VITE_API_URL=http://localhost:5000/api (defaults to this)
```

### 🔑 Demo accounts (password: `Acadex@123`)
| Role | Email |
|---|---|
| Super Admin | `superadmin@acadex.com` |
| School Admin | `admin@greenwood.edu` |
| Teacher | `ali.sheikh.t0@greenwood.edu` |
| Student | `ali.butt.s0@greenwood.edu` |

## 📁 Project Structure

```
backend/
  db/
    schema.sql        # multi-tenant PostgreSQL schema
    pool.js           # pg connection pool
    migrate.js        # runs schema.sql
    seed.js           # seeds demo schools + users + data
  middleware/auth.js  # JWT verify + requireRole
  routes/
    auth.js           # login / me
    platform.js       # super-admin: schools, stats, audit
    school.js         # school-admin: dashboard, students, teachers, fees…
    me.js             # teacher/student self views
  server.js
frontend/
  src/
    ui.jsx            # Layout (role-aware sidebar) + shared components
    api.js            # axios instance + auth helpers
    Login.jsx
    pages/            # platform / admin / teacher / student pages
```

## 🗺️ Roadmap
- Exams & report cards (PDF), fee vouchers/receipts (PDF)
- Assignment file uploads & submission grading
- In-app + email notifications
- Subscription billing for plans

---

<p align="center">Built by <b>Syed Ibrahim Ali</b> — Full-Stack &amp; AI Engineer</p>
