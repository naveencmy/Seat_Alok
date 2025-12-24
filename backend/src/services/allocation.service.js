import pool from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

/**
 * Generate seat allocation
 */
export const generateAllocation = async (req, res) => {
  const { examId } = req.body;

  if (!examId) {
    return res.status(400).json({ error: "examId is required" });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const examRes = await client.query(
      "SELECT exam_type FROM exams WHERE id = $1",
      [examId]
    );

    if (examRes.rows.length === 0) {
      throw new Error("Invalid examId");
    }

    const examType = examRes.rows[0].exam_type;

    await client.query(
      "DELETE FROM seat_allocations WHERE exam_id = $1",
      [examId]
    );

    const hallsRes = await client.query(
      `SELECT id, total_benches, seats_per_bench
       FROM halls ORDER BY hall_order`
    );

    const studentsRes = await client.query(
      `SELECT id, subject_id FROM students ORDER BY roll_no`
    );

    const students = [...studentsRes.rows];
    let studentIndex = 0;
    let allocated = 0;

    for (const hall of hallsRes.rows) {
      for (let bench = 1; bench <= hall.total_benches; bench++) {
        if (studentIndex >= students.length) break;

        if (examType === "CAT") {
          const first = students[studentIndex++];

          let secondIdx = students.findIndex(
            s => s.subject_id !== first.subject_id
          );

          await client.query(
            `
            INSERT INTO seat_allocations
            (id, exam_id, hall_id, bench_number, seat_position, student_id)
            VALUES ($1,$2,$3,$4,1,$5)
            `,
            [uuidv4(), examId, hall.id, bench, first.id]
          );
          allocated++;

          if (secondIdx !== -1) {
            const second = students.splice(secondIdx, 1)[0];
            await client.query(
              `
              INSERT INTO seat_allocations
              (id, exam_id, hall_id, bench_number, seat_position, student_id)
              VALUES ($1,$2,$3,$4,2,$5)
              `,
              [uuidv4(), examId, hall.id, bench, second.id]
            );
            allocated++;
          }
        }

        if (examType === "END_SEM") {
          const student = students[studentIndex++];

          await client.query(
            `
            INSERT INTO seat_allocations
            (id, exam_id, hall_id, bench_number, seat_position, student_id)
            VALUES ($1,$2,$3,$4,1,$5)
            `,
            [uuidv4(), examId, hall.id, bench, student.id]
          );
          allocated++;
        }
      }
    }

    await client.query("COMMIT");

    res.json({ message: "Allocation done", allocated });
  } catch (err) {
    await client.query("ROLLBACK");
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
};

/**
 * Clear allocation
 */
export const clearAllocation = async (req, res) => {
  const { examId } = req.params;

  await pool.query(
    "DELETE FROM seat_allocations WHERE exam_id = $1",
    [examId]
  );

  res.json({ message: "Allocation cleared" });
};

/**
 * Allocation status
 */
export const getStatus = async (req, res) => {
  const { examId } = req.params;

  const result = await pool.query(
    `
    SELECT
      COUNT(*) AS allocated,
      (SELECT COUNT(*) FROM students) AS total
    FROM seat_allocations
    WHERE exam_id = $1
    `,
    [examId]
  );

  res.json(result.rows[0]);
};
