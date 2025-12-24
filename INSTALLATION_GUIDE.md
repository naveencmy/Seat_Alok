# 🚀 Installation & Setup Guide

## Complete Step-by-Step Instructions for Windows

### Prerequisites Installation

#### 1. Install Node.js

1. Download Node.js from https://nodejs.org/ (v18 or higher)
2. Run the installer
3. Verify installation:

```powershell
node --version
npm --version
```

#### 2. Install PostgreSQL

1. Download PostgreSQL from https://www.postgresql.org/download/windows/
2. Run the installer
3. During installation:
   - Remember the password you set for postgres user
   - Default port: 5432
   - Install pgAdmin 4 (GUI tool)
4. Verify installation:

```powershell
psql --version
```

### Database Setup

#### 1. Create Database

**Option A: Using pgAdmin 4 (GUI)**

1. Open pgAdmin 4
2. Connect to PostgreSQL server (enter your password)
3. Right-click on "Databases" → "Create" → "Database"
4. Name: `exam_seat_db`
5. Click "Save"

**Option B: Using Command Line**

```powershell
# Open PowerShell and connect to PostgreSQL
psql -U postgres

# Enter your postgres password when prompted
# Then run:
CREATE DATABASE exam_seat_db;

# Exit psql
\q
```

### Project Setup

#### 1. Navigate to Project Directory

```powershell
cd "e:\User_Profile Jagan\Documents\seat-all"
```

#### 2. Backend Setup

```powershell
# Navigate to backend folder
cd backend

# Install dependencies (this will take a few minutes)
npm install

# Create .env file from template
Copy-Item .env.example .env

# Open .env file and edit with your credentials
notepad .env
```

**Edit .env file:**

```env
PORT=5000
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/exam_seat_db
JWT_SECRET=my_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

Replace `YOUR_PASSWORD` with your PostgreSQL password.

```powershell
# Build TypeScript code
npm run build

# Run database migrations to create tables
npm run db:migrate

# You should see: "All tables created successfully"

# Create uploads directory for file storage
mkdir uploads

# Start the backend server
npm run dev
```

**Expected output:**

```
Server is running on port 5000
```

Keep this terminal window open. Backend is now running on http://localhost:5000

#### 3. Frontend Setup

Open a **NEW** PowerShell terminal:

```powershell
# Navigate to frontend folder
cd "e:\User_Profile Jagan\Documents\seat-all\frontend"

# Install dependencies
npm install

# Start the development server
npm run dev
```

**Expected output:**

```
  VITE v5.0.7  ready in 500 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
```

Keep this terminal window open. Frontend is now running on http://localhost:3000

### Initial Configuration

#### 1. Create Admin User

Open a **THIRD** PowerShell terminal:

```powershell
# Create admin user using API
curl -X POST http://localhost:5000/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{"username":"admin","password":"admin123"}'
```

**Expected response:**

```json
{
  "message": "Admin created successfully",
  "admin": {
    "id": 1,
    "username": "admin"
  }
}
```

**Alternative:** Use a tool like Postman or Thunder Client if curl doesn't work.

#### 2. Access the Application

1. Open your web browser
2. Go to: http://localhost:3000
3. You should see the login page
4. Login with:
   - **Username:** admin
   - **Password:** admin123

### Testing the Application

#### Step 1: Add Departments

1. Click "Departments" in the navbar
2. Click "Add New Department"
3. Add these departments:

| Name                   | Code |
| ---------------------- | ---- |
| Computer Science       | CS   |
| Mechanical Engineering | ME   |
| Electrical Engineering | EE   |
| Civil Engineering      | CE   |

#### Step 2: Create an Exam

1. Click "Exams" in the navbar
2. Click "Add New Exam"
3. Enter:
   - Name: "Mid Semester Exam 2024"
   - Date: Select any future date
4. Click "Create"

#### Step 3: Add Subjects

1. Click "Subjects" in the navbar
2. Add these subjects:

| Subject Code | Subject Name                | Credits | Exam                   |
| ------------ | --------------------------- | ------- | ---------------------- |
| CS101        | Introduction to Programming | 4       | Mid Semester Exam 2024 |
| CS102        | Data Structures             | 4       | Mid Semester Exam 2024 |
| ME101        | Engineering Mechanics       | 4       | Mid Semester Exam 2024 |
| ME102        | Thermodynamics              | 4       | Mid Semester Exam 2024 |
| EE101        | Circuit Theory              | 4       | Mid Semester Exam 2024 |
| EE102        | Digital Electronics         | 4       | Mid Semester Exam 2024 |
| CE101        | Structural Analysis         | 4       | Mid Semester Exam 2024 |
| CE102        | Fluid Mechanics             | 4       | Mid Semester Exam 2024 |

#### Step 4: Add Halls

1. Click "Halls" in the navbar
2. Add these halls:

| Hall Number | Seat Capacity | Hall Order |
| ----------- | ------------- | ---------- |
| Hall A      | 30            | 1          |
| Hall B      | 25            | 2          |
| Hall C      | 20            | 3          |

**Note:** Hall Order determines allocation sequence. Lower numbers fill first.

#### Step 5: Upload Students

1. Click "Students" in the navbar
2. Use the sample CSV file provided: `sample-students.csv`
3. Click "Choose File" and select `sample-students.csv`
4. Click "Upload Students"
5. You should see: "Upload completed: 20 students uploaded"

#### Step 6: Generate Seat Allocation

1. Click "Allocation" in the navbar
2. Select "Mid Semester Exam 2024" from dropdown
3. You'll see statistics:
   - Total Students: 20
   - Allocated Students: 0
   - Unallocated Students: 20
4. Click "Generate Allocation"
5. Wait for confirmation: "Allocation completed: 20 students allocated"
6. Statistics will update to show all students allocated

#### Step 7: View Seating Arrangements

1. Click "Seating" in the navbar
2. Select "Mid Semester Exam 2024" from dropdown
3. **Hall-wise View:**
   - Select "Hall A" from the second dropdown
   - See all students in Hall A with seat numbers
4. **Student Lookup:**
   - Enter a roll number (e.g., "CS001")
   - Click "Search"
   - See the student's hall and seat assignment

#### Step 8: Export Seating Plan

1. On the Seating page with exam selected
2. Click "Export to Excel" - Downloads .xlsx file
3. Click "Export to PDF" - Downloads .pdf file
4. Open the downloaded files to see formatted seating plans

### Troubleshooting

#### Backend won't start

**Error: "Cannot connect to database"**

```powershell
# Check if PostgreSQL is running
Get-Service -Name "postgresql*"

