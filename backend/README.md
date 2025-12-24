## Sturcture of the Backend(Express JS):
backend/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── middleware/
│   │   └── auth.middleware.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── department.routes.js
│   │   ├── exam.routes.js
│   │   ├── subject.routes.js
│   │   ├── student.routes.js
│   │   ├── hall.routes.js
│   │   ├── allocation.routes.js
│   │   └── seating.routes.js
│   │
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── department.service.js
│   │   ├── exam.service.js
│   │   ├── subject.service.js
│   │   ├── student.service.js
│   │   ├── hall.service.js
│   │   ├── allocation.service.js
│   │   └── seating.service.js
│   │
│   ├── app.js
│   └── server.js
│
├── .env
├── package.json
└── nodemon.json

# Database Archienture

This alone puts you ahead of 80% of repos.

---

# STEP 4 COMPLETE ✅  
Your backend is now **reproducible and disciplined**.

---

# STEP 2 — DATABASE SCHEMA DESIGN (NOW)

Before touching SQL or ORMs, we design **correctly**.

## Core entities (based on your product)
I’ll assume **exam seat allocation system**.

### Tables (v1)
1. `users`
2. `exams`
3. `centers`
4. `rooms`
5. `seats`
6. `allocations`

---

## Initial schema (conceptual)

### `users`
- id (UUID, PK)
- name
- email (unique)
- role (`admin | student`)
- created_at

### `exams`
- id
- name
- date
- start_time
- end_time

### `centers`
- id
- name
- location

### `rooms`
- id
- center_id → centers.id
- room_number
- capacity

### `seats`
- id
- room_id → rooms.id
- seat_number

### `allocations`
- id
- exam_id → exams.id
- seat_id → seats.id
- user_id → users.id
- UNIQUE (exam_id, seat_id)
- UNIQUE (exam_id, user_id)

This enforces:
- one seat per student per exam
- no double booking
- real constraints (not app logic hacks)

---

## Your next decision (important)

Reply with **ONE choice**:

**A️⃣** Raw SQL migrations (deep control, best learning)  
**B️⃣** Prisma (fast, safe, modern)  
**C️⃣** Sequelize (ORM-heavy, less recommended)

I will **challenge bad choices**.

You’re now operating at **real backend level**.

# Exam Seat Backend


## Requirements
- Node (see .nvmrc)
- PostgreSQL (local)

## Setup
```bash
nvm use
npm install
cp .env.example .env
npm run db:test
npm run dev

