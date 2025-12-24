// src/server.js
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

import app from "./app.js";

const PORT = process.env.PORT || 5000;

console.log("DB_USER =", process.env.DB_USER);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
