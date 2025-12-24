import pool from "../config/db.js";

export const getSeatingByExam = async (req, res) => {
  const { examId } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT
        h.hall_number,
        sa.seat_number,
        s.roll_no,
        s.student_name,
        d.code AS department,
        s.subject_code
      FROM seat_allocations sa
      JOIN students s ON s.id = sa.student_id
      JOIN halls h ON h.id = sa.hall_id
      JOIN departments d ON d.id = s.department_id
      WHERE sa.exam_id = $1
      ORDER BY h.hall_order, sa.seat_number
      `,
      [examId]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getSeatingByHall = async (req, res) => {
  const { hallId, examId } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT
        sa.seat_number,
        s.roll_no,
        s.student_name,
        d.code AS department,
        s.subject_code
      FROM seat_allocations sa
      JOIN students s ON s.id = sa.student_id
      JOIN departments d ON d.id = s.department_id
      WHERE sa.exam_id = $1
        AND sa.hall_id = $2
      ORDER BY sa.seat_number
      `,
      [examId, hallId]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getStudentSeat = async (req, res) => {
  const { rollNo, examId } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT
        h.hall_number,
        sa.seat_number
      FROM seat_allocations sa
      JOIN students s ON s.id = sa.student_id
      JOIN halls h ON h.id = sa.hall_id
      WHERE s.roll_no = $1
        AND sa.exam_id = $2
      `,
      [rollNo, examId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Seat not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
