const fs = require("fs");
const pool = require("../config/db");

(async () => {
  const sql = fs.readFileSync(__dirname + "/schema.sql").toString();
  await pool.query(sql);
  console.log("Database migrated");
  process.exit();
})();
