import pool from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

/**
 * Create subject (linked to exam + department via subject_code usage)
 */
export const createSubject = async (req, res) => {
  const {
    subject_code,
    subject_name,
    exam_id
  } = req.body;

  try {
    await pool.query(
      `
      INSERT INTO subjects
      (id, subject_code, subject_name, exam_id)
      VALUES ($1, $2, $3, $4)
      `,
      [uuidv4(), subject_code, subject_name, exam_id]
    );

    res.json({ message: "Subject created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Get all subjects
 */
export const getSubjects = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT
        s.id,
        s.subject_code,
        s.subject_name,
        e.name AS exam
      FROM subjects s
      JOIN exams e ON e.id = s.exam_id
      ORDER BY s.subject_code
      `
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
