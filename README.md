# Exam Hall Seat Allocation System

A complete web application for managing exam hall seat allocation with automatic seating algorithm, built with React + TypeScript (frontend) and Express.js + TypeScript (backend) with PostgreSQL database.

## Features

### 1. Admin Module

- JWT-based authentication
- Secure admin login
- Dashboard with statistics

### 2. Exam Management

- Add, edit, delete exams
- Set exam name and date
- View all exams

### 3. Subject Management

- Add subjects with code, name, and credits
- Link subjects to exams
- Edit and delete subjects

### 4. Hall Management

- Add halls with number and seat capacity
- Set hall order for allocation sequence
- Edit and delete halls

### 5. Department Management

- Add and manage departments
- Department code and name

### 6. Student Dataset Upload

- Upload students via CSV/Excel files
- Required columns: `roll_no, student_name, department, subject_code`
- Auto-create departments if not exist
- Validate subjects before upload
- Upsert duplicate students (update on conflict)

### 7. Automatic Seating Allocation

- Fill halls hall-by-hall, seat-by-seat
- Seat numbering starts from 1 to capacity
- Unique seat assignment per student
- Sequential hall allocation based on hall_order
- Clear and regenerate allocations

### 8. Seating Display

- Hall-wise seating view with all students
- Student seat lookup by roll number
- View all allocations for an exam

### 9. Export Features

- Export seating plan to Excel (.xlsx)
- Export seating plan to PDF (.pdf)

## Technology Stack

### Backend

- Node.js with Express.js
- TypeScript
- PostgreSQL
- JWT for authentication
- Multer for file uploads
- ExcelJS for Excel export
- PDFKit for PDF export
- XLSX for parsing CSV/Excel

### Frontend

- React 18
- TypeScript
- Vite
- React Router DOM
- Axios for API calls
- React Toastify for notifications

## Folder Structure

```
seat-all/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts
│   │   ├── database/
│   │   │   ├── schema.ts
│   │   │   └── migrate.ts
│   │   ├── middleware/
│   │   │   └── auth.ts
│   │   ├── routes/
│   │   │   ├── auth.ts
│   │   │   ├── exams.ts
│   │   │   ├── subjects.ts
│   │   │   ├── halls.ts
│   │   │   ├── departments.ts
│   │   │   ├── students.ts
│   │   │   ├── allocation.ts
│   │   │   ├── seating.ts
│   │   │   └── export.ts
│   │   └── server.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Exams.tsx
│   │   │   ├── Subjects.tsx
│   │   │   ├── Halls.tsx
│   │   │   ├── Departments.tsx
│   │   │   ├── Students.tsx
│   │   │   ├── Allocation.tsx
│   │   │   └── Seating.tsx
│   │   ├── services/
│   │   │   └── api.ts
│   │   ├── App.tsx
│   │   ├── App.css
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
└── README.md
```

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

## Installation & Setup

### 1. Database Setup

First, install PostgreSQL and create a database:

```sql
-- Connect to PostgreSQL
psql -U postgres

-- Create database
CREATE DATABASE exam_seat_db;

-- Exit psql
\q
```

### 2. Backend Setup

```powershell
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
Copy-Item .env.example .env

# Edit .env file with your database credentials
# Update the following in .env:
# DATABASE_URL=postgresql://postgres:your_password@localhost:5432/exam_seat_db
# JWT_SECRET=your_secret_key_change_this

# Run database migrations
npm run build
npm run db:migrate

# Create uploads directory for file uploads
mkdir uploads

# Start the development server
npm run dev
```

The backend server will start on `http://localhost:5000`

### 3. Frontend Setup

Open a new terminal:

```powershell
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will start on `http://localhost:3000`

## Initial Setup

### 1. Create Admin User

Before you can log in, create an admin user:

```powershell
# Using curl or any API client, send a POST request to create admin
curl -X POST http://localhost:5000/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{"username":"admin","password":"admin123"}'
```

Or use Postman/Thunder Client:

- URL: `POST http://localhost:5000/api/auth/register`
- Body (JSON):

```json
{
  "username": "admin",
  "password": "admin123"
}
```

### 2. Login

Open `http://localhost:3000` in your browser and login with:

- Username: `admin`
- Password: `admin123`

## Usage Guide

### Step 1: Add Departments

1. Navigate to "Departments" from the navbar
2. Click "Add New Department"
3. Enter department name and code
4. Click "Create"

### Step 2: Add Exams

1. Navigate to "Exams"
2. Click "Add New Exam"
3. Enter exam name and date
4. Click "Create"

### Step 3: Add Subjects

1. Navigate to "Subjects"
2. Click "Add New Subject"
3. Enter subject code, name, credits
4. Optionally link to an exam
5. Click "Create"

### Step 4: Add Halls

1. Navigate to "Halls"
2. Click "Add New Hall"
3. Enter hall number, seat capacity, and order
4. Click "Create"

**Note:** Hall order determines the sequence of allocation. Lower order halls are filled first.

### Step 5: Upload Students

