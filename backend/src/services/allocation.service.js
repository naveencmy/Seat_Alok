import pool from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

/**
 * Generate seat allocation for an exam
 */
export const generateAllocation = async (req, res) => {
  const { examId } = req.body;

  try {
    // clear old allocations first (idempotent)
    await pool.query(
      "DELETE FROM seat_allocations WHERE exam_id = $1",
      [examId]
    );

    const halls = await pool.query(
      "SELECT id, seat_capacity FROM halls ORDER BY hall_order"
    );

    const students = await pool.query(
      `
      SELECT s.id
      FROM students s
      JOIN subjects sub ON sub.subject_code = s.subject_code
      WHERE sub.exam_id = $1
      ORDER BY s.roll_no
      `,
      [examId]
    );

    let studentIndex = 0;

    for (const hall of halls.rows) {
      for (let seat = 1; seat <= hall.seat_capacity; seat++) {
        if (studentIndex >= students.rows.length) break;

        await pool.query(
          `
          INSERT INTO seat_allocations
          (id, student_id, hall_id, seat_number, exam_id)
          VALUES ($1, $2, $3, $4, $5)
          `,
          [
            uuidv4(),
            students.rows[studentIndex].id,
            hall.id,
            seat,
            examId
          ]
        );

        studentIndex++;
      }
    }

    res.json({
      message: "Seat allocation generated",
      allocated: studentIndex,
      total: students.rows.length
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Clear allocation for an exam
 */
export const clearAllocation = async (req, res) => {
  const { examId } = req.params;

  try {
    await pool.query(
      "DELETE FROM seat_allocations WHERE exam_id = $1",
      [examId]
    );

    res.json({ message: "Allocation cleared" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * Allocation status
 */
export const getStatus = async (req, res) => {
  const { examId } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT
        COUNT(*) AS allocated,
        (
          SELECT COUNT(*)
          FROM students s
          JOIN subjects sub ON sub.subject_code = s.subject_code
          WHERE sub.exam_id = $1
        ) AS total
      FROM seat_allocations
      WHERE exam_id = $1
      `,
      [examId]
    );

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
