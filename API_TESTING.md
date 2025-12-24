# API Testing Collection for Exam Seat Allocation

## Base URL

```
http://localhost:5000/api
```

## 1. Create Admin (First Time Only)

```http
POST /auth/register
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

## 2. Login

```http
POST /auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

Response:

```json
{
  "message": "Login successful",
  "token": "eyJhbGc...",
  "admin": {
    "id": 1,
    "username": "admin"
  }
}
```

**Note:** Use the token in Authorization header for all subsequent requests:

```
Authorization: Bearer eyJhbGc...
```

## 3. Create Departments

```http
POST /departments
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Computer Science",
  "code": "CS"
}
```

```http
POST /departments
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Mechanical Engineering",
  "code": "ME"
}
```

## 4. Create Exam

```http
POST /exams
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Mid Semester Exam 2024",
  "exam_date": "2024-12-15"
}
```

## 5. Create Subjects

```http
POST /subjects
Authorization: Bearer <token>
Content-Type: application/json

{
  "subject_code": "CS101",
  "subject_name": "Introduction to Programming",
  "credits": 4,
  "exam_id": 1
}
```

```http
POST /subjects
Authorization: Bearer <token>
Content-Type: application/json

{
  "subject_code": "CS102",
  "subject_name": "Data Structures",
  "credits": 4,
  "exam_id": 1
}
```

```http
POST /subjects
Authorization: Bearer <token>
Content-Type: application/json

{
  "subject_code": "ME101",
  "subject_name": "Engineering Mechanics",
  "credits": 4,
  "exam_id": 1
}
```

## 6. Create Halls

```http
POST /halls
Authorization: Bearer <token>
Content-Type: application/json

{
  "hall_number": "Hall A",
  "seat_capacity": 30,
  "hall_order": 1
}
```

```http
POST /halls
Authorization: Bearer <token>
Content-Type: application/json

{
  "hall_number": "Hall B",
  "seat_capacity": 25,
  "hall_order": 2
}
```

```http
POST /halls
Authorization: Bearer <token>
Content-Type: application/json

{
  "hall_number": "Hall C",
  "seat_capacity": 20,
  "hall_order": 3
}
```

## 7. Upload Students (Multipart Form)

```http
POST /students/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

file: [Select sample-students.csv]
```

## 8. Generate Seat Allocation

```http
POST /allocation/generate
Authorization: Bearer <token>
Content-Type: application/json

{
  "exam_id": 1
}
```

## 9. Get Allocation Status

```http
GET /allocation/status/1
Authorization: Bearer <token>
```

## 10. View Hall Seating

```http
GET /seating/hall/1/1
Authorization: Bearer <token>
```

## 11. Search Student Seat

```http
GET /seating/student/CS001/1
Authorization: Bearer <token>
```

## 12. Get All Allocations for Exam

```http
GET /seating/exam/1
Authorization: Bearer <token>
```

## 13. Export to Excel

```http
GET /export/excel/1
Authorization: Bearer <token>
```

Download the Excel file.

## 14. Export to PDF

```http
GET /export/pdf/1
Authorization: Bearer <token>
```

Download the PDF file.

## 15. Get All Resources

### List Exams

```http
GET /exams
Authorization: Bearer <token>
```

### List Subjects

```http
GET /subjects
Authorization: Bearer <token>
```

### List Halls

```http
GET /halls
Authorization: Bearer <token>
```

### List Departments

```http
GET /departments
Authorization: Bearer <token>
```

### List Students

```http
GET /students
Authorization: Bearer <token>
```

## Quick Test Sequence

1. Register admin
2. Login and get token
3. Create 2-3 departments
4. Create an exam
5. Create 3-4 subjects linked to the exam
6. Create 2-3 halls with different capacities
7. Upload the sample CSV file with students
8. Generate allocation for the exam
9. View hall-wise seating
10. Search for a specific student
11. Export to Excel/PDF

## Notes

- All routes except `/auth/login` and `/auth/register` require authentication
- Use the token from login response in Authorization header
- Hall order determines allocation sequence (lower order fills first)
- Students are allocated sequentially based on roll number
- Each student can only have one seat per exam
- Sample CSV file is provided: `sample-students.csv`
