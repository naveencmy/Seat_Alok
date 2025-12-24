import pool from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

/**
 * Create single student
 */
export const createStudent = async (req, res) => {
  const {
    roll_no,
    name,
    department_id,
    subject_code,
    exam_id
  } = req.body;

  if (!roll_no || !name || !subject_code) {
    return res.status(400).json({
      error: "roll_no, name, subject_code are required"
    });
  }

  try {
    await pool.query(
      `
      INSERT INTO students
      (id, roll_no, name, department_id, subject_code, exam_id)
      VALUES ($1, $2, $3, $4, $5, $6)
      `,
      [
        uuidv4(),
        roll_no,
        name,
        department_id || null,
        subject_code,
        exam_id || null
      ]
    );

    res.status(201).json({ message: "Student created" });
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
        s.name,
        d.name AS department,
        s.subject_code,
        s.exam_id
      FROM students s
      LEFT JOIN departments d ON d.id = s.department_id
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
  res.json({ message: "Upload endpoint ready" });
};
