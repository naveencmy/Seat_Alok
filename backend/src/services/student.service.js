import pool from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

/**
 * Create single student
 */
export const createStudent = async (req, res) => {
  const {
    roll_no,
    student_name,
    department_id,
    subject_code
  } = req.body;

  try {
    await pool.query(
      `
      INSERT INTO students
      (id, roll_no, student_name, department_id, subject_code)
      VALUES ($1, $2, $3, $4, $5)
      `,
      [uuidv4(), roll_no, student_name, department_id, subject_code]
    );

    res.json({ message: "Student created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get all students
 */
export const getStudents = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT
        s.id,
        s.roll_no,
        s.student_name,
        d.name AS department,
        s.subject_code
      FROM students s
      JOIN departments d ON d.id = s.department_id
      ORDER BY s.roll_no
      `
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Upload students (CSV logic placeholder)
 */
export const uploadStudents = async (req, res) => {
  // You can wire CSV later
  res.json({ message: "Upload endpoint ready" });
};
