import dotenv from "dotenv";
dotenv.config();

import pool from "./db.js";

const test = async () => {
  console.log("DB_PASSWORD =", process.env.DB_PASSWORD, typeof process.env.DB_PASSWORD);

  const res = await pool.query("SELECT NOW()");
  console.log("DB connected at:", res.rows[0]);

  process.exit(0);
};

test().catch(err => {
  console.error("DB connection failed:", err);
  process.exit(1);
});
