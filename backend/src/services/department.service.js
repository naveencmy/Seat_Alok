import pool from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

export const createDepartment = async (req, res) => {
  const { name, code } = req.body;

  try {
    await pool.query(
      `
      INSERT INTO departments (id, name, code)
      VALUES ($1, $2, $3)
      `,
      [uuidv4(), name, code]
    );

    res.json({ message: "Department created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getDepartments = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM departments ORDER BY name"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
