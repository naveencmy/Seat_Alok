import pool from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

export const generateAllocation = async (req, res) => {
  const { examId } = req.body;

  if (!examId) {
    return res.status(400).json({ error: "examId is required" });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1️⃣ get exam type
    const examRes = await client.query(
      "SELECT exam_type FROM exams WHERE id = $1",
      [examId]
    );

    if (examRes.rows.length === 0) {
      throw new Error("Invalid examId");
    }

    const examType = examRes.rows[0].exam_type;

    // 2️⃣ clear old allocation
    await client.query(
      "DELETE FROM seat_allocations WHERE exam_id = $1",
      [examId]
    );

    // 3️⃣ fetch halls
    const hallsRes = await client.query(
      `
      SELECT id, total_benches, seats_per_bench
      FROM halls
      ORDER BY hall_order
      `
    );

    // 4️⃣ fetch students
    const studentsRes = await client.query(
      `
      SELECT id, subject_id
      FROM students
      ORDER BY roll_no
      `
    );

    const students = [...studentsRes.rows];
    let allocatedCount = 0;
    let studentIndex = 0;

    // 5️⃣ allocation logic
    for (const hall of hallsRes.rows) {
      const { id: hallId, total_benches, seats_per_bench } = hall;

      for (let bench = 1; bench <= total_benches; bench++) {
        if (studentIndex >= students.length) break;

        // 🔹 CAT EXAM
        if (examType === "CAT") {
          if (seats_per_bench !== 2) {
            throw new Error("CAT exam requires seats_per_bench = 2");
          }

          const first = students[studentIndex++];
          let secondIndex = -1;

          for (let i = studentIndex; i < students.length; i++) {
            if (students[i].subject_id !== first.subject_id) {
              secondIndex = i;
              break;
            }
          }

          // seat 1
          await client.query(
            `
            INSERT INTO seat_allocations
            (id, exam_id, hall_id, bench_number, seat_position, student_id)
            VALUES ($1,$2,$3,$4,1,$5)
            `,
            [uuidv4(), examId, hallId, bench, first.id]
          );
          allocatedCount++;

          // seat 2 (only if available)
          if (secondIndex !== -1) {
            const second = students.splice(secondIndex, 1)[0];

            await client.query(
              `
              INSERT INTO seat_allocations
              (id, exam_id, hall_id, bench_number, seat_position, student_id)
              VALUES ($1,$2,$3,$4,2,$5)
              `,
              [uuidv4(), examId, hallId, bench, second.id]
            );
            allocatedCount++;
          }
        }

        // 🔹 END SEM EXAM
        if (examType === "END_SEM") {
          const student = students[studentIndex++];

          await client.query(
            `
            INSERT INTO seat_allocations
            (id, exam_id, hall_id, bench_number, seat_position, student_id)
            VALUES ($1,$2,$3,$4,1,$5)
            `,
            [uuidv4(), examId, hallId, bench, student.id]
          );
          allocatedCount++;
        }
      }
    }

    await client.query("COMMIT");

    res.json({
      message: "Seat allocation completed",
      examType,
      allocated: allocatedCount,
      totalStudents: studentsRes.rows.length
    });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error(err);
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
};
