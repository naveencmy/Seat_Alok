import { v4 as uuid } from "uuid";
import pool from "../config/db.js";

export const create = async (req, res) => {
  const { name, exam_date, exam_type } = req.body;

  if (!name || !exam_date || !exam_type) {
    return res.status(400).json({
      error: "name, exam_date, exam_type are required",
    });
  }

  if (!["CAT", "END_SEM"].includes(exam_type)) {
    return res.status(400).json({
      error: "exam_type must be CAT or END_SEM",
    });
  }

  const id = uuid();

  await pool.query(
    `INSERT INTO exams (id, name, exam_date, exam_type)
     VALUES ($1, $2, $3, $4)`,
    [id, name, exam_date, exam_type]
  );

  res.status(201).json({ message: "Exam created", id });
};

export const getAll = async (req, res) => {
  const { rows } = await pool.query(
    `SELECT id, name, exam_date, exam_type
     FROM exams
     ORDER BY exam_date`
  );

  res.json(rows);
};