1. Navigate to "Students"
2. Prepare a CSV/Excel file with columns: `roll_no, student_name, department, subject_code`

Example CSV:

```csv
roll_no,student_name,department,subject_code
CS001,John Doe,Computer Science,CS101
CS002,Jane Smith,Computer Science,CS101
ME001,Bob Johnson,Mechanical,ME101
```

3. Click "Choose File" and select your file
4. Click "Upload Students"

### Step 6: Generate Seat Allocation

1. Navigate to "Allocation"
2. Select an exam from the dropdown
3. Review the statistics (total students, allocated, unallocated)
4. Click "Generate Allocation"
5. The system will automatically allocate seats following the rules

### Step 7: View Seating Arrangements

1. Navigate to "Seating"
2. Select an exam
3. View hall-wise seating or search for specific student
4. Export to Excel or PDF

## API Endpoints

### Authentication

- `POST /api/auth/register` - Create admin
- `POST /api/auth/login` - Admin login

### Exams

- `GET /api/exams` - List all exams
- `GET /api/exams/:id` - Get single exam
- `POST /api/exams` - Create exam
- `PUT /api/exams/:id` - Update exam
- `DELETE /api/exams/:id` - Delete exam

### Subjects

- `GET /api/subjects` - List all subjects
- `GET /api/subjects/:id` - Get single subject
- `POST /api/subjects` - Create subject
- `PUT /api/subjects/:id` - Update subject
- `DELETE /api/subjects/:id` - Delete subject

### Halls

- `GET /api/halls` - List all halls
- `GET /api/halls/:id` - Get single hall
- `POST /api/halls` - Create hall
- `PUT /api/halls/:id` - Update hall
- `DELETE /api/halls/:id` - Delete hall

### Departments

- `GET /api/departments` - List all departments
- `POST /api/departments` - Create department
- `PUT /api/departments/:id` - Update department
- `DELETE /api/departments/:id` - Delete department

### Students

- `GET /api/students` - List all students
- `POST /api/students/upload` - Upload students CSV/Excel
- `DELETE /api/students/:id` - Delete student

### Allocation

- `POST /api/allocation/generate` - Generate seat allocation
- `GET /api/allocation/status/:exam_id` - Get allocation status
- `DELETE /api/allocation/clear/:exam_id` - Clear allocations

### Seating

- `GET /api/seating/hall/:hall_id/:exam_id` - Hall-wise seating
- `GET /api/seating/student/:roll_no/:exam_id` - Student seat lookup
- `GET /api/seating/exam/:exam_id` - All allocations for exam
- `GET /api/seating/halls/:exam_id` - Halls with allocation counts

### Export

- `GET /api/export/excel/:exam_id` - Export to Excel
- `GET /api/export/pdf/:exam_id` - Export to PDF

## Allocation Algorithm

The automatic seating allocation follows these rules:

1. **Sequential Hall Filling**: Halls are filled in order based on `hall_order` field
2. **Seat-by-Seat**: Within each hall, seats are filled sequentially from 1 to capacity
3. **Unique Assignment**: Each student gets exactly one seat per exam
4. **No Conflicts**: A seat can only be assigned to one student per exam
5. **Overflow Handling**: If all halls are full, remaining students are marked as unallocated

## Database Schema

### Tables

- `admins` - Admin users
- `departments` - Academic departments
- `exams` - Exam information
- `subjects` - Subject details
- `halls` - Exam halls
- `students` - Student records
- `seat_allocations` - Seat allocation mapping

## Production Deployment

### Backend

1. Build the TypeScript code: `npm run build`
2. Set environment variables in production
3. Run migrations: `npm run db:migrate`
4. Start server: `npm start`

### Frontend

1. Build for production: `npm run build`
2. Serve the `dist` folder using nginx or any static server

### Environment Variables (Production)

```env
PORT=5000
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=your_strong_secret_key_change_this
NODE_ENV=production
```

## Security Notes

1. **Change JWT Secret**: Update `JWT_SECRET` in `.env` to a strong random string
2. **Database Password**: Use a strong password for PostgreSQL
3. **HTTPS**: Use HTTPS in production
4. **CORS**: Configure CORS properly for production domains
5. **Rate Limiting**: Add rate limiting middleware in production
6. **Remove Register Endpoint**: Comment out `/api/auth/register` after creating admin user

## Troubleshooting

### Backend won't start

- Check if PostgreSQL is running
- Verify database credentials in `.env`
- Check if port 5000 is available

### Frontend won't connect to backend

- Ensure backend is running on port 5000
- Check proxy configuration in `vite.config.ts`
- Verify CORS settings in backend

### Upload fails

- Check if `uploads` directory exists in backend
- Verify file format (CSV/Excel)
- Ensure all required columns are present

### Allocation errors

- Ensure halls exist before allocation
- Verify students have been uploaded
- Check that exam exists

## Support

For issues or questions, please check:

1. Database connection is working
2. All required services are running
3. Environment variables are set correctly
4. File permissions for uploads directory

## License

This project is for educational purposes.
# Seat_Alok
# Seat_Alok
# Seat_Alok
# Seat_Alok
