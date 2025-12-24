import pool from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

export const createHall = async (req, res) => {
  const { hall_number, seat_capacity, hall_order } = req.body;

  try {
    await pool.query(
      `
      INSERT INTO halls (id, hall_number, seat_capacity, hall_order)
      VALUES ($1, $2, $3, $4)
      `,
      [uuidv4(), hall_number, seat_capacity, hall_order]
    );

    res.json({ message: "Hall created" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getHalls = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM halls ORDER BY hall_order"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
