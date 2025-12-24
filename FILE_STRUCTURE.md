# Complete File Structure

```
seat-all/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts              # PostgreSQL connection config
│   │   │
│   │   ├── database/
│   │   │   ├── schema.ts                # All table definitions
│   │   │   └── migrate.ts               # Migration runner script
│   │   │
│   │   ├── middleware/
│   │   │   └── auth.ts                  # JWT authentication middleware
│   │   │
│   │   ├── routes/
│   │   │   ├── auth.ts                  # Admin login & register
│   │   │   ├── exams.ts                 # Exam CRUD operations
│   │   │   ├── subjects.ts              # Subject CRUD operations
│   │   │   ├── halls.ts                 # Hall CRUD operations
│   │   │   ├── departments.ts           # Department CRUD operations
│   │   │   ├── students.ts              # Student upload & management
│   │   │   ├── allocation.ts            # Automatic seating algorithm
│   │   │   ├── seating.ts               # Seating display & lookup APIs
│   │   │   └── export.ts                # Excel & PDF export
│   │   │
│   │   └── server.ts                    # Express app entry point
│   │
│   ├── package.json                     # Backend dependencies
│   ├── tsconfig.json                    # TypeScript config
│   ├── .env.example                     # Environment variables template
│   └── .gitignore                       # Git ignore rules
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.tsx                # Login page
│   │   │   ├── Dashboard.tsx            # Dashboard with stats
│   │   │   ├── Exams.tsx                # Exam management page
│   │   │   ├── Subjects.tsx             # Subject management page
│   │   │   ├── Halls.tsx                # Hall management page
│   │   │   ├── Departments.tsx          # Department management page
│   │   │   ├── Students.tsx             # Student upload & list page
│   │   │   ├── Allocation.tsx           # Allocation generation page
│   │   │   └── Seating.tsx              # Seating view & export page
│   │   │
│   │   ├── services/
│   │   │   └── api.ts                   # API service layer (Axios)
│   │   │
│   │   ├── App.tsx                      # Main app with routing
│   │   ├── App.css                      # Global styles
│   │   ├── main.tsx                     # React entry point
│   │   └── vite-env.d.ts                # Vite type definitions
│   │
│   ├── index.html                       # HTML entry point
│   ├── package.json                     # Frontend dependencies
│   ├── vite.config.ts                   # Vite configuration
│   ├── tsconfig.json                    # TypeScript config
│   ├── tsconfig.node.json               # Node TypeScript config
│   └── .gitignore                       # Git ignore rules
│
├── README.md                            # Complete documentation
├── PROJECT_SUMMARY.md                   # Project overview
├── API_TESTING.md                       # API testing guide
├── FILE_STRUCTURE.md                    # This file
├── sample-students.csv                  # Sample student data
└── quick-start.ps1                      # PowerShell setup script
```

## File Descriptions

### Backend Files

#### Configuration & Setup

- **database.ts** - PostgreSQL connection pool setup using pg library
- **schema.ts** - Creates all 7 database tables with relationships
- **migrate.ts** - Runs database migrations to create tables
- **.env.example** - Template for environment variables (DB URL, JWT secret)

#### Middleware

- **auth.ts** - JWT token validation middleware for protected routes

#### API Routes

- **auth.ts** - Admin registration and login endpoints
- **exams.ts** - GET, POST, PUT, DELETE for exams
- **subjects.ts** - CRUD operations for subjects with exam linking
- **halls.ts** - CRUD operations for halls with capacity and order
- **departments.ts** - CRUD operations for departments
- **students.ts** -
  - GET /students - List all students
  - POST /students/upload - Upload CSV/Excel with auto-mapping
  - DELETE /students/:id - Delete student
- **allocation.ts** -
  - POST /allocation/generate - **Core allocation algorithm**
  - GET /allocation/status/:exam_id - Get allocation stats
  - DELETE /allocation/clear/:exam_id - Clear allocations
- **seating.ts** -
  - GET /seating/hall/:hall_id/:exam_id - Hall-wise view
  - GET /seating/student/:roll_no/:exam_id - Student lookup
  - GET /seating/exam/:exam_id - All allocations
  - GET /seating/halls/:exam_id - Halls with counts
- **export.ts** -
  - GET /export/excel/:exam_id - Excel export with ExcelJS
  - GET /export/pdf/:exam_id - PDF export with PDFKit

#### Server

- **server.ts** - Express app setup with CORS, routes, and middleware

### Frontend Files