# If not running, start it
Start-Service -Name "postgresql-x64-14"  # Adjust version number
```

**Error: "Port 5000 already in use"**

```powershell
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Or change port in backend/.env
PORT=5001
```

#### Frontend won't start

**Error: "Port 3000 already in use"**

```powershell
# Edit vite.config.ts and change port:
server: {
  port: 3001,  # Change to 3001
  ...
}
```

#### Cannot create admin user

**Error: "ECONNREFUSED"**

- Make sure backend is running on port 5000
- Check if you can access http://localhost:5000/health in browser

**Error: "Username already exists"**

- Admin user already created, proceed to login

#### Upload fails

**Error: "No halls available"**

- Create at least one hall before allocating

**Error: "Subject not found"**

- Make sure all subject codes in CSV exist in the database
- Create subjects before uploading students

#### Login fails

**Error: "Invalid credentials"**

- Make sure you created admin user first
- Username and password are case-sensitive
- Default: admin / admin123

### Stopping the Application

#### Stop Backend

1. Go to the terminal running backend
2. Press `Ctrl + C`
3. Type `Y` and press Enter

#### Stop Frontend

1. Go to the terminal running frontend
2. Press `Ctrl + C`
3. Type `Y` and press Enter

### Restarting the Application

#### Start Backend

```powershell
cd "e:\User_Profile Jagan\Documents\seat-all\backend"
npm run dev
```

#### Start Frontend

```powershell
cd "e:\User_Profile Jagan\Documents\seat-all\frontend"
npm run dev
```

### Database Management

#### View Database in pgAdmin 4

1. Open pgAdmin 4
2. Navigate to: Servers → PostgreSQL → Databases → exam_seat_db
3. Right-click → "Query Tool" to run SQL queries
4. Or expand tables to view data

#### Reset Database (Clear all data)

```powershell
# Connect to PostgreSQL
psql -U postgres

# Drop and recreate database
DROP DATABASE exam_seat_db;
CREATE DATABASE exam_seat_db;
\q

# Run migrations again
cd backend
npm run db:migrate

# Recreate admin user
curl -X POST http://localhost:5000/api/auth/register `
  -H "Content-Type: application/json" `
  -d '{"username":"admin","password":"admin123"}'
```

### Production Deployment

For production deployment, follow these additional steps:

1. **Build Frontend:**

```powershell
cd frontend
npm run build
# Output will be in frontend/dist/
```

2. **Build Backend:**

```powershell
cd backend
npm run build
# Output will be in backend/dist/
```

3. **Set Production Environment Variables:**

```env
NODE_ENV=production
DATABASE_URL=your_production_database_url
JWT_SECRET=very_strong_random_secret_key
```

4. **Deploy:**
   - Deploy frontend/dist to static hosting (Vercel, Netlify, etc.)
   - Deploy backend to Node.js hosting (Heroku, Railway, DigitalOcean, etc.)
   - Use managed PostgreSQL service (AWS RDS, ElephantSQL, etc.)

### Security Checklist for Production

- [ ] Change JWT_SECRET to a strong random string
- [ ] Use HTTPS for both frontend and backend
- [ ] Configure CORS to allow only your frontend domain
- [ ] Remove or protect the `/api/auth/register` endpoint
- [ ] Use environment variables for all secrets
- [ ] Set up database backups
- [ ] Add rate limiting to API endpoints
- [ ] Use a strong PostgreSQL password

### Support & Help

If you encounter issues:

1. Check if all services are running (PostgreSQL, Backend, Frontend)
2. Verify environment variables in .env
3. Check terminal output for error messages
4. Ensure PostgreSQL database exists
5. Verify all dependencies are installed
6. Check if ports are available (5000, 3000, 5432)

### Next Steps

After successful installation:

1. Explore all features in the web interface
2. Try different allocation scenarios
3. Export seating plans in different formats
4. Customize the application for your needs
5. Add more students, halls, and exams
6. Test with larger datasets

---

**Congratulations! Your Exam Hall Seat Allocation System is now running! 🎉**

For more information, see:

- README.md - Complete documentation
- API_TESTING.md - API endpoint guide
- FILE_STRUCTURE.md - File organization
- PROJECT_SUMMARY.md - Feature overview
