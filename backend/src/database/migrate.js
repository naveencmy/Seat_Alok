// src/database/migrate.js
import fs from "fs";
import pool from "../config/db.js";

const sql = fs.readFileSync(
  new URL("./schema.sql", import.meta.url)
).toString();

await pool.query(sql);
console.log("Database migrated");
process.exit(0);