#### Pages (9 Complete Pages)

- **Login.tsx** - Admin authentication form with JWT
- **Dashboard.tsx** - Statistics dashboard with quick action links
- **Exams.tsx** - Table with add/edit/delete exam functionality
- **Subjects.tsx** - Subject management with exam linking
- **Halls.tsx** - Hall management with capacity and order
- **Departments.tsx** - Department management
- **Students.tsx** - File upload UI and student list table
- **Allocation.tsx** -
  - Exam selection dropdown
  - Allocation status display
  - Generate/Clear buttons
  - Algorithm rules display
- **Seating.tsx** -
  - Exam selection
  - Student seat lookup by roll number
  - Hall-wise seating table view
  - Excel/PDF export buttons

#### Services

- **api.ts** - Centralized Axios API client with:
  - Base URL configuration
  - Token interceptor
  - All API functions (30+ endpoints)

#### App Files

- **App.tsx** - React Router setup with protected routes
- **App.css** - Complete CSS with:
  - Navbar styling
  - Card components
  - Form elements
  - Tables
  - Buttons
  - Dashboard grid
  - Login page
- **main.tsx** - React DOM render entry point

### Documentation Files

- **README.md** - Full documentation including:

  - Feature list
  - Installation guide
  - Usage instructions
  - API reference
  - Deployment guide
  - Troubleshooting

- **PROJECT_SUMMARY.md** - Quick overview of:

  - All implemented features
  - File list
  - Setup steps
  - API summary

- **API_TESTING.md** - Step-by-step API testing guide with:

  - Sample requests for all endpoints
  - Expected responses
  - Quick test sequence

- **FILE_STRUCTURE.md** - This file

### Sample Data & Scripts

- **sample-students.csv** - 20 sample students across 4 departments
- **quick-start.ps1** - PowerShell script for automated setup

## Key Algorithms & Logic

### Allocation Algorithm (allocation.ts)

```typescript
1. Get all halls ordered by hall_order
2. Get all students ordered by roll_no
3. For each hall:
   - For seat 1 to capacity:
     - Assign next student to seat
     - Create allocation record
     - Move to next student
4. Track allocated and unallocated counts
```

### Student Upload Logic (students.ts)

```typescript
1. Parse CSV/Excel file
2. For each row:
   - Validate roll_no and student_name
   - Check if department exists, create if not
   - Validate subject_code exists
   - Upsert student (INSERT or UPDATE on conflict)
3. Return success/error counts
```

### Export Logic (export.ts)

```typescript
Excel:
1. Query allocations with JOIN
2. Create ExcelJS workbook
3. Add styled header row
4. Add data rows
5. Stream to response

PDF:
1. Query allocations grouped by hall
2. Create PDFKit document
3. Add title and exam info
4. For each hall:
   - Add hall header
   - Add table with students
   - Handle pagination
5. Stream to response
```

## Database Tables

1. **admins** - id, username, password (hashed), created_at
2. **departments** - id, name, code, created_at
3. **exams** - id, name, exam_date, created_at
4. **subjects** - id, subject_code, subject_name, credits, exam_id, created_at
5. **halls** - id, hall_number, seat_capacity, hall_order, created_at
6. **students** - id, roll_no, student_name, department_id, subject_code, created_at
7. **seat_allocations** - id, student_id, hall_id, seat_number, exam_id, allocated_at

## Running Order

1. Install PostgreSQL
2. Create database `exam_seat_db`
3. Install backend dependencies
4. Create .env file
5. Run migrations
6. Install frontend dependencies
7. Start backend (port 5000)
8. Start frontend (port 3000)
9. Create admin user via API
10. Login to web interface
11. Add departments, exams, subjects, halls
12. Upload students
13. Generate allocation
14. View seating and export

## Technology Stack

**Backend:**

- Node.js + Express.js
- TypeScript
- PostgreSQL (pg driver)
- JWT (jsonwebtoken)
- Bcrypt (bcryptjs)
- Multer (file upload)
- XLSX (Excel parsing)
- ExcelJS (Excel generation)
- PDFKit (PDF generation)

**Frontend:**

- React 18
- TypeScript
- Vite (build tool)
- React Router DOM
- Axios
- React Toastify

## Total Files Created: 45+

✅ Backend: 15 TypeScript files
✅ Frontend: 15+ TypeScript/TSX files
✅ Config: 8 configuration files
✅ Documentation: 4 markdown files
✅ Sample Data: 1 CSV file
✅ Scripts: 1 PowerShell script
