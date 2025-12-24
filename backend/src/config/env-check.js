// src/config/env-check.js
import dotenv from "dotenv";
dotenv.config();

console.log(process.env.DB_USER);
console.log(process.cwd());
