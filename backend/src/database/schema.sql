CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE admins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL
);

CREATE TABLE departments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL
);

CREATE TABLE exams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  exam_date DATE NOT NULL,
  exam_type TEXT CHECK (exam_type IN ('CAT','END_SEM')) NOT NULL
);

CREATE TABLE subjects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject_code TEXT NOT NULL,
  subject_name TEXT NOT NULL,
  exam_id UUID REFERENCES exams(id)
);

CREATE TABLE halls (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hall_number TEXT UNIQUE NOT NULL,
  total_benches INT NOT NULL,
  seats_per_bench INT NOT NULL,
  hall_order INT NOT NULL
);

CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  roll_no TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  department_id UUID REFERENCES departments(id),
  subject_code TEXT NOT NULL,
  exam_id UUID REFERENCES exams(id)
);

CREATE TABLE seat_allocations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  exam_id UUID REFERENCES exams(id),
  hall_id UUID REFERENCES halls(id),
  bench_no INT,
  seat_position INT,
  student_id UUID REFERENCES students(id),
  UNIQUE (exam_id, student_id)
);
